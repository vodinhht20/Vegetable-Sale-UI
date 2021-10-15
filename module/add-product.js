const formAdd = document.querySelector('#form-add');
const listCategory = document.querySelector('#categoryProduct');
        async function main() {
            await axios.get('http://localhost:3000/categories')
                .then((response) => response.data)
                .then(data => {
                    var result = data.map((post) => {
                            if (!post.disabled) {
                                return `<option value='${post.id}'>${post.name}</option>`
                            }
                        }).join("");
                    listCategory.innerHTML = `<option value=''>-- Chọn loại SP --</option>`+result;
                })
                
            await formAdd.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const dataPost = {
                        id: Math.random().toString(5).substr(2),
                        name: document.querySelector('#nameProduct').value,
                        slug: slug(document.querySelector('#nameProduct').value),
                        price: parseInt(document.querySelector('#priceProduct').value),
                        discount: parseInt(document.querySelector('#saleProduct').value),
                        category: parseInt(document.querySelector('#categoryProduct').value),
                        image: document.querySelector('#nameImage').value,
                        description: document.querySelector('#informationProduct').value,
                        createdAt: Date.parse(new Date),
                    }
                    console.log(dataPost);
                    axios.post('http://localhost:3000/products', dataPost)
                        .then(response => console.log(response))
                        .then(() => alert("Bạn đã thêm thành công"))
        
                        
                });
            
        }
        main();


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

