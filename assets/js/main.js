/* ============================================================
   Divya Yog Ayurvedic Chikitsalaya — main.js
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Language toggle (EN / HI) ---------- */
  var STORE_KEY = "divyayog_lang";
  var body = document.body;

  function applyLang(lang) {
    var isHi = lang === "hi";
    body.classList.toggle("lang-hi", isHi);
    document.documentElement.lang = isHi ? "hi" : "en";

    // text nodes with data-en / data-hi
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var val = isHi ? el.getAttribute("data-hi") : el.getAttribute("data-en");
      if (val != null) el.textContent = val;
    });
    // placeholders
    document.querySelectorAll("[data-ph-en]").forEach(function (el) {
      var val = isHi ? el.getAttribute("data-ph-hi") : el.getAttribute("data-ph-en");
      if (val != null) el.setAttribute("placeholder", val);
    });
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }

  var saved = "en";
  try { saved = localStorage.getItem(STORE_KEY) || "en"; } catch (e) {}
  applyLang(saved);

  var langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", function () {
      applyLang(body.classList.contains("lang-hi") ? "en" : "hi");
    });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("main-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(
    ".section-head,.focus-card,.feature,.steps li,.split-copy,.split-list,.hero-card,.lead-form,.contact-info"
  );
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Vaidya intro video (click-to-load YouTube) ---------- */
  var vid = document.getElementById("vaidyaVideo");
  if (vid) {
    var vidId = (vid.getAttribute("data-video-id") || "").trim();
    if (!vidId) {
      vid.classList.add("no-video"); // no ID yet -> just a static poster
    } else {
      var loadVideo = function () {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src",
          "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(vidId) +
          "?autoplay=1&rel=0&modestbranding=1");
        iframe.setAttribute("title", "Vaidya S. N. Sharma introduction");
        iframe.setAttribute("allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute("allowfullscreen", "");
        vid.innerHTML = "";
        vid.appendChild(iframe);
      };
      vid.addEventListener("click", loadVideo);
      vid.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); loadVideo(); }
      });
    }
  }

  /* ---------- Lead form (Web3Forms AJAX) ---------- */
  var form = document.getElementById("leadForm");
  var statusEl = document.getElementById("formStatus");
  var submitBtn = document.getElementById("submitBtn");

  function t(en, hi) { return body.classList.contains("lang-hi") ? hi : en; }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var key = form.querySelector('[name="access_key"]').value;
      if (!key || key.indexOf("REPLACE_WITH") === 0) {
        // Fallback: no key configured yet -> send via WhatsApp so no lead is lost.
        var name = (form.name.value || "").trim();
        var phone = (form.phone.value || "").trim();
        var concern = (form.concern.value || "").trim();
        var city = (form.city.value || "").trim();
        var msg = (form.message.value || "").trim();
        var waText =
          "Namaste, I would like to book an Ayurvedic consultation at Divya Yog, Rohtak.%0A" +
          "Name: " + encodeURIComponent(name) + "%0A" +
          "Phone: " + encodeURIComponent(phone) + "%0A" +
          "Concern: " + encodeURIComponent(concern) + "%0A" +
          "City: " + encodeURIComponent(city) +
          (msg ? "%0ADetails: " + encodeURIComponent(msg) : "");
        window.open("https://wa.me/918814853189?text=" + waText, "_blank");
        setStatus(t("Opening WhatsApp to send your request…", "आपका अनुरोध भेजने के लिए व्हाट्सएप खुल रहा है…"), "ok");
        return;
      }

      var data = new FormData(form);
      setBusy(true);
      setStatus(t("Sending…", "भेजा जा रहा है…"), "");

      fetch("https://api.web3forms.com/submit", { method: "POST", body: data })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json.success) {
            form.reset();
            setStatus(t("✓ Thank you! We've received your details and will call you back soon.",
                        "✓ धन्यवाद! हमें आपकी जानकारी मिल गई है, हम जल्द ही आपको कॉल करेंगे।"), "ok");
          } else {
            setStatus(t("Something went wrong. Please call or WhatsApp us directly.",
                        "कुछ गड़बड़ हुई। कृपया सीधे कॉल या व्हाट्सएप करें।"), "err");
          }
        })
        .catch(function () {
          setStatus(t("Network error. Please call or WhatsApp us directly.",
                      "नेटवर्क समस्या। कृपया सीधे कॉल या व्हाट्सएप करें।"), "err");
        })
        .finally(function () { setBusy(false); });
    });
  }

  function setStatus(text, cls) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.className = "form-status" + (cls ? " " + cls : "");
  }
  function setBusy(b) {
    if (!submitBtn) return;
    submitBtn.disabled = b;
    submitBtn.style.opacity = b ? "0.7" : "";
  }
})();
