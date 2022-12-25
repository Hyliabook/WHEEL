class Symbol extends GameObject{

    mouseIsDown;
    origX;
    origY;
    locked;
    currentSquare;

    constructor(type,sid,sx,sy,sheight,swidth,imgSrc, control){
        super(type,sid,sx,sy,sheight,swidth,imgSrc, control);

        this.mouseIsDown = false;
        this.element.onmousedown = this.MouseClicked.bind(this);
        this.element.onmouseup = this.MouseUped.bind(this);
        this.locked = false;
        this.currentSquare = null;
        this.origX = sx;
        this.origY = sy;
        
    }

    MouseClicked(e)
    {
         this.mouseIsDown = !this.mouseIsDown;
         document.onmousemove = this.DragElement.bind(this);
    }

    Update()
    {
        super.Update();

    }

    DragElement(e)
    {
        
        if(!this.locked){
        if(this.mouseIsDown){
       // if((e.x > this.x && e.x < this.x + this.width) && (e.y > this.y && e.x < this.y + this.height) )
        //{    
        let targetBounds = this.svgObject.getBoundingClientRect();

        let newX = (e.x - targetBounds.left) - this.width/2;
        let newY = (e.y - targetBounds.top) - this.height/2;

        //this.SetPosition(e.x - (this.width/2), e.y - this.height/2)
        this.SetPosition(newX, newY);
        //}
                         }
    }
    }

    MouseUped(e)
    {
        this.mouseIsDown = !this.mouseIsDown;
        this.CandyCheck();
    }

    CandyCheck()
    {
        for(let x=0;x<this.controller.squares.length;x++)
        {
            if(this.CheckCollision(this.controller.squares[x]))
            {
                console.log("Hit on " + this.controller.squares[x].direction + "!");
                this.Hit(this.controller.squares[x]);
            }
            else
            {
                console.log("miss :(");
            }
        }
    }

    Hit(hitObject)
    {
        this.locked = true;
        this.SetPosition(hitObject.centerX, hitObject.centerY);
        this.currentSquare = hitObject;
        this.MoveToCenter();

        if(this.CheckAllLocked())
        {
            if(this.CheckSolution())
            this.PuzzleSolved();
            else
            this.PuzzleFailed();
        }
        

    }

    CheckAllLocked()
    {
        for(let x=0;x<controller.symbols.length;x++)
        {
            console.log("Start of Loop");
            if(!controller.symbols[x].locked)
                return false;   
        }

        return true;
    }

    CheckSolution()
    {
        let checks = []

        checks[0] = (controller.symbols[0].currentSquare.direction == "N");
        checks[1] = (controller.symbols[1].currentSquare.direction == "W");
        checks[2] = (controller.symbols[2].currentSquare.direction == "C");
        checks[3] = (controller.symbols[3].currentSquare.direction == "S");
        checks[4] = (controller.symbols[4].currentSquare.direction == "E");

        for(let x=0;x<checks.length;x++)
        {
            if(!checks[x])
                return false;
        }

        return true;
    }

    PuzzleFailed()
    {
        for(let x=0;x<controller.symbols.length;x++)
        {
            controller.symbols[x].locked = false;
            controller.symbols[x].SetPosition(controller.symbols[x].origX, controller.symbols[x].origY);
            controller.symbols[x].currentSquare = null;
        }

        controller.sfx.src = "./Audio/Alarm_sabotage.wav";
        controller.sfx.play();
    }

    PuzzleSolved()
    {   
        console.log("We did it!!!!!!")
        controller.Victory1();
    }

}