function showNumberCart() {
    document.querySelector('.favorite-cart-account .cart sup').innerText = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).length : '0';
    var account = document.querySelector('.drop-account ul');
    var user = localStorage.getItem('user');
    if (user) {
        account.innerHTML = `<li><a href="./admin/index.html">Quản trị</a></li>
                            <li><a href="./login.html">Đăng xuất</a></li>`
    }
}
showNumberCart();