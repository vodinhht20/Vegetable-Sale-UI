var qSelect = document.querySelector.bind(document);
async function main() {
    await axios.get('https://x4vxf.sse.codesandbox.io/products')
        .then((response) => response.data)
        .then(data => {
            var result = data.map(post => {
                return showProducts(post.image,post.price,post.discount,post.name,post.slug);
            }).join("");
            qSelect('#product-hot').innerHTML = result;
            qSelect('.cartegory-slide-show-home .owl-carousel').innerHTML = showCategory();
        });
    await axios.get('https://x4vxf.sse.codesandbox.io/products?category=2')
            .then((response) => response.data)
            .then(data => {
                var result = data.map(post => {
                    return showProducts(post.image,post.price,post.discount,post.name,post.slug);
                }).join("");
                qSelect('#product-fruits').innerHTML = result;
            });
    await axios.get('https://x4vxf.sse.codesandbox.io/products?category=1')
            .then((response) => response.data)
            .then(data => {
                var result = data.map(post => {
                    return showProducts(post.image,post.price,post.discount,post.name,post.slug);
                }).join("");
                qSelect('#product-vegetable').innerHTML = result;
            });
    await axios.get('https://x4vxf.sse.codesandbox.io/products?category=3')
            .then((response) => response.data)
            .then(data => {
                var result = data.map(post => {
                    return showProducts(post.image,post.price,post.discount,post.name,post.slug);
                }).join("");
                qSelect('#product-liveFood').innerHTML = result;
            });
    await setTimeout(e => {
            carouselControlAll();
        },100);

        
}
    
main();
//     điều khiển carousel 
async function carouselControlAll() {
    // carousel  box-product-hot
    await $("#product-hot").owlCarousel({
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
    await $(".product-show-main .owl-carousel").owlCarousel({
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
    await $(".owl-carousel").owlCarousel({
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
}
//  hiện thị loại sản phẩm
function showCategory() {
    return `
    <div class="category-item">
        <a href="">
            <img src="./public/image/cate_1.jpg" alt="">
            <h3>Trứng và bơ</h3>
        </a>
    </div>
    <div class="category-item">
        <a href="">
            <img src="./public/image/cate_2.jpg" alt="">
            <h3>Thực phẩm khô</h3>
        </a>
    </div>
    <div class="category-item">
        <a href="">
            <img src="./public/image/cate_3.jpg" alt="">
            <h3>Thịt tươi sống</h3>
        </a>
    </div>
    <div class="category-item">
        <a href="">
            <img src="./public/image/cate_4.jpg" alt="">
            <h3>Trái cây</h3>
        </a>
    </div>
    <div class="category-item">
        <a href="">
            <img src="./public/image/cate_5.jpg" alt="">
            <h3>Rau củ quả</h3>
        </a>
    </div>
    <div class="category-item">
        <a href="">
            <img src="./public/image/cate_6.jpg" alt="">
            <h3>Nước ép</h3>
        </a>
    </div>
    `;
}
// hiển thị  sản phẩm
function showProducts(image,price,discount,name,slug) {
    return `
        <div class="product-item">
            <div class="product-image">
                <a href="./product-detail.html?slug=${slug}">
                    <img src="${image}" alt="${slug}">
                </a>
                <div class="icon-on-image-product">
                    <i class="ti-heart" title="Thêm vào yêu thích"></i>
                    <a href=""><i class="ti-shopping-cart-full" title="Thêm vào giỏ hàng"></i></a>
                </div>
            </div>
            <div class="product-information">
                <a href="./product-detail.html?slug=${slug}">
                    <p>${name}</p>
                    <div class="box-price">
                        <span class="price-primary">${formatCash(`${(price*discount)/100}`)} đ</span>
                        <span class="price-sub">${formatCash(`${price}`)} đ</span>
                    </div>
                </a>
            </div>
            <span class="product-sale">- ${discount}%</span>
        </div>`;
}
// format giá tiền
function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}