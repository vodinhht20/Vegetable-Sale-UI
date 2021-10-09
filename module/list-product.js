const qSelect = document.querySelector.bind(document);
const qSelectAll = document.querySelectorAll.bind(document);


var url = window.location.search;
const urlParams = new URLSearchParams(url);
var page = urlParams.get('page');

axios.get(`http://localhost:3000/products?_page=${page}&_limit=5`)
    .then(response => {
        var listData = document.querySelector('#content');
        const result = response.data.map((post,index) => {
            return showData(index,post.name,post.price,post.image,post.description,post.id,post.category);
        }).join("");
        listData.innerHTML = result;
    })
    .then(() => {
        qSelectAll('.bnt-confirm-delete').forEach(element => {
            element.addEventListener('click', function() {
                qSelect('#bnt-confirm-delete').value = element.value;
            })
        });
    })
    .then(() => {
        qSelect('#bnt-confirm-delete').addEventListener('click', function(e) {
            axios.delete('http://localhost:3000/products/' + this.value)
        })

    })


// sort price and discount
// sắp xếp
qSelect('#select_sort').addEventListener('change', function() {
    var avlSelectSort = qSelect('#select_sort').value; 
    var iconSort = qSelect('.option-sort label i');

    var condition = '';
    if (avlSelectSort == 1) {
        condition = '_sort=createdAt&_order=desc';
        iconSort.classList.remove('fa-sort','fa-sort-amount-up','fa-sort-alpha-up','fa-sort-alpha-down-alt');
        iconSort.classList.add('fa-sort-amount-down');
    } else if(avlSelectSort == 2) {
        condition = '_sort=createdAt&_order=asc';
        iconSort.classList.remove('fa-sort','fa-sort-amount-down','fa-sort-alpha-up','fa-sort-alpha-down-alt');
        iconSort.classList.add('fa-sort-amount-up');
    } else if(avlSelectSort == 3) {
        condition = '_sort=price&_order=asc';
        iconSort.classList.remove('fa-sort','fa-sort-amount-down','fa-sort-alpha-up','fa-sort-alpha-down-alt');
        iconSort.classList.add('fa-sort-amount-up');
    } else if(avlSelectSort == 4) {
        condition = '_sort=price&_order=desc';
        iconSort.classList.remove('fa-sort','fa-sort-amount-up','fa-sort-alpha-up','fa-sort-alpha-down-alt');
        iconSort.classList.add('fa-sort-amount-down');
    } else if(avlSelectSort == 5) {
        condition = '_sort=name&_order=asc';
        iconSort.classList.remove('fa-sort','fa-sort-amount-down','fa-sort-amount-up','fa-sort-alpha-down-alt');
        iconSort.classList.add('fa-sort-alpha-up');
    } else if(avlSelectSort == 6) {
        condition = '_sort=name&_order=desc';
        iconSort.classList.remove('fa-sort','fa-sort-amount-down','fa-sort-amount-up','fa-sort-alpha-up');
        iconSort.classList.add('fa-sort-alpha-down-alt');
    }
    axios.get(`http://localhost:3000/products?_page=${page}&_limit=5&${condition}`)
    .then(response => {
        var listData = document.querySelector('#content');
        const result = response.data.map((post,index) => {
            return showData(index,post.name,post.price,post.image,post.description,post.id,post.category);
        }).join("");
        listData.innerHTML = result;
    })
    .then(() => {
        qSelectAll('.bnt-confirm-delete').forEach(element => {
            element.addEventListener('click', function() {
                qSelect('#bnt-confirm-delete').value = element.value;
            })
        });
    })
    .then(() => {
        qSelect('#bnt-confirm-delete').addEventListener('click', function(e) {
            axios.delete('http://localhost:3000/products/' + this.value)
        })

    })
})









    function formatCash(str) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
   }
    
    function showData(index,name,price,image,description,id,category) {
        var formatCategory = category==1 ? 'Rau củ quả' : category==2 ? 'Trái Cây' : 'Thực phẩm tươi';
        return `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${name}</td>
                        <td>${formatCash(`${price}`)} đ</td>
                        <td class="description">${formatCategory}</td>
                        <td><img src="${image}" width="100" alt=""></td>
                        <td class="description">${description}</td>
                        <td><button value="${id}" data-toggle="modal" data-target="#exampleModal" class="btn btn-danger bnt-confirm-delete">Xóa</button></td>
                        <td><a href="update-product.html?id=${id}" class="btn btn-success">Sửa</a></td>
                    </tr>`;
    }
    //  phân trang 
    
function pageFunc(pageNumber) {
    if (pageNumber==1) {
        qSelectAll('.page-item')[0].classList.add('disabled');
    }
        qSelectAll('.page-item').forEach(element => {
        element.classList.remove('active');
    });
        qSelectAll('.page-item')[pageNumber].classList.add('active');
        qSelect('#pageBefor').href = `?page=${parseInt(pageNumber)-1}`;
        qSelect('#pageNext').href = `?page=${parseInt(pageNumber)+1}`;

}
page ? pageFunc(page): pageFunc(1);

