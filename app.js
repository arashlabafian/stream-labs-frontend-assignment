const imgUrls = ["./assets/dog.png", "./assets/cat.png"];

const state = {
  images: [],
  canvas: null,
  canvasContext: null,
  BoundingClient: null,
  // drag related variables
  okToDrag: false,
  startX: null,
  startY: null,
};

const loadImages = async (imageUrls) => {
  const images = [];
  for (let i = 0; i < imgUrls.length; i++) {
    try {
      const element = await loadImage(imageUrls[i]);
      images.push({
        element,
        data: {
          id: i + 1,
          x: 0,
          y: 0,
          width: element.width,
          height: element.height,
          isDragging: false,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  }
  return images;
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.addEventListener("error", reject);
    image.src = src;
  });
}

function render() {
  clear();
  drawImages();
}

const clear = () => {
  state.canvasContext.clearRect(0, 0, state.canvas.width, state.canvas.height);
};

function drawImages() {
  state.images.forEach((image) => {
    const imageRect = new Path2D();
    imageRect.rect(0, 0, image.data.width, image.data.height);
    image.path = imageRect;
    state.canvasContext.drawImage(
      image.element,
      image.data.x,
      image.data.y,
      image.data.width,
      image.data.height
    );

    if (image.data.isDragging) {
      state.canvasContext.lineWidth = "2";
      state.canvasContext.strokeStyle = "green";
      state.canvasContext.strokeRect(
        image.data.x,
        image.data.y,
        image.data.width,
        image.data.height
      );
    }
  });
}

// handle mousedown events
const onMouseDown = (e) => {
  e.preventDefault();
  e.stopPropagation();

  // get the current mouse position
  var mx = parseInt(e.clientX);
  var my = parseInt(e.clientY);

  const scrollTop =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  const scrollLeft =
    window.pageXOffset !== undefined
      ? window.pageXOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollLeft;

  if (scrollTop) my = my + scrollTop;
  if (scrollLeft) mx = mx + scrollLeft;

  // test each rect to see if mouse is inside
  state.okToDrag = false;
  for (var i = state.images.length - 1; i >= 0; i--) {
    var r = state.images[i];
    if (
      mx > r.data.x &&
      mx < r.data.x + r.data.width &&
      my > r.data.y &&
      my < r.data.y + r.data.height
    ) {
      state.okToDrag = true;
      r.data.isDragging = true;

      if (state.images[state.images.length - 1] !== r) {
        const idx = state.images.findIndex((image) => image === r);
        state.images.splice(idx, 1);
        state.images.push(r);
      }
      break;
    }
  }

  // save the current mouse position
  state.startX = mx;
  state.startY = my;
};

// handle mouseup events
const onMouseUp = (e) => {
  e.preventDefault();
  e.stopPropagation();

  // clear all the dragging flags
  state.okToDrag = false;
  for (var i = 0; i < state.images.length; i++) {
    state.images[i].data.isDragging = false;
  }
  render();
};

// handle mouse moves
const onMouseMove = (e) => {
  if (state.okToDrag) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX);
    var my = parseInt(e.clientY);

    const scrollTop =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;
    const scrollLeft =
      window.pageXOffset !== undefined
        ? window.pageXOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollLeft;
    if (scrollTop) my = my + scrollTop;
    if (scrollLeft) mx = mx + scrollLeft;

    // calculate the distance the mouse has moved
    // since the last mousemove
    var dx = mx - state.startX;
    var dy = my - state.startY;

    // move each rect that isDragging
    // by the distance the mouse has moved
    // since the last mousemove
    for (var i = 0; i < state.images.length; i++) {
      var r = state.images[i];
      if (
        r.data.isDragging &&
        r.data.x + dx >= 0 &&
        r.data.y + dy >= 0 &&
        r.data.x + dx <= state.canvas.width - r.data.width &&
        r.data.y + dy <= state.canvas.height - r.data.height
      ) {
        r.data.x += dx;
        r.data.y += dy;
      }
    }
    // redraw the scene with the new rect positions
    render();

    // reset the starting mouse position for the next mousemove
    state.startX = mx;
    state.startY = my;
  }
};

function adjustCanvasSize() {
  const { innerWidth } = window;
  state.canvas.width = innerWidth;
  state.canvas.height = Math.floor((innerWidth / 16) * 9);
}

async function setInitialState() {
  state.images = await loadImages(imgUrls);
  state.canvas = document.getElementById("canvas");
  state.canvasContext = state.canvas.getContext("2d");
  state.BoundingClient = state.canvas.getBoundingClientRect();
}

window.addEventListener("load", async () => {
  await setInitialState();
  adjustCanvasSize();

  state.canvas.onmousedown = onMouseDown;
  state.canvas.onmouseup = onMouseUp;
  state.canvas.onmousemove = onMouseMove;

  render();
});
