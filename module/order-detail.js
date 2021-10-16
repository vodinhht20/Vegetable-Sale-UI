
async function main() {
    var mainOrder = document.querySelector('.box-content .order__content-list');
    var url = window.location.search;
    const urlParams = new URLSearchParams(url);
    var id = urlParams.get('idDH');
    await axios.get('http://localhost:3000/order/'+id)
        .then((response) => response.data)
        .then(data => {
                        var totalPrice = 0;
                        var productsList = data.order_details.map(product => {
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
                            mainOrder.innerHTML = showData(productsList, data.id, data.createdAt, totalPrice, data.fullname, data.email, data.phone, data.address, data.note);;
        });
}
main();

function showData(productsList,id,createdAt,totalPrice,recName, recEmail, recPhone, recAddress, recNote) {
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
        <div class="list-item-function ml-5 " id="order-detail-sub">
            <div class="form__group-function">
                <p>Người nhân: <b>${recName}</b></p>
                <p>Email: <b>${recEmail}</b></p>
                <p>Số Điện Thoại: <b>${recPhone}</b></p>
                <p>Địa chỉ: <b>${recAddress}</b></p>
                <p>Ghi chú: <b>${recNote}</b></p>
                <h4>Tổng Tiền: <b>${formatCash(`${totalPrice}`)} đ</b></h4>
            </div>
        </div>
        <!-- end list-item-function -->
    </div>
    <!-- end list-item -->`;
}

// Format giá tiền JS
function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}