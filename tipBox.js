/*
@file tipBox.js 点赞加1效果
@author liruonan<812560550@qq.com>
@date 2018/10/28
*/
import * as $ from 'jquery'
export default function tipsBox (node, options = {}) {
  const obj = $(node)
  options = $.extend({
    obj: obj || null, // jq对象，要在那个html标签上显示
    str: '+1', // 字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
    startSize: '12px', // 动画开始的文字大小
    endSize: '20px', // 动画结束的文字大小
    interval: 600, // 动画时间间隔
    color: '#EE0000', // 文字颜色
    weight: 'bold', // 文字
    callback: function () {} // 回调函数
  }, options)
  $('body').append(`<span class='num'>${options.str}</span>`)
  const box = $('.num')
  let left = options.obj.offset().left + options.obj.width() / 2
  let top = options.obj.offset().top - options.obj.height()
  box.css({
    'position': 'absolute',
    'left': left + 10 + 'px',
    'top': top - 10 + 'px',
    'z-index': 9999,
    'font-size': options.startSize,
    'line-height': options.endSize,
    'color': options.color,
    'font-weight': options.weight
  })
  box.animate({
    'font-size': options.endSize,
    'opacity': '0',
    'top': top - parseInt(options.endSize) + 'px'
  }, options.interval, () => {
    box.remove()
    options.callback()
  })
}
