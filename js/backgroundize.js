/**
 * Banner 背景固定到 #web_bg 背景板：
 * 电脑端（视口宽度达到 768px）Banner 图固定在背景板，不随页面滚动
 * 移动端保持 Fluid 原始效果（Banner 随页面滚动 + 视差）
 *
 * 注意：本站构建流程会给 source 下的 js 资源做 HTML 转义，
 * 因此本文件内不能出现小于号、大于号、与号等字符，比较逻辑一律走 matchMedia。
 */
(function () {
  var DESKTOP_QUERY = '(min-width: 768px)';
  // 极老浏览器无 matchMedia 时，退化为按桌面端处理
  var mql = window.matchMedia ? window.matchMedia(DESKTOP_QUERY) : { matches: true };

  var banner = document.getElementById('banner');
  var viewBg = document.getElementById('web_bg');
  var mask = banner ? banner.querySelector('.mask') : null;
  if (!banner || !viewBg || !mask) return;

  // 记录原始内联样式，切回移动端时还原
  var origin = {
    bannerImage: banner.style.backgroundImage,
    bannerAttachment: banner.style.backgroundAttachment,
    viewBgImage: viewBg.style.backgroundImage,
    viewBgColor: viewBg.style.backgroundColor,
    maskColor: mask.style.backgroundColor
  };

  function activate() {
    var bg = window.getComputedStyle(banner).backgroundImage;
    if (!bg || bg === 'none') return;
    // 图片下沉到固定背景板，蒙版颜色同时下沉为背景色
    viewBg.style.backgroundImage = bg;
    viewBg.style.backgroundColor = window.getComputedStyle(mask).backgroundColor;
    banner.style.backgroundImage = 'none';
    banner.style.backgroundAttachment = 'scroll';
    mask.style.backgroundColor = 'rgba(0,0,0,0)';
  }

  function deactivate() {
    viewBg.style.backgroundImage = origin.viewBgImage;
    viewBg.style.backgroundColor = origin.viewBgColor;
    banner.style.backgroundImage = origin.bannerImage;
    banner.style.backgroundAttachment = origin.bannerAttachment;
    mask.style.backgroundColor = origin.maskColor;
  }

  function sync() {
    if (mql.matches) activate();
    else deactivate();
  }

  sync();
  if (mql.addEventListener) mql.addEventListener('change', sync);
  else if (mql.addListener) mql.addListener(sync);
})();
