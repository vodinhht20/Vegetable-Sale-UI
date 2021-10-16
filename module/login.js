
const formLogin = document.querySelector('#login');
formLogin.addEventListener('submit', function (e) {
    e.preventDefault();
        const user = {
            email: document.querySelector('#accEmail').value,
            password: document.querySelector('#accPassword').value
        };
        axios.post('https://x4vxf.sse.codesandbox.io/login', user)
            .then(respose => {
                localStorage.setItem('user', JSON.stringify(respose.data));
                alert('Đăng nhập thành công');
            })
            .then(() => window.location = "./index.html")

            .catch(reject => {
                alert("Đăng nhập thất bại !!!");
            })

})




const txtInput = document.querySelectorAll('.form-group input');
        txtInput.forEach(function(item, index) {
            item.oninput = function() {
                if (item.value.trim() == '') {
                    item.style.border = '1px solid red';
                    if (item.parentNode.children[2]) {
                        item.parentNode.removeChild(item.parentNode.children[2]);
                    }
                    item.insertAdjacentHTML('afterend', '<span class="error-messenger">Không được để trống ở đây !</span>');
                } else {
                    item.style.border = '1px solid #ced4da';
                    item.parentNode.removeChild(item.parentNode.children[2]);
                }
            }
        })

        