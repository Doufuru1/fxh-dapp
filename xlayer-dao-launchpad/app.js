// OK.MEME - X Layer DAO Launchpad
(function () {
  "use strict";

  var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;

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
    // 兜底：首屏元素 1.5s 后若仍未触发则强制显示（防止 JS 异常导致空白页）
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
      });
    }, 1500);
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

  // ===== NFT 卡 3D 倾斜 + 眩光 =====
  var tiltWrap = document.querySelector(".nft-tilt");
  var nftCard = document.querySelector(".nft-card3d");
  if (tiltWrap && nftCard && canHover) {
    var glare = nftCard.querySelector(".nft-glare");
    tiltWrap.addEventListener("mousemove", function (e) {
      var rect = tiltWrap.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      nftCard.style.transform = "rotateY(" + (px * 15).toFixed(2) + "deg) rotateX(" + (-py * 13).toFixed(2) + "deg)";
      if (glare) {
        glare.style.setProperty("--gx", ((px + 0.5) * 100).toFixed(1) + "%");
        glare.style.setProperty("--gy", ((py + 0.5) * 100).toFixed(1) + "%");
        glare.style.opacity = "1";
      }
    });
    tiltWrap.addEventListener("mouseleave", function () {
      nftCard.style.transform = "";
      if (glare) glare.style.opacity = "0";
    });
  }

  // ===== 卡片聚光跟随 =====
  if (canHover) {
    document.querySelectorAll(".glass-card, .feature-card, .stat-card, .flow-card, .loop-item p, .donut-card, .perk").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - rect.left).toFixed(0) + "px");
        card.style.setProperty("--my", (e.clientY - rect.top).toFixed(0) + "px");
      });
    });
  }

  // ===== 导航滚动状态 =====
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ===== 中英双语切换（默认英语）=====
  var LANG_KEY = "okmeme-lang";
  function applyLang(lang) {
    var nodes = document.querySelectorAll("[data-zh]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = lang === "zh"
        ? nodes[i].getAttribute("data-zh")
        : nodes[i].getAttribute("data-en");
    }
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    var t = document.querySelector("title[data-en]");
    if (t) document.title = lang === "zh" ? t.getAttribute("data-zh") : t.getAttribute("data-en");
    var lt = document.getElementById("langToggle");
    if (lt) lt.textContent = lang === "zh" ? "EN" : "中文";
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }
  var savedLang = "en";
  try { savedLang = localStorage.getItem(LANG_KEY) || "en"; } catch (e) {}
  // URL 参数优先，便于测试与分享：?lang=zh / ?lang=en
  var langMatch = /[?&]lang=(zh|en)/.exec(location.search);
  if (langMatch) savedLang = langMatch[1];
  applyLang(savedLang);
  var langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var cur = document.documentElement.lang === "zh-CN" ? "zh" : "en";
      applyLang(cur === "en" ? "zh" : "en");
      if (links) links.classList.remove("open");
    });
  }
})();
