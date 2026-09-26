// XPAD - X Layer DAO Launchpad
(function () {
  "use strict";

  // ===== 移动端菜单 =====
  var burger = document.getElementById("burger");
  var links = document.querySelector(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // ===== 滚动淡入 =====
  var reveals = document.querySelectorAll(".reveal");
  // 测试/无动画模式：?nofx 直接全部显示
  if (/[?&]nofx/.test(location.search)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // ===== Donut 动画（90%）=====
  var arc = document.getElementById("donutArc");
  if (arc) {
    var r = 80;
    var c = 2 * Math.PI * r;
    arc.style.strokeDasharray = c;
    arc.style.strokeDashoffset = c;
    var showArc = function () {
      arc.style.strokeDashoffset = c * 0.10; // 90%
    };
    if ("IntersectionObserver" in window) {
      var dio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          showArc();
          dio.disconnect();
        });
      }, { threshold: 0.35 });
      dio.observe(arc.closest(".donut-card") || arc);
    } else {
      showArc();
    }
  }

  // ===== 10X 收益进度条 =====
  var capFill = document.getElementById("capFill");
  if (capFill) {
    var showCap = function () { capFill.style.width = "100%"; };
    if ("IntersectionObserver" in window) {
      var pio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          showCap();
          pio.disconnect();
        });
      }, { threshold: 0.4 });
      pio.observe(capFill);
    } else {
      showCap();
    }
  }
})();
