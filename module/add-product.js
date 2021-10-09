const formAdd = document.querySelector('#form-add');
        formAdd.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataPost = {
                id: Math.random().toString(5).substr(2),
                name: document.querySelector('#nameProduct').value,
                slug: slug(document.querySelector('#nameProduct').value),
                price: parseInt(document.querySelector('#priceProduct').value),
                discount: parseInt(document.querySelector('#saleProduct').value),
                category: document.querySelector('#categoryProduct').value,
                image: document.querySelector('#nameImage').value,
                description: document.querySelector('#informationProduct').value,
                createdAt: Date.parse(new Date),
            }
            console.log(dataPost);
            axios.post('http://localhost:3000/products', dataPost)
                .then(response => console.log(response))
                .then(() => alert("Bạn đã thêm thành công"))

                
        })
        function slug(name) {
            var baseSlug = name.split(" ").join("-");
            return  baseSlug.normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
                        .toLowerCase();
          }
var showImage  =  document.querySelector('#showImager');
var valInpImg  =  document.querySelector('#nameImage');

valInpImg.addEventListener('input', function(e) {
    showImage.src = this.value;
    showImage.style.display="block";
})
