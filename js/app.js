// smooth scroll animation

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener('click', function (e) {

 e.preventDefault();

 document.querySelector(this.getAttribute('href')).scrollIntoView({
 behavior: 'smooth'
 });

});

});

// navbar shadow on scroll

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

if(window.scrollY > 50){
navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
}else{
navbar.style.boxShadow = 'none';
}

});
