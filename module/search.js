var listData = document.querySelector('.product-show-main');
var resultSearch = document.querySelector('.result-search');
var count = 0;
var url = window.location.search;
        const urlParams = new URLSearchParams(url);
        var key = urlParams.get('key');
        if (key) {
            axios.get('http://localhost:3000/products?q='+ key)
            .then(response => {
                const result = response.data.map((post,index) => {
                    count = ++index;
                    return `<div class="product-item col-lg-3 col-md-4 col-sm-6 col-sx-12"">
                                <div class="product-image">
                                    <a href="./product-detail.html?slug=${post.slug}">
                                        <img src="${post.image}" alt="${post.image}">
                                    </a>
                                    <div class="icon-on-image-product">
                                        <i class="ti-heart" title="Thêm vào yêu thích"></i>
                                        <a href=""><i class="ti-shopping-cart-full" title="Thêm vào giỏ hàng"></i></a>
                                    </div>
                                </div>
                                <div class="product-information">
                                    <a href="./product-detail.html?slug=${post.slug}">
                                        <p>${post.name}</p>
                                        <div class="box-price">
                                            <span class="price-primary">${post.price} đ</span>
                                        </div>
                                    </a>
                                </div>
                                <span class="product-sale">- ${post.discount}%</span>
                            </div>`;
                    }).join("");
                    if (count < 1) {
                        resultSearch.innerHTML = `Không tìm thấy kết quả với từ khóa "<b>${key}</b>": `;
                    } else {
                        resultSearch.innerHTML = `Tìm thấy <b>${count}</b> kết quả với từ khóa "<b>${key}</b>": `;
                        listData.innerHTML = result;
                }
            });

        } else {

        }