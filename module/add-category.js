const formAdd = document.querySelector('#form-add');
        formAdd.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataPost = {
                name: document.querySelector('#nameCategory').value,
                disabled: false,
                createdAt: Date.parse(new Date),
            }
            console.log(dataPost);
            axios.post('https://x4vxf.sse.codesandbox.io/categories', dataPost)
                .then(response => console.log(response))
                .then(() => alert("Bạn đã thêm thành công"))
                .then(window.location = "./list-category.html");


                
        })