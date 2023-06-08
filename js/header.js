/*https://www.youtube.com/watch?v=nGdwRP9ZsA4*/

var marker = document.querySelector('#marker')
var item = document.querySelectorAll('nav a')

function indicator(navbarElement) {
  marker.style.left = navbarElement.offsetLeft + "px";
  marker.style.width = navbarElement.offsetWidth + "px";
}



item.forEach(link => {
  link.addEventListener('mouseover', (navbarElement) => {
    indicator(navbarElement.target);
    console.log(navbarElement.target)
  })
})

const activeNavigationItem = document.getElementById("active-nav-item");
indicator(activeNavigationItem);