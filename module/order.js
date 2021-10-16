async function main() {
    const qSelect = document.querySelector.bind(document);
    var totalPrice = 0;

    var arrCart = JSON.parse(localStorage.getItem("cart"));

    var result = arrCart.map(post => {
        var pricePrimary = post.price-(post.price*post.discount/100);
        totalPrice+=pricePrimary;
        return data(post.name,post.slug,pricePrimary,post.quantity,post.image);
    }).join("");
    qSelect('.order-page .show-order').innerHTML = await result
    var payOrder = await qSelect('.order-page .pay-order')
    payOrder.innerHTML = payOrderFnc(totalPrice);
    await qSelect('#bnt_order').addEventListener('click', e => {
        if (validated()) {
            var dataPost = {
                id: 'DH'+Math.random().toString(9).substr(2, 9),
                fullname: qSelect('#fullName').value,
                email: qSelect('#valEmail').value,
                phone: qSelect('#phoneNumber').value,
                address: qSelect('#address').value,
                note: qSelect('#note_order').value,
                status: 0,
                createdAt: Date.parse(new Date),
                order_details: arrCart,
            }
            axios.post('http://localhost:3000/order',dataPost)
                .then(() => {
                    localStorage.removeItem('cart');
                    alert('Bạn đã đặt hàng thành công');
                });
        } else {
            toast('toast__error','fas fa-exclamation-circle','Thiếu thông tin','Bạn vui lòng nhập đủ thông tin người nhận trước khi đặt hàng !!!');
            
        }
        
    })
}
main();

function data(name,slug,pricePrimary,quantity,image) {
    return `
            <div class="product-item d-flex align-content-center justify-content-between">
                <div class="image-product">
                    <img src="${image}" alt="">
                    <span>${quantity}</span>
                </div>
                <div class="detail">
                    <a href="./product-detail.html?slug=${slug}">${name}</a>
                    <span>Số lượng: <b>${quantity}</b></span>
                </div>
                <div class="price-product">
                    <span>${formatCash(`${pricePrimary}`)} đ</span>
                </div>
            </div>`;
}
function payOrderFnc(provisional) {
    var total = provisional+30000;
    return `
        <div class="d-flex align-content-center justify-content-between">
            <label for="">Tạm tính: </label>
            <span>${formatCash(`${provisional}`)} đ</span>
        </div>
        <div class="d-flex align-content-center justify-content-between">
            <label>Phí vận chuyển: </label>
            <span>30.000 đ</span>
        </div>
        <div class="d-flex align-content-center justify-content-between">
            <h5>Tổng Tiền: </h5>
            <b>${formatCash(`${total}`)} đ</b>
        </div>`;
}
// Format giá tiền JS
function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })

}
function validated() {
    var boolean = true;
    const inpValue = document.querySelectorAll('.form-control');
    inpValue.forEach(element => {
        if (element.value.trim() == "") {
            boolean = false;
        }
    });
    return boolean;
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
