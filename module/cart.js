async function main() {
    var mainCart = document.querySelector('#main-cart');
    var arrCart = JSON.parse(localStorage.getItem("cart"));
    var totalPriceAll = 0;
    var result = arrCart.map(post => {
        var price = (post.price)-(post.price*post.discount/100);
        var totalPriceItem = price*post.quantity;
        totalPriceAll+=totalPriceItem;
        return `
            <tr>
                <td>${post.name}</td>
                <td class="product-img-item"><img src="${post.image}" alt=""></td>
                <td>${formatCash(`${price}`)} đ</td>
                <td class="inp-change-qty"><input type="number" max="99" min="1" value="${post.quantity}"></td>
                <td>${formatCash(`${totalPriceItem}`)} đ</td>
                <td class="bnt-delete-product"><button value="${post.id}" title="Xóa sản phẩm này"><i class="fas fa-trash-alt"></i></button></td>
            </tr>`
    }).join("");
    
    if (result) {
        result += `
                    <tr class="table-danger">
                        <th colspan="4">Tổng tiền: </th>
                        <th colspan="2">${formatCash(`${totalPriceAll}`)} đ </th>
                    </tr>`;
        mainCart.innerHTML = result;
        remoteCartItem();
        changeQty();
    } else {
        mainCart.innerHTML = `<tr><td colspan="6" class="text-center text-danger"><b>Giỏ hàng trống!</b></td></tr>`;
    }
    

}
main();

function remoteCartItem() {
    var bntRemotes = document.querySelectorAll('.bnt-delete-product button');
    bntRemotes.forEach((element,index) => {
        element.addEventListener('click', e => {
            var dataCart = JSON.parse(localStorage.getItem("cart"));
            var dataCartNew = dataCart.filter((product) => product.id !== element.value);
            localStorage.setItem("cart", JSON.stringify(dataCartNew));
            main();
        })
    })
}


// Format giá tiền JS
function formatCash(str) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
   }

function changeQty() {
    var inpQty = document.querySelectorAll('.inp-change-qty input');
    var idProduct = document.querySelectorAll('.bnt-delete-product button');
    inpQty.forEach((element,index) => {
        element.addEventListener('change', e => {
            if(element.value < 100&&element.value > 0) {
                var dataCart = JSON.parse(localStorage.getItem("cart"));
                var dataCartNew = dataCart.map(post => {
                    if (post.id === idProduct[index].value) {
                        post.quantity = parseInt(element.value);
                    }
                    return post;
                });
                localStorage.setItem("cart", JSON.stringify(dataCartNew));
                main();
            } else {
                toast('toast__error','fas fa-exclamation-circle','Cảnh báo','Đã đạt tới giới hạn mua. Chỉ được mua số lượng cho mỗi sản phẩm từ 1 -> 100');
            }
        })
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