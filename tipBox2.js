/*
@file tipBox.js 点赞加1效果
@author liruonan<812560550@qq.com>
@date 2018/10/28
*/
export default function tipBox (node, options) {
  options = Object.assign({
    obj: node || null,
    str: '+1', // 字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
    startSize: '12px',
    endSize: '20px',
    interval: 600,
    color: '#EE0000',
    weight: 'bold',
    callback: function () {}
  }, options)
  const body = document.body || document.getElementsByTagName('body')[0]
  const box = document.createElement('span')
  box.className = 'num'
  box.innerHTML = '+1'
  body.appendChild(box)

  // 获得当前元素相对于文档的偏移量
  let getOffset = (elem) => {
    let box = elem.getBoundingClientRect()
    let domElem = document.documentElement
    return {
      top: box.top + domElem.scrollTop,
      left: box.left + domElem.scrollLeft
    }
  }
  let left = getOffset(options.obj).left
  let top = getOffset(options.obj).top

  // 设置当前元素的样式
  const styles = {
    'position': 'absolute',
    'left': left + 10 + 'px',
    'top': top - 10 + 'px',
    'z-index': 9999,
    'font-size': options.startSize,
    'line-height': options.endSize,
    'color': options.color,
    'font-weight': options.weight
  }
  let setCSS = (elem, styles) => {
    for (let attr in styles) {
      elem.style[attr] = styles[attr]
    }
  }
  setCSS(box, styles)

  const animations = {
    'font-size': options.endSize,
    'opacity': '0',
    'top': top - parseInt(options.endSize) + 'px'
  }
  let animate = (elem, animations, interval, callback) => {
    let getStyle = (obj, attr) => {
      if (obj.currentStyle) {
        return obj.currentStyle[attr]
      } else {
        return getComputedStyle(obj, false)[attr]
      }
    }
    let startMove = (elem, animations, interval) => {
      clearInterval(elem.timer)
      elem.timer = setInterval(() => {
        for (let attr in animations) {
          // 计算属性
          let value = 0
          if (attr === 'opacity') {
            value = Math.round(parseInt(getStyle(elem, attr)) * 100)
          } else {
            value = parseInt(getStyle(elem, attr))
          }
          // 计算speed
          let speed = (animations[attr] - value) / 8
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
          if (attr === 'opacity') {
            elem.style.filter = 'alpha:(opacity:' + value + speed + ')'
            elem.style.opacity = (value + speed) / 100
          } else {
            elem.style[attr] = value + speed + 'px'
          }
          // 执行回调
          if (callback) {
            callback()
          }
        }
      }, interval)
    }
    startMove(elem, animations, interval)
  }
  animate(box, animations, options.interval, () => {
    box.remove()
    options.callback()
  })
}
