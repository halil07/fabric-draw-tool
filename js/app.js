// var content_system = "https://iys-vcloud.sebittest.com/beta/ContentSystem/";
// var category_id = "f47bb19014527cb45c66d4ac4a98dbba"
// var file_id = "d6c918ebf4e99620be5f9497e44ef39e"
// var page_num = 3;
// var scale = 5;

var Store = {}
const url = new URLSearchParams(location.href)
for ([key, value] of url.entries()) {
  Store[key] = value;
}
Store["page_num"] = +Store["page_num"];
Store["scale"] = +Store["scale"];

pdfjsLib.disableWorker = true;
var pdfCanvas = document.createElement('canvas');
var pageContext = null;

var containerDatas = [];
var containerPageNum = 1;

(function () {
  var mouseFrom = {},
    mouseTo = {},
    drawType = "select",
    canvasObjectIndex = 0,
    textbox = null;
  var drawWidth = 5;
  var color = "#E34F51";
  var drawingObject = null;
  var moveCount = 1;
  var doDrawing = false;

  var canvas = new fabric.Canvas("c", {
    isDrawingMode: true,
    skipTargetFind: true,
    selectable: false,
    selection: false
  });

  window.canvas = canvas;
  window.zoom = window.zoom ? window.zoom : 1;

  canvas.freeDrawingBrush.color = color;
  canvas.freeDrawingBrush.width = drawWidth;

  canvas.on("mouse:down", function (options) {
    var xy = transformMouse(options.e.offsetX, options.e.offsetY);
    mouseFrom.x = xy.x;
    mouseFrom.y = xy.y;
    doDrawing = true;
  });
  canvas.on("mouse:up", function (options) {
    var xy = transformMouse(options.e.offsetX, options.e.offsetY);
    mouseTo.x = xy.x;
    mouseTo.y = xy.y;
    drawingObject = null;
    moveCount = 1;
    doDrawing = false;

  });
  canvas.on("mouse:move", function (options) {
    if (moveCount % 2 && !doDrawing) {
      return;
    }
    moveCount++;
    var xy = transformMouse(options.e.offsetX, options.e.offsetY);
    mouseTo.x = xy.x;
    mouseTo.y = xy.y;
    drawing();
  });

  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 46) {
      canvas.getActiveObjects().forEach(function (obj) {
        canvas.remove(obj);
      });
    }
  })

  canvas.on("selection:created", function (e) {

  });

  canvas.on('object:selected', function (e) {
    var id = canvas.getObjects().indexOf(e.target);
    canvas.setActiveObject(canvas.item(id));
  });

  function transformMouse(mouseX, mouseY) {
    return { x: mouseX / window.zoom, y: mouseY / window.zoom };
  }

  jQuery("#toolsul")
    .find("li")
    .on("click", function () {
      //设置样式
      jQuery("#toolsul")
        .find("li>i")
        .each(function () {
          jQuery(this).attr("class", jQuery(this).attr("data-default"));
        });
      jQuery(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
      drawType = jQuery(this).attr("data-type");
      canvas.isDrawingMode = false;
      if (textbox) {
        textbox.exitEditing();
        textbox = null;
      }
      if (drawType == "pen") {
        canvas.isDrawingMode = true;
      } else if (drawType == "remove") {
        canvas.selection = true;
        canvas.skipTargetFind = false;
        canvas.selectable = true;
      } else if (drawType === "select") {
        canvas.selection = true;
        canvas.skipTargetFind = false;
        canvas.selectable = true;
      } else {
        canvas.skipTargetFind = true;
        canvas.selection = false;
      }
    });

  //绘画方法
  function drawing() {
    if (drawingObject) {
      canvas.remove(drawingObject);
    }
    var canvasObject = null;
    switch (drawType) {
      case "arrow": //箭头
        canvasObject = new fabric.Path(drawArrow(mouseFrom.x, mouseFrom.y, mouseTo.x, mouseTo.y, 30, 30), {
          stroke: color,
          fill: "rgba(255,255,255,0)",
          strokeWidth: drawWidth
        });
        break;
      case "line": //直线
        canvasObject = new fabric.Line([mouseFrom.x, mouseFrom.y, mouseTo.x, mouseTo.y], {
          stroke: color,
          strokeWidth: drawWidth
        });
        break;
      case "dottedline": //虚线
        canvasObject = new fabric.Line([mouseFrom.x, mouseFrom.y, mouseTo.x, mouseTo.y], {
          strokeDashArray: [3, 1],
          stroke: color,
          strokeWidth: drawWidth
        });
        break;
      case "circle": //正圆
        var left = mouseFrom.x,
          top = mouseFrom.y;
        var radius = Math.sqrt((mouseTo.x - left) * (mouseTo.x - left) + (mouseTo.y - top) * (mouseTo.y - top)) / 2;
        canvasObject = new fabric.Circle({
          left: left,
          top: top,
          stroke: color,
          fill: "rgba(255, 255, 255, 0)",
          radius: radius,
          strokeWidth: drawWidth
        });
        break;
      case "ellipse":
        var left = mouseFrom.x,
          top = mouseFrom.y;
        var radius = Math.sqrt((mouseTo.x - left) * (mouseTo.x - left) + (mouseTo.y - top) * (mouseTo.y - top)) / 2;
        canvasObject = new fabric.Ellipse({
          left: left,
          top: top,
          stroke: color,
          fill: "rgba(255, 255, 255, 0)",
          originX: "center",
          originY: "center",
          rx: Math.abs(left - mouseTo.x),
          ry: Math.abs(top - mouseTo.y),
          strokeWidth: drawWidth
        });
        break;
      case "square":
        break;
      case "rectangle":
        var path =
          "M " +
          mouseFrom.x +
          " " +
          mouseFrom.y +
          " L " +
          mouseTo.x +
          " " +
          mouseFrom.y +
          " L " +
          mouseTo.x +
          " " +
          mouseTo.y +
          " L " +
          mouseFrom.x +
          " " +
          mouseTo.y +
          " L " +
          mouseFrom.x +
          " " +
          mouseFrom.y +
          " z";
        canvasObject = new fabric.Path(path, {
          left: left,
          top: top,
          stroke: color,
          strokeWidth: drawWidth,
          fill: "rgba(255, 255, 255, 0)"
        });
        break;
      case "rightangle": //直角三角形
        var path = "M " + mouseFrom.x + " " + mouseFrom.y + " L " + mouseFrom.x + " " + mouseTo.y + " L " + mouseTo.x + " " + mouseTo.y + " z";
        canvasObject = new fabric.Path(path, {
          left: left,
          top: top,
          stroke: color,
          strokeWidth: drawWidth,
          fill: "rgba(255, 255, 255, 0)"
        });
        break;
      case "equilateral": //等边三角形
        var height = mouseTo.y - mouseFrom.y;
        canvasObject = new fabric.Triangle({
          top: mouseFrom.y,
          left: mouseFrom.x,
          width: Math.sqrt(Math.pow(height, 2) + Math.pow(height / 2.0, 2)),
          height: height,
          stroke: color,
          strokeWidth: drawWidth,
          fill: "rgba(255,255,255,0)"
        });
        break;
      case "isosceles":
        break;
      case "text":
        textbox = new fabric.Textbox("", {
          left: mouseFrom.x - 60,
          top: mouseFrom.y - 20,
          width: 150,
          fontSize: 18,
          borderColor: "#2c2c2c",
          fill: color,
          hasControls: false
        });
        canvas.add(textbox);
        textbox.enterEditing();
        textbox.hiddenTextarea.focus();
        break;
      case "remove":
        break;
      default:
        break;
    }
    if (canvasObject) {
      // canvasObject.index = getCanvasObjectIndex();
      canvas.add(canvasObject); //.setActiveObject(canvasObject)
      drawingObject = canvasObject;
    }
  }

  function drawArrow(fromX, fromY, toX, toY, theta, headlen) {
    theta = typeof theta != "undefined" ? theta : 30;
    headlen = typeof theta != "undefined" ? headlen : 10;
    // 计算各角度和对应的P2,P3坐标
    var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
      angle1 = (angle + theta) * Math.PI / 180,
      angle2 = (angle - theta) * Math.PI / 180,
      topX = headlen * Math.cos(angle1),
      topY = headlen * Math.sin(angle1),
      botX = headlen * Math.cos(angle2),
      botY = headlen * Math.sin(angle2);
    var arrowX = fromX - topX,
      arrowY = fromY - topY;
    var path = " M " + fromX + " " + fromY;
    path += " L " + toX + " " + toY;
    arrowX = toX + topX;
    arrowY = toY + topY;
    path += " M " + arrowX + " " + arrowY;
    path += " L " + toX + " " + toY;
    arrowX = toX + botX;
    arrowY = toY + botY;
    path += " L " + arrowX + " " + arrowY;
    return path;
  }

})();
canvas.uniformScaling = false;
canvas.uniScaleTransform = true;
const create = async (url) => {
  if (pdfData) return await pdfData;
  return new Promise((resolve, reject) => {
    const loadingTask = pdfjsLib.getDocument({
      url,
      withCredentials: true,
      origin: window.location.origin,
      disableAutoFetch: true,
      disableStream: true,
      rangeChunkSize: 65536,
    });

    loadingTask.promise
      .then((pdf) => {
        resolve(pdf);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const axiosIntance = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});
var pdfData = null;
async function getFilesData(category_id) {
  var url = Store["content_system"] + "/examcategory/getfiles?category_id=" + category_id;
  var response = await axiosIntance.get(url);
  return response.data.examCategoryFileList.find(file => file.fileExtension === "pdf")?.id;
}
var getFilesDataCache = null;
async function getPageData(category_id, page) {
  var url = Store["content_system"] + "/examcategoryevent/getbypage?category_id=" + category_id + "&page=" + page + "&with_status=false";
  var response = await axiosIntance.get(url);
  return response.data.examCategoryEvent.event.containers || [];
}

async function openPage(page_num) {
  const page = await pdfData.getPage(page_num);
  var viewport = await page.getViewport({ scale: Store["scale"] });
  pageContext = pdfCanvas.getContext('2d');
  pdfCanvas.height = viewport.height;
  pdfCanvas.width = viewport.width;
  return await page.render({ canvasContext: pageContext, viewport: viewport });
}

async function getPageDataService() {
  canvas.remove(...canvas.getObjects());
  getPageData(Store["category_id"], Store["page_num"]).then(async containerData => {
    let fileId = null;
    if (getFilesDataCache) {
      fileId = getFilesDataCache;
    } else {
      fileId = await getFilesData(Store["category_id"]);
      getFilesDataCache = fileId;
    }
    var file_url = Store["content_system"] + '/examcategory/getfile/' + fileId + '.pdf';
    create(file_url).then(function (pdf) {
      pdfData = pdf;
      Pagination.Init(document.getElementById('pagination-page'), {
        size: pdfData.numPages,
        page: +Store["page_num"],
        step: 3,
        onClick: (newPageNum) => {
          Store["page_num"] = newPageNum;
          getPageDataService();
        }
      });
      openPage(Store["page_num"]).then(() => {
        setTimeout(() => {
          cropContainers(containerData);
        }, 1000)
      });
    });
  })
}
getPageDataService()

async function mergeContainer(containerData) {
  containerData = containerData.filter(c => [11, 12, 13].includes(c.type))
  for (const container of containerData) {
    if (!container.relatedContainerIds) container.relatedContainerIds = [];
    if (!container.children) container.children = [];
    if (container.relatedContainerIds.length > 0) {
      const relatedContainers = container.relatedContainerIds.map(id => containerData.find(c => c.id === id));
      relatedContainers.forEach(relatedContainer => {
        if (!relatedContainer.children) relatedContainer.children = [];
        relatedContainer.children.push(container);
      });
    }
  }
  const masterContainer = [...containerData.filter(c => c.children.length > 0), ...containerData.filter(c => c.relatedContainerIds.length === 0 && c.children.length === 0)];
  masterContainer.forEach(c => c.master = true);
  return containerData;
}

async function cropContainers(containerData) {
  containerData = await mergeContainer(containerData)
  const page = containerPageNum;
  var masterLength = containerData.filter(c => c.master).length
  Pagination2.Init(document.getElementById('pagination-container'), {
    size: masterLength > 0 ? masterLength : 1,
    page: page,
    step: 3,
    onClick: (containerPageNum) => {
      canvas.remove(...canvas.getObjects());
      drawContainer(containerData.filter(c => c.master)[containerPageNum - 1]);
    }
  });
  if (Store.container_id) {
    drawContainer(containerData.find(c => c.id === Store.container_id));
    Store.container_id = null;
  } else if (containerData.filter(c => c.master).length > 0) {
    await drawContainer(containerData.filter(c => c.master)[0])
  }
  // return;
  await new Promise(r => setTimeout(r, 500));
  [...document.getElementsByClassName('crop-image')].map(el => el.remove());
}

async function drawContainer(container) {
  const { row, column, width, height } = container.positionF;
  const { width: pageWidth, height: pageHeight } = pdfCanvas;
  const output = {
    left: pageWidth / 100 * row,
    top: pageHeight / 100 * column,
    width: pageWidth / 100 * (width) * Store["scale"],
    height: pageHeight / 100 * (height) * Store["scale"],
  }
  const { left, top, width: OWidth, height: OHeigth } = output;
  const newCanvas = document.createElement('canvas');
  newCanvas.width = OWidth;
  newCanvas.height = OHeigth;
  const newContext = newCanvas.getContext('2d');
  await new Promise(r => setTimeout(r, 500));
  const pageContextImageData = pageContext.getImageData(left, top, OWidth, OHeigth);
  newContext.putImageData(pageContextImageData, 0, 0);
  const imageData = newCanvas.toDataURL('image/png');
  const newImage = new Image();
  newImage.src = imageData;
  newImage.style.display = 'none';
  newImage.classList.add('crop-image');
  document.body.appendChild(newImage);
  await drawImage(imageData, OWidth, OHeigth, container);
}

async function drawImage(imageData, width, height, container) {
  fabric.Image.fromURL(imageData, function (img) {
    img.set({
      id: 'image_' + Math.random(),
      width: width / Store["scale"],
      height: height / Store["scale"],
      left: 150
    })
    img.container = container;
    img.children = container.children;
    img.setControlVisible('ml', false);
    img.setControlVisible('mb', false);
    img.setControlVisible('mr', false);
    img.setControlVisible('mt', false);
    img.setControlVisible('mtr', false);
    canvas.add(img).renderAll()
  })
}



async function showSolution() {
  const allObject = canvas.getObjects();
  for (const object of allObject) {
    drawContainer(object.children[0]);
  }
}