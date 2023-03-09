/*
 * @Description: 一个手写签名版
 */
import { onReady } from "@dcloudio/uni-app";
import { getCurrentInstance, reactive, ref } from "vue";

interface StrokeItem {
  x: number;
  y: number;
}
interface DrawCoordinate {
  moveX: number;
  moveY: number;
  lineX: number;
  liney: number;
}

export default function useDrawingBoard(el: string, options = { lineColor: "#000000", lineWidth: 4, width: 630 }) {
  const { proxy } = getCurrentInstance() as any;
  const isMove = ref(false);
  const canvasId = ref(el + Date.now());
  const drawData = reactive({
    width: 0,
    height: 0,
    strokes: [] as Array<Array<StrokeItem>>,
  });
  let ctx: UniNamespace.CanvasContext;

  // TouchEvent;
  function canvasStart(event: any) {
    const { x, y } = event.touches[0];
    drawData.strokes.push([{ x, y }]);
  }

  function canvasMove(event: any) {
    const { x, y } = event.touches[0];
    const index = drawData.strokes.length - 1;
    drawData.strokes[index].push({ x, y });
    const stroke = drawData.strokes[index];
    const { x: moveX, y: moveY } = stroke[stroke.length - 1];
    const { x: lineX, y: liney } = stroke[stroke.length - 2];
    drawGraphics({ moveX, moveY, lineX, liney });
    isMove.value = true;
  }
  // 创建画布
  function createCanvasContext() {
    const { lineColor, lineWidth } = options;
    ctx = uni.createCanvasContext(canvasId.value, proxy);
    ctx.setLineCap("round");
    ctx.setStrokeStyle(lineColor);
    ctx.setLineWidth(lineWidth);
  }
  //绘制
  function drawGraphics(cd: DrawCoordinate) {
    ctx.beginPath();
    ctx.moveTo(cd.moveX, cd.moveY);
    ctx.lineTo(cd.lineX, cd.liney);
    ctx.stroke();
    ctx.draw(true);
  }
  // 清空画布
  function empty() {
    drawData.strokes = [];
    ctx.clearRect(0, 0, drawData.width, drawData.height);
    ctx.draw();
  }

  // 转化为图片
  function toImage() {
    return new Promise((resolve, reject) => {
      uni.canvasToTempFilePath(
        {
          canvasId: canvasId.value,
          success: function (res) {
            resolve(res.tempFilePath);
          },
          fail: function (err) {
            reject(err);
          },
        },
        proxy,
      );
    });
  }

  onReady(() => {
    uni.getSystemInfo({
      success: function ({ windowHeight, windowWidth }) {
        const width = (windowWidth * options.width) / 750;
        drawData.width = width;
        drawData.height = windowHeight;
      },
    });
    createCanvasContext();
  });
  return {
    canvasId,
    drawData,
    canvasStart,
    canvasMove,
    empty,
    toImage,
  };
}
