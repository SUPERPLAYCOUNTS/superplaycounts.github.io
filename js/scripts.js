function locate_assign() {
document.location.assign("https://superplaycounts.github.io/");
}
let header__burger = document.querySelector('.header__burger');
let header__menu = document.querySelector('.header__menu');

header__burger.addEventListener('click', function(){
	header__burger.classList.toggle('active');
	header__menu.classList.toggle('active');
})
