        var url = window.location.search;
        const urlParams = new URLSearchParams(url);
        var id = urlParams.get('id');
        axios.get('http://localhost:3000/products/'+id)
            .then(response => response.data)
            .then(data => {
                {
                    document.querySelector('#nameProduct').value = data.name;
                    document.querySelector('#priceProduct').value = data.price;
                    document.querySelector('#saleProduct').value = data.discount;
                    document.querySelector('#categoryProduct').value = data.category;
                    document.querySelector('#nameImage').value = data.image;
                    document.querySelector('#informationProduct').value = data.description;
                }
            })

            const formAdd = document.querySelector('#form-update');
            formAdd.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataPost = {
                name: document.querySelector('#nameProduct').value,
                slug: slug(document.querySelector('#nameProduct').value),
                price: parseInt(document.querySelector('#priceProduct').value),
                discount: parseInt(document.querySelector('#saleProduct').value),
                category: document.querySelector('#categoryProduct').value,
                image: document.querySelector('#nameImage').value,
                description: document.querySelector('#informationProduct').value,
                updatedAt: Date.parse(new Date),
            }
            console.log(dataPost);
            axios.patch('http://localhost:3000/products/'+id, dataPost)
                .then(response => console.log(response))
                .then(() => window.location = "./index.html")

                
        })
        function slug(name) {
            var baseSlug = name.split(" ").join("-");
            return  baseSlug.normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
                        .toLowerCase();
        }
