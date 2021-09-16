// style navBarsMoblie
const bntNavbars = document.querySelector('.bnt__navmobile');
const navBarsMoblie = document.querySelector('.navbar_top-mobile');
const navOverlay = document.querySelector('.navbars_overlay');
const bntNavClose = document.querySelector('.bnt-close-navbar');


bntNavbars.onclick = function() {
    navOverlay.style.display = 'block';
    navBarsMoblie.classList.add('active');
}

function cotrolNavClose() {
    navOverlay.style.display = 'none';
    navBarsMoblie.classList.remove('active');
}
navOverlay.onclick = cotrolNavClose;
bntNavClose.onclick = cotrolNavClose;


// style list-category home page
const bntMoreListCategorys = document.querySelectorAll('.box-product-show .title-product-show .bnt-more');

bntMoreListCategorys.forEach(bntMoreListCategory => {
    var i = 0;
    bntMoreListCategory.onclick = function() {
        if (i++ % 2 == 0) {
            this.parentNode.children[1].classList.add('active');
        } else {
            this.parentNode.children[1].classList.remove('active');
        }
    };
});
// bntMoreListCategorys[0].previousElementSibling.style.display = "none"
// carousel  box-product-hot
$(".box-product-hot .owl-carousel").owlCarousel({
    loop: false,
    margin: 20,
    nav: true,
    responsive: {
        0: {
            items: 1,
        },
        500: {
            items: 2,
        },
        800: {
            items: 3,
        },
        1000: {
            items: 3,
        },
        1200: {
            items: 4,
        },
        1300: {
            items: 5,
        },
    },
});

// carousel  product-show-main
$(".product-show-main .owl-carousel").owlCarousel({
    loop: false,
    margin: 20,
    nav: true,
    responsive: {
        0: {
            items: 2,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 3,
        },
        1200: {
            items: 3,
        },
        1300: {
            items: 4,
        },
    },
});
// carousel  all
$(".owl-carousel").owlCarousel({
    loop: false,
    margin: 0,
    nav: true,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 5,
        },
    },
});