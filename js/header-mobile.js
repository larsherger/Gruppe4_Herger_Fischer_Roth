const hamburger = document.querySelector(".hamburger")
const navMobileHidden = document.querySelector(".nav-mobile-hidden")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMobileHidden.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMobileHidden.classList.remove("active");
}))