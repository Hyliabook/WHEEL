class PassInput extends GameObject
{
    slots;
    passRatio;

    constructor(type,sid,sx,sy,sheight,swidth,imgSrc, control)
    {
        super(type,sid,sx,sy,sheight,swidth,imgSrc, control);
        this.slots = [];

        let passRatio = 200;

        this.slots[0] = new GameObject("image", "brackets", 0,0, passRatio, passRatio *2, "./Images/brackets.png", this.controller);
        //console.log(this.controller.wheel);
        this.slots[0].MoveToObjectCenter(this.controller.wheel);
        this.slots[0].SetPosition(this.slots[0].x, 5);

        this.slots[2] = new GameObject("image", "minusMiddle", 0,0,this.slots[0].height, this.slots[0].width/6, "./Images/minus.png",this.controller);
        this.slots[2].MoveToObjectCenter(this.slots[0]);

        this.slots[1] = new GameObject("image", "minusLeft", 0,0,this.slots[2].height,this.slots[2].width, "./Images/minus.png", this.controller);
        this.slots[1].MoveToObjectCenter(this.slots[2]);
        this.slots[1].SetPosition(this.slots[1].x - this.slots[0].width/4, this.slots[1].y);

        this.slots[3] = new GameObject("image", "minusRight", 0,0,this.slots[2].height,this.slots[2].width, "./Images/minus.png", this.controller);
        this.slots[3].MoveToObjectCenter(this.slots[2]);
        this.slots[3].SetPosition(this.slots[3].x + this.slots[0].width/4, this.slots[3].y);



    }

    Update()
    {
        super.Update();
    }
}
   