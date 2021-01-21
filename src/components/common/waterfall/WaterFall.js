export default function Waterfall(el, gap) {
  let items = document.querySelector(el).children
  // window.onload = function() {
    WaterFall()
  // }
  function getClient() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
  }
  function WaterFall() {
    let pageWidth = getClient().width;
    let itemWidth = items[0].offsetWidth;
    let columns = parseInt(pageWidth / (itemWidth + gap));
    // 用于存放元素高度
    let arr = [];
    for (let i = 0; i < items.length; i++) {
      if (i < columns) {
        // 设置样式
        items[i].style.top = 0;
        items[i].style.left = i*(itemWidth + gap) + 'px';
        arr.push(items[i].offsetHeight)
      }else {
        // 先假设数组里的第一项为高度最小的元素，然后逐次对比，并保存索引值
        let minHeight = arr[0];
        let index = 0;
        arr.forEach((item, i) => {
          if (item < minHeight) {
            minHeight = item;
            index = i;
          }
        })
        items[i].style.left = items[index].offsetLeft + 'px';
        items[i].style.top = arr[index] + gap + 'px';
        // 修改当前最小列的高度
        // 最小列新的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
        arr[index] = arr[index] + items[i].offsetHeight + gap;
      }
    }
  }
  window.onresize = function() {
    WaterFall()
  }
}