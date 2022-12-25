class Star extends GameObject
{
    symbol;
    trans;
    transTimer;
    fading;

    constructor(type,sid,sx,sy,sheight,swidth,imgSrc, sym, control)
    {
        super(type, sid, sx, sy, sheight, swidth, imgSrc, control);
        this.symbol = sym;
        this.trans = 0;
        this.transTimer = 0;
        this.fading = true;
        this.element.setAttributeNS(null, "opacity", 0);
        this.element.onclick = this.ClickStar.bind(this);
    }

    Update()
    {
        
        super.Update();

        if(this.fading)
            this.FadeIn();

    }

    FadeIn()
    {
        if(this.trans < 1){
        let fadeSpeed = .0005;

        this.trans += fadeSpeed * this.deltaTime;
        this.element.setAttributeNS(null, "opacity", this.trans);
        }
        else
        this.fading = false;
    }

    ClickStar(e)
    {
        if(!this.controller.puzzleOver){
        this.controller.sfx.src = "./Audio/sfx-blink.wav";
        this.controller.sfx.play();
        this.controller.UpdatePassword(this);
        }
    }
}