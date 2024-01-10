let header__burger = document.querySelector('.header__burger');
let header__menu = document.querySelector('.header__menu');
// const countElement = document.getElementById('count_online');

// const socket = new WebSocket('wss://testnodejs.superplaycounts.repl.co/');

// socket.addEventListener('message', function(event) {
//   const count_online = event.data;
//   countElement.innerText = count_online;
// });

// window.addEventListener('beforeunload', function() {
//   socket.close();
// });

// setInterval(function() {
//   socket.send('getCount');
// }, 5000);


header__burger.addEventListener('click', function(){
	header__burger.classList.toggle('active');
	header__menu.classList.toggle('active');
});

// Year
const updateYear = () => {
	const d = document.querySelector(".year");
	if (d) {
		d.innerHTML = new Date().getFullYear();
	}
}

setInterval(updateYear, 16);

function setTheme(theme) {
    var moonIcon = document.getElementById("moon-icon");
    var sunIcon = document.getElementById("sun-icon");
    var link = document.getElementById("theme-stylesheet");
    
    if (theme === "dark") {
        moonIcon.style.display = "none";
        sunIcon.style.display = "block";
        link.href = "/css/dark.css";
        localStorage.setItem('theme', 'dark');
    } else {
        moonIcon.style.display = "block";
        sunIcon.style.display = "none";
        link.href = "/css/light.css";
        localStorage.setItem('theme', 'light');
    }
}
  
let theme = localStorage.getItem('theme');
if (theme === 'dark') {
setTheme('dark');
} else {
setTheme('light');
}
