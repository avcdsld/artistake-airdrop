import p5Types from "p5"; //Import this for typechecking and intellisense

export default function sketch(s: any) {
  let img: p5Types.Image
  let num = 99;

  s.preload = () => {
    img = s.loadImage('assets/hero.jpg');
  }

  s.setup = () => {
    if (s.windowWidth > 720) {
      s.createCanvas(720, 720);
    } else {
      s.createCanvas(s.windowWidth, s.windowHeight);
    }
    s.pixelDensity(1);
    s.frameRate(40);
    s.noStroke();
    s.background(28, 32, 60);
    s.imageMode(s.CENTER);
    
    s.textSize(14);
    s.textAlign(s.CENTER, s.BOTTOM);
    s.textFont('Lato');
    
    s.mouseX = s.width / 3;
    s.mouseY = s.height / 3;
  }

  s.draw = () => {
    s.push();
    img.loadPixels();
    for (let i = 0; i < s.mouseX; i++) {
      num += s.mouseY;
  		num %= img.width * img.height;

      const x = num % img.width;
      const y = num / img.width;

      s.fill(img.get(x, y));
      s.rect(x + s.width/2 - img.width/2, y + s.height/2 - img.height/2, 9, 9);
    }
    s.blend(0, 0, s.width, s.width-1, 0, 0, s.width, s.width, s.REPLACE);
    s.pop();

    s.push();
    s.noFill()
    const red = s.map(s.mouseY, 0, s.width, 0, 255);
    const blue = s.map(s.mouseX, 0, s.height, 0, 255);
    s.fill(red, blue, 150);
    s.text('F R A C T O N   I N C U B A T I O N   2 0 2 1   S E L E C T I O N   M E M O R I A L', 0, s.height/2 + img.height/2 - 8, s.width);
    s.pop();
  };
}
