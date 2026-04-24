function sketch2(p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(60);
    p.noFill();
  };

  p.draw = function () {
    const W = p.width, H = p.height;
    p.background(245, 245, 245);

    // background gaussian scatter
    p.stroke(0);
    for (let i = 0; i < 5000; i++) {
      p.point(p.randomGaussian(W / 2, 400), p.random(0, H));
    }

    p.push();
    p.translate(W / 5, H / 4);

    // circle scatter
    p.stroke(100, 75, 50);
    for (let i = 0; i < 5000; i++) {
      const r = Math.max(p.random(2, 0), p.random(0, W / 8));
      const a = p.random(2, p.PI * 3);
      p.point(Math.cos(a) * r, Math.sin(a) * r);
    }

    // top line
    p.stroke(0, 29, 125);
    for (let i = 0; i < 500; i++) {
      p.point(p.random(90, 500), p.random(10, 45));
    }

    // bottom line
    for (let i = 0; i < 8000; i++) {
      p.point(p.random(10, 800), p.random(260, 510));
    }

    // left & right lines
    for (let i = 0; i < 8000; i++) {
      p.point(p.random(40,  110), Math.max(p.random(50,  100), p.random(10, 1000)));
      p.point(p.random(190, 350), Math.max(p.random(10,  330), p.random(80,  200)));
      p.point(p.random(40,   60), Math.max(p.random(10,   10), p.random(200, 500)));
    }

    // square — rotated yellow slab
    p.push();
    p.stroke(255, 179, 15);
    p.rotate(-p.PI / 8);
    for (let i = 0; i < 60000; i++) {
      p.point(p.random(50, 800), p.random(80, 230));
    }
    p.pop();

    // square shadow
    p.push();
    p.stroke(126, 126, 126);
    p.rotate(-p.PI / 8);
    for (let i = 0; i < 3000; i++) {
      p.point(
        Math.min(p.random(50, 800), p.random(50, 800)),
        Math.max(p.random(80, 150), p.random(80, 230))
      );
    }
    p.pop();

    p.pop(); // end translate(W/5, H/4)

    // wave black
    p.push();
    p.stroke(2);
    p.translate(0, H / 2 + 10);
    for (let i = 0; i < 8000; i++) {
      const wx = p.random(0, W);
      p.point(wx, Math.cos((wx / W) * p.PI * 80) * 20 + p.random(30, 50));
    }
    p.pop();

    // wave red
    p.push();
    p.stroke(224, 49, 0);
    p.translate(0, H / 2);
    for (let i = 0; i < 6000; i++) {
      const wx = p.random(2, W);
      p.point(wx, Math.cos((wx / W) * p.PI * 2) * 20 + p.random(10, 80));
    }
    p.pop();
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}