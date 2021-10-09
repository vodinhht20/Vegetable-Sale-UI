const qSelect = document.querySelector.bind(document);
const qSelectAll = document.querySelectorAll.bind(document);

var url = window.location.search;
const urlParams = new URLSearchParams(url);
var slug = urlParams.get('slug');
axios.get('http://localhost:3000/products?slug='+slug)
    .then(response => response.data)
    .then(data =>  {
                var result = data.map(post => {
                    return `<div class="container">
                                <h2>Thông tin sản phẩm</h2>
                            </div>
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <img src="${post.image}" alt="">
                                    </div>
                                    <div class="col-lg-6">
                                        <h3 class="title-product">${post.name}</h3>
                                        <div class="description">
                                            <p><span class="price">${formatCash(`${(post.price*post.discount)/100}`)} đ</span><span class="price-root">${formatCash(`${post.price}`)} đ</span> </p>
                                            <p>Cây ổi nhỏ hơn cây vải, nhãn, cao nhiều nhất 10m, đường kính thân tối đa 30 cm. Những giống mới còn nhỏ và lùn hơn nữa </p>
                                            <div class="input-order">
                                                <form action="">
                                                    <div class="mass">
                                                        <h4>Trọng lượng: </h4>
                                                        <div class="select-mass">
                                                            <div class="active"> 1Kg </div>
                                                            <div> 2Kg </div>
                                                            <div> 3Kg </div>
                                                            <div> 4Kg </div>
                                                        </div>
                                                    </div>
                                                    <div class="quantity mt-3">
                                                        <h4 for="">Số Lượng: </h4>
                                                        <div class="input">
                                                            <button class="bnt-plus" type="button"><i class="ti-plus"></i></button>
                                                            <input type="text" value="1" min="1" max="99">
                                                            <button class="bnt-minus" type="button"><i class="ti-minus"></i></button>
                                                        </div>
                                                        <div class="mt-1 text-danger error"></div>
                                                        <div class="bnt-order mt-3">
                                                            <button class="bnt-buy-now">Mua Ngay</button>
                                                            <button  class="bnt-add-cart">Thêm Vào Giỏ Hàng</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container">
                                <h4>Thông tin chi tiết</h4>
                                <p>${post.description}</p>
                            </div>`;
                        }).join("");
        qSelect('.product-detail-page').innerHTML = result;
        runDiplay();
    });


function runDiplay () {
qSelectAll('.select-mass div').forEach(element => {
    element.addEventListener('click', function(e) {
        qSelectAll('.select-mass div').forEach(element => {
            element.classList.remove('active');
        });
        element.classList.add('active');
    })
});
qSelectAll('.quantity .input button').forEach((element,index) => {
    element.addEventListener('click', function(e) {
        var inpValue = qSelect('.quantity .input input').value;
        var error = qSelect('.quantity .error');
        if (index==0) {
            if (inpValue < 99) {
                error.innerHTML = "";
                qSelect('.quantity .input input').value = ++inpValue;
            } else {
                error.innerHTML = "* Đã đạt số lượng tối đa.";
            }
        } else {
            if (inpValue > 1) {
                error.innerHTML = "";
                qSelect('.quantity .input input').value = --inpValue;
            } else {
                error.innerHTML = "* Tối thiểu phải lớn hơn 0.";
            }
        }
     });
});
}

// format giá tiền
function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}