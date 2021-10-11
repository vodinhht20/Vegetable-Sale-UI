const qSelect = document.querySelector.bind(document);
const qSelectAll = document.querySelectorAll.bind(document);

var url = window.location.search;
const urlParams = new URLSearchParams(url);
var slug = urlParams.get('slug');
async function main() {
    await axios.get('http://localhost:3000/products?slug='+slug)
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
                                                    <form action="" onsubmit="return false">
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
                                                                <input type="text" id="qty" value="1" min="1" max="99">
                                                                <button class="bnt-minus" type="button"><i class="ti-minus"></i></button>
                                                            </div>
                                                            <div class="mt-1 text-danger error"></div>
                                                            <div class="bnt-order mt-3">
                                                                <button class="bnt-buy-now" value="${post.id}">Mua Ngay</button>
                                                                <button  class="bnt-add-cart"  value="${post.id}">Thêm Vào Giỏ Hàng</button>
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
            qSelect('.conten-product-detail').innerHTML = result;
            runDiplay();
        });
    await qSelect('.bnt-add-cart').addEventListener('click', function(e) {
        var id = this.value;
        var qty = qSelect('#qty').value;
        axios.get('http://localhost:3000/products/'+id)
            .then(response => {
                const newProduct = {
                    ...response.data,
                    quantity: parseInt(qty)
                }
                let cartItems = getCartItem();
                const existProduct = cartItems.find((product) => {
                    return product.id === newProduct.id;
                });

                if (existProduct) { 
                    if (existProduct.quantity+parseInt(qty) < 100) {// kiểm tra xem sô lượng đã mua và số lượng vừa nhập tổng lại phải nhỏ hơn 100
                        existProduct.quantity +=parseInt(qty); // nếu đã có thì cộng thêm 1
                        toast('toast__success','fas fa-check-circle','Thêm thành công','Sản phẩm đã được thêm vào giỏ hàng của bạn');
                    } else {
                        toast('toast__error','fas fa-exclamation-circle','Thêm thất bại','Bạn không thể thêm sản phẩm này vì sản phẩm đã vượt quá số lượng cho phép');
                    }

                } else {
                    cartItems = [...cartItems,newProduct]; // nếu chưa có thì add sản phẩm đó vào mảng cart
                    toast('toast__success','fas fa-check-circle','Thêm thành công','Sản phẩm đã được thêm vào giỏ hàng của bạn');
                }
                qSelect('.favorite-cart-account .cart sup').innerText = cartItems.length; // hiện thị số sản phẩm trên header
                setCartItems(cartItems);
            })
    })
    await qSelect('.bnt-buy-now').addEventListener('click',function(e) {
        var id = this.value;
        var qty = qSelect('#qty').value;
        axios.get('http://localhost:3000/products/'+id)
            .then(response => {
                const newProduct = {
                    ...response.data,
                    quantity: parseInt(qty)
                }
                let cartItems = getCartItem();
                const existProduct = cartItems.find((product) => {
                    return product.id === newProduct.id;
                });

                if (existProduct) { 
                    if (existProduct.quantity+parseInt(qty) < 100) {// kiểm tra xem sô lượng đã mua và số lượng vừa nhập tổng lại phải nhỏ hơn 100
                        existProduct.quantity +=parseInt(qty); // nếu đã có thì cộng thêm 1
                        window.location = './cart.html';
                    } else {
                        toast('toast__error','fas fa-exclamation-circle','Thêm thất bại','Bạn không thể thêm sản phẩm này vì sản phẩm đã vượt quá số lượng cho phép');
                    }

                } else {
                    if (parseInt(qty) < 100) {
                        cartItems = [...cartItems,newProduct]; // nếu chưa có thì add sản phẩm đó vào mảng cart
                        window.location = './cart.html';
                    } else {
                        toast('toast__error','fas fa-exclamation-circle','Thêm thất bại','Bạn không thể thêm sản phẩm này vì sản phẩm đã vượt quá số lượng cho phép');
                    }
                }
                setCartItems(cartItems);
            })
    })
}
main();

function getCartItem() {
    const cartItems = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []; // kiểm tra xem đã có mảng cart chưa nếu có thì trả về chính nó, ngược lại trả về mảng rỗng
        return cartItems;
}
function setCartItems(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function runDiplay () {
    qSelectAll('.select-mass div').forEach(element => {  // hiện thị trọng lượng khi active vào nó
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


function toast(status,iconMain,title,content) {
    const mainToast = document.querySelector('#toasts');
    if(mainToast) {
        const toast = document.createElement('div');
        toast.classList.add('toast', status);
        toast.innerHTML = ` <div class="toast__icon">
                                <i class="${iconMain}"></i>
                            </div>
                            <div class="toast__body">
                                <h3 class="toast__body__title">${title}</h3>
                                <p class="toast__body__msg">${content}</p>
                            </div>
                            <div class="toas__close">
                                <i class="ti-close"></i>
                            </div>`;
        mainToast.appendChild(toast)
        setTimeout(e => {
            mainToast.removeChild(toast);
        }, 5000)
    }
}
