RoundToPixel()

function RoundToPixel() {
  Console.log('RoundToPixel()');

  if (figma.currentPage.selection.length < 1) {
    figma.notify('⚠️ Please select the layer')
  }

  handleRoundToPixel(figma.currentPage.selection)

  if (figma.currentPage.selection.length >= 1) {
    figma.notify('✅ Done')
  }
  figma.closePlugin(); //关闭插件

}

function handleRoundToPixel(targetNode) {
  for (var i = 0; i < targetNode.length; i++) {
    console.log(typeof (targetNode[i].width.toFixed(0)));
    console.log(targetNode[i].width.toFixed(0));
    console.log('targetNode[i].name:');
    console.log(targetNode[i].name);
    console.log('targetNode[i].type:');
    console.log(targetNode[i].type);

    // 宽高
    console.log('width & height----------')
    targetNode[i].resize(parseInt(targetNode[i].width.toFixed(0)), parseInt(targetNode[i].height.toFixed(0))) // 宽高
    // X、Y 坐标
    console.log('x & y----------')
    targetNode[i].x = parseInt(targetNode[i].x.toFixed(0)) // x 坐标
    targetNode[i].y = parseInt(targetNode[i].y.toFixed(0)) // y 坐标
    // 边框
    console.log('stroke----------');
    console.log(targetNode[i].strokeWeight);
    if(targetNode[i].strokeWeight!=undefined){
      targetNode[i].strokeWeight = parseInt(targetNode[i].strokeWeight.toFixed(0)) // 边框
    }
    //圆角
    console.log('radius----------');
    if (targetNode[i].type != 'TEXT' && targetNode[i].type != 'VECTOR') {
      //如果图层类型不是文本且不是矢量
      if (typeof (targetNode[i].cornerRadius) == 'symbol') {
        console.log('复合圆角');

        targetNode[i].topLeftRadius = parseInt(targetNode[i].topLeftRadius.toFixed(0)) // 左上圆角
        targetNode[i].topRightRadius = parseInt(targetNode[i].topRightRadius.toFixed(0)) // 右上圆角
        targetNode[i].bottomRightRadius = parseInt(targetNode[i].bottomRightRadius.toFixed(0)) // 右下圆角
        targetNode[i].bottomLeftRadius = parseInt(targetNode[i].bottomLeftRadius.toFixed(0)) // 左下圆角
      } else {
        console.log('统一圆角');
        console.log(targetNode[i].cornerRadius);
        if(targetNode[i].cornerRadius!=undefined){
          targetNode[i].cornerRadius = parseInt(targetNode[i].cornerRadius.toFixed(0)) // 整体圆角
        }
        
      }
    } else if (targetNode[i].type == 'VECTOR') {
      continue

    }


    if (targetNode[i].children && targetNode[i].type != 'INSTANCE') {
      //如果是实例，则忽略子图层
      handleRoundToPixel(targetNode[i].children)
    }
  }
}

async function loadFont(fontName) {
  if (fontName == null) {
    await figma.loadFontAsync({ family: "PingFang SC", style: "Regular" })
    await figma.loadFontAsync({ family: "PingFang SC", style: "Semibold" })
    await figma.loadFontAsync({ family: "PingFang SC", style: "Thin" })
    await figma.loadFontAsync({ family: "PingFang SC", style: "Light" })
    await figma.loadFontAsync({ family: "PingFang SC", style: "Medium" })
  } else {
    await figma.loadFontAsync(fontName)
  }

}