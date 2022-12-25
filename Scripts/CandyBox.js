class CandyBox extends GameObject
{
    direction;

    constructor(type,sid,sx,sy,sheight,swidth,imgSrc, control, dir)
    {
        super(type,sid,sx,sy,sheight,swidth,imgSrc, control);
        this.direction = dir;
    }
} 