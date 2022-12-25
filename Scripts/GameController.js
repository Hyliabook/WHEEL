class GameController extends GameObject
{

    test;
    number;
    test2;
    wheel;
    fire;
    water;
    earth;
    metal;
    wood;
    testCirc;
    squares;
    symbols;
    stars;
    sfx;
    passInput;
    passCount;
    pass;
    puzzleOver;
    delayingEnding;
    delayEndingTimer;
    moveDown;
    code;

    constructor(type,sid,sx,sy,sheight,swidth,imgSrc, control)
    {

        super(type, sid, sx, sy, sheight, swidth, imgSrc, control);
        this.test = null;
        this.test2 = null;
        this.number = 0;
        this.symbols = [];
        this.sfx = document.querySelector("#sfx");
        this.stars = [];
        this.passCount = 1;
        this.pass = "";
        this.puzzleOver = false;
        this.delayingEnding = true;
        this.delayEndingTimer = 0;
        this.moveDown = false;
    }

  Init()
  {
    this.SetUpBoard();
    //this.GenerateCompass();
}

    SetUpBoard()
    {
        let tinRatio = 100;

    let xoffset = 200;

    this.code = new GameObject("image", "code", 6900, 4200, 200, 600, "./Images/975.png", this);
    this.wheel = new GameObject("image", "wheel", 1920/8-100,(1080/8)+100, 800,800, "./Images/pepper.png", this);

    this.code.MoveToObjectCenter(this.wheel);

    this.SetUpSquares(tinRatio);

    let wheelCenterX = this.wheel.x + (this.wheel.width / 2);
    let wheelCenterY = this.wheel.y + (this.wheel.height / 2);
    //this.testCirc = new GameObject("rect", "testCir", wheelCenterX, wheelCenterY,10,10, null);
    //this.testCirc.SetStyle("fill:crimson");
    //console.log(wheelCenterY);
    this.water = new Symbol("image", "water", this.wheel.centerX - 75/2, this.wheel.centerY + 500, tinRatio * 1.25 ,tinRatio * .66, "./Images/tears.png", this);
    //console.log(this.water.y);
    this.metal = new Symbol("image", "metal", this.water.x - xoffset, this.water.y, tinRatio * .75, tinRatio * 2.25, "./Images/fe.png", this);
    this.earth = new Symbol("image", "earth", this.metal.x - xoffset/2, this.water.y, tinRatio,tinRatio, "./Images/dirtBlock.png", this);
    this.fire = new Symbol("image", "fire", this.water.x + xoffset /1.5, this.water.y, tinRatio * 1.1, tinRatio * 1.1, "./Images/fiyah.png", this);
    this.wood = new Symbol("image", "wood", this.fire.x + xoffset / 1.25, this.water.y, tinRatio * 1.3, tinRatio, "./Images/treeee.png", this);

    this.symbols[0] = this.water;
    this.symbols[1] = this.metal;
    this.symbols[2] = this.earth;
    this.symbols[3] = this.fire;
    this.symbols[4] = this.wood;

    

    }

    SetUpSquares(tinRatio)
    {
      this.squares = [];

    let squareOffset = 300;

    this.squares[0] = new CandyBox("image", "NorthBox", this.wheel.centerX, this.wheel.centerY-squareOffset, tinRatio * 1.4, tinRatio * 1.4, "./Images/candySquare.png", this, "N");
    this.squares[1] = new CandyBox("image", "EastBox", this.wheel.centerX+squareOffset, this.wheel.centerY, tinRatio * 1.4, tinRatio * 1.4, "./Images/candySquare.png", this, "E");
    this.squares[2] = new CandyBox("image", "WestBox", this.wheel.centerX-squareOffset, this.wheel.centerY, tinRatio * 1.4, tinRatio * 1.4, "./Images/candySquare.png", this, "W");
    this.squares[3] = new CandyBox("image", "SouthBox", this.wheel.centerX, this.wheel.centerY+squareOffset, tinRatio * 1.4, tinRatio * 1.4, "./Images/candySquare.png", this, "S");
    this.squares[4] = new CandyBox("image", "CenterBox", this.wheel.centerX, this.wheel.centerY, tinRatio * 1.4, tinRatio * 1.4, "./Images/candySquare.png",this, "C");

    for(let x=0;x<this.squares.length;x++)
      this.squares[x].SetPosition(this.squares[x].x-(this.squares[x].width/2), this.squares[x].y - (this.squares[x].height/2));
      
    
    }

    Victory1()
    {
        this.sfx.src = "./Audio/task_Complete.wav";
        this.sfx.play();
        this.GeneratePuzzle2();
    }

    GeneratePuzzle2()
    {
      this.GenerateStars();
      this.GeneratePassInput();
    }

    GenerateStars()
    {
      let starSize = 100;
      this.stars[0] = new Star("image", "WaterStar", 0, 0, starSize, starSize, "./Images/star.png", "Water", this);
      this.stars[0].MoveToObjectCenter(this.symbols[0]);
      this.stars[1] = new Star("image", "MetalStar", 0, 0, starSize, starSize, "./Images/star.png", "Metal", this);
      this.stars[1].MoveToObjectCenter(this.symbols[1]);
      this.stars[2] = new Star("image", "EarthStar", 0, 0, starSize, starSize, "./Images/star.png", "Earth", this);
      this.stars[2].MoveToObjectCenter(this.symbols[2]);
      this.stars[3] = new Star("image", "FireStar", 0, 0, starSize, starSize, "./Images/star.png", "Fire", this);
      this.stars[3].MoveToObjectCenter(this.symbols[3]);
      this.stars[4] = new Star("image", "WoodStar", 0, 0, starSize, starSize, "./Images/star.png", "Wood", this);
      this.stars[4].MoveToObjectCenter(this.symbols[4]);

    }

    GeneratePassInput()
    {
      this.passInput = new PassInput(null, "passInput", 0,0,0,0,null,this);
    }

    UpdatePassword(hitStar)
    {

      let newHref = null;
      switch(hitStar.symbol)
      {
        case("Fire"): newHref = "./Images/fiyah.png"; break;
        case("Water"): newHref = "./Images/tears.png"; break;
        case("Earth"): newHref = "./Images/dirtBlock.png"; break;
        case("Metal"): newHref = "./Images/fe.png"; break;
        case("Wood"): newHref = "./Images/treeee.png"; break;
        default: console.log("Well, crap.");

      }

      this.pass += hitStar.symbol;

      this.passInput.slots[this.passCount].element.setAttributeNS(null, "href", newHref);
      this.passCount++;

      console.log("passCount: " +this.passCount);

      if(this.passCount >= 4)
      {
        if(this.CheckSolution2())
        this.puzzleOver = true;
        else
        this.ResetPuzzle2();
      }

      
    }

    CheckSolution2()
    {
        if(this.pass == "FireWaterWood")
          return true;

        
        else
          return false;

        
    }

    ResetPuzzle2()
    {
      this.pass = "";
      this.passCount = 1;
      let origHref = "./Images/minus.png";
      for(let x=1;x<this.passInput.slots.length;x++)
        this.passInput.slots[x].element.setAttributeNS(null, "href", origHref);
      
        this.sfx.src = "./Audio/no.mp3";
        this.sfx.play();
    }

    DelayEnding()
    {
        if(this.delayEndingTimer > 1500)
        {
          this.delayingEnding = false;
          this.Victory2();
        }
        else
          this.delayEndingTimer += this.deltaTime;
        
    }

    MoveDown()
    {
        let moveSpeed = .1 * this.deltaTime;

        this.wheel.SetPosition(this.wheel.x, this.wheel.y + moveSpeed);

        for(let x=0;x<this.symbols.length;x++)
        {
          this.symbols[x].SetPosition(this.symbols[x].x, this.symbols[x].y + moveSpeed);
          this.squares[x].SetPosition(this.squares[x].x, this.squares[x].y + moveSpeed);
          this.stars[x].SetPosition(this.stars[x].x, this.stars[x].y + moveSpeed);
        }
    }

    Victory2()
    {
      this.sfx.src = "./Audio/zeldaJingle.mp3";
      this.sfx.play();
      this.moveDown = true;
    }
  
  Update(){
    super.Update();

    if(this.puzzleOver && this.delayingEnding)
      this.DelayEnding();

    if(this.moveDown && this.wheel.y < 5000)
      this.MoveDown();

  }  
}