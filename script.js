// ===== FADE-IN / SNAP SCROLL =====
document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          pages.forEach((p) => p.classList.remove("active"));
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );
  pages.forEach((p) => observer.observe(p));
});

// ===== GAME OVERLAY LOGIC =====
const overlay = document.getElementById("gameOverlay");
const frame = document.getElementById("gameFrame");
const closeBtn = document.getElementById("closeGame");

document.querySelectorAll(".play-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const url = btn.dataset.url;
    if (!url) return;
    if (url.startsWith("http")) return window.open(url, "_blank");
    frame.src = url;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeOverlay() {
  overlay.classList.remove("active");
  frame.src = "about:blank";
  document.body.style.overflow = "auto";
}
closeBtn.addEventListener("click", closeOverlay);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeOverlay();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("active")) closeOverlay();
});
