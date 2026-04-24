function sketch1(p) {
  let camera, prevImg, currImg, diffImg, grid;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.pixelDensity(1);
    camera = p.createCapture(p.VIDEO, { flipped: true });
    camera.hide();
    grid = new Grid(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(63, 34, 236);
    camera.loadPixels();

    const smallW = Math.floor(camera.width  / 4);
    const smallH = Math.floor(camera.height / 4);

    currImg = p.createImage(smallW, smallH);
    currImg.copy(camera, 0, 0, camera.width, camera.height, 0, 0, smallW, smallH);
    currImg.filter(p.GRAY);
    currImg.filter(p.BLUR, 2);

    diffImg = p.createImage(smallW, smallH);
    diffImg.loadPixels();

    if (prevImg) {
      currImg.loadPixels();
      prevImg.loadPixels();
      for (let x = 0; x < currImg.width; x++) {
        for (let y = 0; y < currImg.height; y++) {
          const i = (x + y * currImg.width) * 4;
          const d = Math.abs(currImg.pixels[i] - prevImg.pixels[i]);
          diffImg.pixels[i]   = d;
          diffImg.pixels[i+1] = d;
          diffImg.pixels[i+2] = d;
          diffImg.pixels[i+3] = 255;
        }
      }
      diffImg.updatePixels();
    }

    prevImg = p.createImage(smallW, smallH);
    prevImg.copy(currImg, 0, 0, smallW, smallH, 0, 0, smallW, smallH);

    grid.update(diffImg);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    grid = new Grid(p.windowWidth, p.windowHeight);
  };

  function Grid(_w, _h) {
    const nw  = 5;
    const nX  = Math.floor(_w / nw);
    const nY  = Math.floor(_h / nw);
    const len = nX * nY;
    const states = new Array(len).fill(0);
    const colors = [];

    for (let i = 1; i < len; i++) {
      colors.push(p.lerpColor(p.color('#f9a770'), p.color('#845393'), 0.0001 * i));
    }

    this.update = function (img) {
      img.loadPixels();
      for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
          const idx = (x + y * img.width) * 4;
          const intensity = img.pixels[idx] / 255;
          if (intensity > 0.2) {
            const sx = p.map(x, 0, img.width,  0, _w);
            const sy = p.map(y, 0, img.height, 0, _h);
            const ni = Math.floor(sx / nw) + Math.floor(sy / nw) * nX;
            if (ni >= 0 && ni < len) states[ni] = Math.max(states[ni], intensity);
          }
        }
      }
      for (let i = 0; i < len; i++) {
        states[i] = p.constrain(states[i] - 0.02, 0, 1);
      }
      this.draw();
    };

    this.draw = function () {
      p.push();
      p.noStroke();
      for (let x = 0; x < nX; x++) {
        for (let y = 0; y < nY; y++) {
          const ni = x + y * nX;
          if (states[ni] > 0) {
            p.fill(colors[ni] || p.color('#f9a770'));
            p.ellipse(
              nw / 1 + 2 * x * nw,
              nw / 5 + 2 * y * nw,
              5 + states[ni] * 600
            );
          }
        }
      }
      p.pop();
    };
  }
}