const $ = document.querySelector.bind(document);
const formSignin = document.querySelector('#form-signin');
    formSignin.addEventListener('submit', function (e) {
        e.preventDefault();
        const user = {
            email: $('#email').value,
            password: $('#password').value,
            firtname: $('#firstName').value,
            lastname: $('#lastName').value,
            phone: $('#phoneNumber').value
        };
        axios.post('http://localhost:3000/signup/', user)
            .then(respose => {
                console.log(respose.data);
                localStorage.setItem('user', JSON.stringify(respose.data));
                $('.notify').innerHTML = '<p class="text-success>Đăng ký thành công vui lòng đăng nhập</p>';
                alert('Đăng ký thành công vui lòng đăng nhập');
            })
            .then(() => window.location = "./login.html")

            .catch(reject => {
                alert("Đăng ký thất bại !!!");
            })
    })

var valInp = document.querySelectorAll('.form-group input');
valInp.forEach(function(item, index) {
    item.oninput = function() {
        if (item.value.trim() == '') {
            item.style.border = '1px solid red';
            if (item.parentNode.children[2]) {
                item.parentNode.removeChild(item.parentNode.children[2]);
            }
            item.insertAdjacentHTML('afterend', '<span class="error-messenger">Không được để trống ở đây !</span>');
        } else {
            item.style.border = '1px solid #9cdab8';
            item.parentNode.removeChild(item.parentNode.children[2]);
        }
    }
})