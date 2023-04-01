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

setInterval(updateYear, 2);