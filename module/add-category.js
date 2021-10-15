const formAdd = document.querySelector('#form-add');
        formAdd.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataPost = {
                name: document.querySelector('#nameCategory').value,
                disabled: false,
                createdAt: Date.parse(new Date),
            }
            console.log(dataPost);
            axios.post('http://localhost:3000/categories', dataPost)
                .then(response => console.log(response))
                .then(() => alert("Bạn đã thêm thành công"))

                
        })