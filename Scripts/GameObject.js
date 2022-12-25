class GameObject
{
    x;
    y;
    centerX;
    centerY;
    element;
    svgObject;
    updateInstance;
    lastFrameTime;
    currentFrameTime;
    deltaTime;
    height;
    width;
    timer;
    svgNS;
    id;
    controller;


    constructor(type,sid,sx,sy,sheight,swidth,imgSrc, control)
    {

        this.svgNS = "http://www.w3.org/2000/svg";
        this.svgObject = document.querySelector("#svgObject");
        this.id = sid;

        if(type != null)
        {

        this.element = document.createElementNS(this.svgNS, type);
        this.element.setAttributeNS(null, "id", sid);
        
        this.svgObject.appendChild(this.element);

        this.x = sx;
        this.element.setAttributeNS(null,"x", Math.trunc(sx));
        this.y = sy;
        this.element.setAttributeNS(null,"y", Math.trunc(sy));
        this.height = sheight;
        this.element.setAttributeNS(null, "height", Math.trunc(sheight));
        this.width = swidth;
        this.element.setAttributeNS(null, "width", Math.trunc(swidth));
        this.SetCenter();
        
        if(imgSrc != undefined)
            this.element.setAttributeNS(null, "href", imgSrc);
        

        }
        else
        {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.element = null;
            this.controller = sx;
           
        }

        this.controller = control;
       
        this.updateInstance = requestAnimationFrame(this.Update.bind(this));

    }

    Update()
    {
        this.GetDeltaTime();
        requestAnimationFrame(this.Update.bind(this));  
    }

    GetDeltaTime()
    {
        this.timer = new Date();
        this.currentFrameTime = this.timer.getTime();

        let pendingDeltaTime = this.currentFrameTime - this.lastFrameTime;
        this.deltaTime = (pendingDeltaTime < 5000) ? pendingDeltaTime : 0;
        this.lastFrameTime = this.timer.getTime();     
    }

    StopUpdate()
    {
        cancelAnimationFrame(this.updateInstance);
    }

    StartUpdate()
    {
        this.updateInstance = requestAnimationFrame(this.Update);
    }

    SetStyle(styleParams)
    {
       this.element.setAttributeNS(null, "style", styleParams); 
    }

    SetX(sx)
    {
        this.x = sx;
        this.element.setAttributeNS(null, "x", Math.trunc(sx));
        this.SetCenter();
    }

    SetY(sy)
    {
        this.y = sy;
        this.element.setAttributeNS(null, "y", Math.trunc(sy));
        this.SetCenter();
    }

    SetPosition(sx, sy)
    {
        this.x = sx;
        this.element.setAttributeNS(null, "x", Math.trunc(sx));
        this.y = sy;
        this.element.setAttributeNS(null, "y", Math.trunc(sy));
        this.SetCenter();
    }

    SetHeight(sh)
    {
        this.height = sh;
        this.element.setAttributeNS(null, "height", Math.trunc(sh));
        this.SetCenter();
    }

    SetWidth(sw)
    {
        this.width = sw;
        this.element.setAttributeNS(null, "width", Math.trunc(sw));
        this.SetCenter();
    }

    SetSize(sw,sh)
    {
        this.height = sh;
        this.element.setAttributeNS(null, "height", Math.trunc(sh));
        this.width = sw;
        this.element.setAttributeNS(null, "width", Math.trunc(sw));
        this.SetCenter();
    }

    SetTransforms(sx,sy,sh,sw)
    {
        this.x = sx;
        this.element.setAttributeNS(null, "x", Math.trunc(sx));
        this.y = sy;
        this.element.setAttributeNS(null, "y", Math.trunc(sy));
        this.height = sh;
        this.element.setAttributeNS(null, "height", Math.trunc(sh));
        this.width = sw;
        this.element.setAttributeNS(null, "width", Math.trunc(sw));
        this.SetCenter();
    }

    MakeChild(child)
    {
        let oldChild = child.element;
        child.element.remove();
        this.element.appendChild(oldChild);
        
    }

    SetCenter()
    {
        this.centerX = this.x + (this.width/2);
        this.centerY = this.y + (this.height/2);
    }

    CenterObject()
    {
        this.x = this.x - (this.width/2);
        this.y = this.y - (this.height/2);
        this.SetCenter();
    }

    static CheckSpecificCollision(ob1, ob2)
    {
      let ob2LeftBoundry = ob2.x;
      let ob2RightBoundry = ob2.x+ob2.width;
      let ob2TopBoundry = ob2.y;
      let ob2BottomBoundry = ob2.y + ob2.height;

      return (ob1.centerX > ob2LeftBoundry && ob1.centerX < ob2RightBoundry) && (ob1.centerY > ob2TopBoundry && ob1.centerY < ob2BottomBoundry)
     // return true;
     // else
     // return false;
    }

    CheckCollision(colCheck){
      let leftBoundry = colCheck.x;
      let rightBoundry = colCheck.x+colCheck.width;
      let topBoundry = colCheck.y;
      let bottomBoundry = colCheck.y + colCheck.height;

      return (this.centerX > leftBoundry && this.centerX < rightBoundry) && (this.centerY > topBoundry && this.centerY < bottomBoundry);
      //return true;
      //else
      //return false;
    }

    MoveToCenter()
    {
        this.SetPosition(this.x - this.width/2, this.y - this.height/2);
        this.SetCenter();
    }

    MoveToObjectCenter(ob)
    {
        this.SetPosition(ob.centerX - this.width/2, ob.centerY - this.height/2);
        this.SetCenter();
    }

}