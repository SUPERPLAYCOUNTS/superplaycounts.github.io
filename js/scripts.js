let header__burger = document.querySelector('.header__burger');
let header__menu = document.querySelector('.header__menu');


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

setInterval(updateYear, 15);

function setTheme(theme) {
    var moonIcon = document.getElementById("moon-icon");
    var sunIcon = document.getElementById("sun-icon");
    var link = document.getElementById("theme-stylesheet");
    var chartBackgroundColor = theme === 'dark' ? '#161616' : '#fff';
    
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

    Highcharts.chart('container', {
		chart: {
		  type: 'line',
		  backgroundColor: chartBackgroundColor
		},
		title: {
		  text: ''
		},
		xAxis: {
		  type: 'datetime'
		},
		yAxis: {
		  title: {
			text: ''
		  },
		  type: 'linear'
		},
		credits: {
		  text: 'superplaycounts.github.io',
		  href: 'https://superplaycounts.github.io/',
		},
		series: [{
		  name: 'Subscribers',
		  data: apiData,
		  color: 'red'
		}]
	  }, function (ch) {
		chart = ch;
	  });
}
  
  let theme = localStorage.getItem('theme');
  if (theme === 'dark') {
	setTheme('dark');
  } else {
	setTheme('light');
  }
