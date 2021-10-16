
async function main() {
    var mainOrder = document.querySelector('.box-content .order__content-list');
    await axios.get('https://x4vxf.sse.codesandbox.io/order')
        .then((response) => response.data)
        .then(data => {
                var listOrder = data.map(order => {
                    if (order.status !== 1) {
                            var totalPrice = 0;
                            var productsList = order.order_details.map(product => {
                                var pricePrimary = product.price-(product.price*product.discount/100);
                                totalPrice+= pricePrimary*product.quantity;
                                return `<div class="list-main-product-item">
                                                        <div class="list-main-product-img">
                                                            <img src="${product.image}" alt="">
                                                        </div>
                                                        <div class="list-main-product-name">
                                                            <a href="../product-detail.html?slug=${product.slug}">${product.name}</a>
                                                            <span class="price">Đơn Giá: <b>${formatCash(`${pricePrimary}`)} đ</b></span>
                                                        </div>
                                                        <div class="list-main-product-qty">
                                                            <span class="qty">Số Lượng: <b>${product.quantity}</b></span>
                                                        </div>
                                                    </div>`;
                            }).join("");
                                return showData(productsList,order.id,order.createdAt,totalPrice);
                    }
                }).join("");
                if (listOrder.trim() == "") {
                    mainOrder.innerHTML = `<div class="order-empty"><img src="http://www.popofood.tk/images/empty-cart.png"><p>Không có đơn hàng nào !!!</p></div>`;
                } else {
                    mainOrder.innerHTML = listOrder;
                }
        });
    await remoteOrder();
    await finishOrder();
}
main();

function showData(productsList,id,createdAt,totalPrice) {
    return `
    <div class="list-item">
        <div class="list-item-title">
            <span>Mã Đơn Hàng: <b>${id}</b></span>
            <span>Ngày Đặt: ${Date(createdAt)}</span>
        </div>
        <!-- end list-item-title -->
        <div class="list-item-main">
            ${productsList}
        </div>
        <!-- end list-item-main -->
        <div class="list-item-function">
            <form action="" onsubmit="return false">
                <div class="form__group-function">
                    <h4>Tổng Tiền: <b>${formatCash(`${totalPrice}`)} đ</b></h4>
                </div>
                <div class="form__group-function">
                    <button name="bntCancelOrder" data-toggle="modal" data-target="#exampleModal" value="${id}" class="bnt_cancel">Hủy Đơn
                        Hàng</button>
                </div>
                <div class="form__group-function">
                    <button name="bntUpdateStatus" value="${id}" class="bnt__update">Thành Công</button>
                </div>
                <a href="./order_detail.html?idDH=${id}" id="linkOrderDetai"><i
                        class="fas fa-angle-double-right"></i> Xem Chi Tiết</a>
            </form>
        </div>
        <!-- end list-item-function -->
    </div>
    <!-- end list-item -->`;
}

function remoteOrder() {
        var bntCancelOrder = document.querySelectorAll('.bnt_cancel');
        var bntConfirm = document.querySelector('#bnt-confirm-delete')
        bntCancelOrder.forEach(element => {
            element.addEventListener('click', e => {
                bntConfirm.value = element.value;
            });
        });
        bntConfirm.addEventListener('click', e => {
            axios.delete('https://x4vxf.sse.codesandbox.io/order/' + bntConfirm.value)
        });
}


function finishOrder() {
    var bntCancelOrder = document.querySelectorAll('.bnt__update');
    bntCancelOrder.forEach(element => {
        element.addEventListener('click', e => {
            axios.patch('https://x4vxf.sse.codesandbox.io/order/' + element.value,{status: 1})
        })
    });
}


// Format giá tiền JS
function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}