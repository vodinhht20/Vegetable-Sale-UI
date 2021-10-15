const qSelect = document.querySelector.bind(document);
const qSelectAll = document.querySelectorAll.bind(document);
const iconSort = document.querySelector('.search-page .option-sort label i');

var url = window.location.search;
const urlParams = new URLSearchParams(url);
var page = urlParams.get('page');
var countPage,countProduct = 0;
var querySort,queryFilter = '';
var baseApi = `http://localhost:3000/products?_page=${page}&_limit=8`;
ulitiFunction('','');

    // sắp xếp
    qSelect('#select_sort').addEventListener('change', function() {
        var avlSelectSort = qSelect('#select_sort').value;
        if (avlSelectSort==1) {
            ulitiFunction(`&_sort=price&_order=asc`,0);
            iconSort.classList.remove('fa-sort','fa-sort-amount-down');
            iconSort.classList.add('fa-sort-amount-up');
        } else  if (avlSelectSort==2){
            ulitiFunction(`&_sort=price&_order=desc`,0);
            iconSort.classList.remove('fa-sort','fa-sort-amount-up');
            iconSort.classList.add('fa-sort-amount-down');
        }
        else  if (avlSelectSort==3){
            ulitiFunction(`&_sort=discount&_order=asc`,0);
            iconSort.classList.remove('fa-sort','fa-sort-amount-down');
            iconSort.classList.add('fa-sort-amount-up');
        }
        else  if (avlSelectSort==4){
            ulitiFunction(`&_sort=discount&_order=desc`,0);
            iconSort.classList.remove('fa-sort','fa-sort-amount-up');
            iconSort.classList.add('fa-sort-amount-down');
        }
    })

    // lọc theo giá tiền
    qSelectAll('.form-check input').forEach((element,index) => {
        element.addEventListener('click', function(e) {
            if (index==0) {
            ulitiFunction(`&price_gte=0&price_lte=100000`,1);
            } else if (index==1) {
            ulitiFunction(`&price_gte=100000&price_lte=200000`,1);
            }
            else if (index==2) {
            ulitiFunction(`&price_gte=200000&price_lte=500000`,1);
            }
            else if (index==3) {
            ulitiFunction(`&price_gte=500000&price_lte=1000000`,1);
            }
            else if (index==4) {
            ulitiFunction(`&price_gte=1000000`,1);
            }
        })
    });
    function showData(image,name,price,discount,slug) {
        return `<div class="product-item col-lg-3 col-md-4 col-sm-6 col-sx-12"">
                    <div class="product-image">
                        <a href="./product-detail.html?slug=${slug}">
                            <img src="${image}" alt="Hành tây">
                        </a>
                        <div class="icon-on-image-product">
                            <i class="ti-heart" title="Thêm vào yêu thích"></i>
                            <a href=""><i class="ti-shopping-cart-full" title="Thêm vào giỏ hàng"></i></a>
                        </div>
                    </div>
                    <div class="product-information">
                        <a href="./product-detail.html?slug=${slug}">
                            <p>${name}</p>
                            <div class="box-price">
                                <span class="price-primary">${formatCash(`${price}`)} đ</span>
                            </div>
                        </a>
                    </div>
                    <span class="product-sale">- ${discount}%</span>
                </div>`
    }
    function ulitiFunction(condition,remote) {
        if(remote == 0) {
            querySort = condition
        } else {
            queryFilter = condition
        }
        axios.get(baseApi + querySort + queryFilter)
            .then(response => {
                const result = response.data.map((post,index) => {
                    countProduct = index;
                    return showData(post.image,post.name,post.price,post.discount,post.slug);
                    }).join("");
                    if (countProduct > 0) {
                        qSelect('.product-show-main').innerHTML = result;
                    } else {
                        qSelect('.product-show-main').innerHTML = '<h1>Không tìm thấy sản phầm nào !</h1>';
                    }
            });
    }
    // format giá tiền
    function formatCash(str) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
   }

function pageFunc(pageNumber,countPageItem) {
    if (pageNumber==1) { // disabled bnt befor khi page bằng 1
        qSelectAll('.page-item')[0].classList.add('disabled');
    }
        qSelectAll('.page-item').forEach(element => {
        element.classList.remove('active');
    });
        qSelectAll('.page-item')[pageNumber].classList.add('active');
        qSelect('#pageBefor').href = `?page=${parseInt(pageNumber)-1}`;
        qSelect('#pageNext').href = `?page=${parseInt(pageNumber)+1}`;
    if (parseInt(countPageItem)+1 ==pageNumber) {
        qSelect('.page-next').classList.add('disabled');
    }
}

async function pageItem() {
    var countPageItem = 0;
    await axios.get('http://localhost:3000/products')
            .then((response) => response.data)
            .then (data => {
                var result = '';
                countPageItem = Math.floor(data.length/8);
                for (let i = 1; i <countPageItem+2; i++) {
                    result+=    `<li class="page-item number-page"><a class="page-link" href="?page=${i}">${i}</a></li>`
                }
                resultTotal = `<li class="page-item">
                                    <a class="page-link" id="pageBefor" href="" tabindex="">Trước</a>
                                </li>`
                                +result+
                                `<li class="page-item page-next">
                                    <a class="page-link" id="pageNext" href="#">Tiếp</a>
                                </li>`;
                qSelect('#page-item').innerHTML = resultTotal;
            })
    await page ? pageFunc(page,countPageItem): pageFunc(1,countPageItem);
}

pageItem();



// tìm kiếm 
// qSelect('#inpKeySearch').addEventListener('input', function (e) {
//     var resultSearch = qSelect('.result-search');
//     if (qSelect('#inpKeySearch').value.trim() != '') {
//         axios.get('http://localhost:3000/products?q='+ qSelect('#inpKeySearch').value)
//             .then(response => {
//                 const result = response.data.map((post,index) => {
//                     count = index;
//                     return showDataChildren(post.image,post.name,post.price,post.slug);
//                     }).join("");
//                         qSelect('.result-search').style.display = 'block';
//                         resultSearch.innerHTML = result;
//             })
//     } else {
//         qSelect('.result-search').style.display = 'none';
//     }
        
// });

function showDataChildren(image,name,price,slug) {
    return `
        <div class="result-item">
            <a href="./product-detail.html?slug=${slug}">
                <img src="${image}" alt="">
                <div class="content-search-children">
                    <span class="product-name">${name}</span>
                    <span class="product-price">${formatCash(`${price}`)} đ</span>
                </div>
            </a>
        </div>`;
}

qSelect('#inpKeySearch').addEventListener('input', _.debounce(function (e) {
    var resultSearch = qSelect('.result-search');
    if (qSelect('#inpKeySearch').value.trim() != '') {
        axios.get('http://localhost:3000/products?q='+ `${qSelect('#inpKeySearch').value}`)
            .then(response => {
                const result = response.data.map((post,index) => {
                    count = index;
                    return showDataChildren(post.image,post.name,post.price,post.slug);
                    }).join("");
                    qSelect('.result-search').style.display = 'block';
                        resultSearch.innerHTML = result;
            })
    } else {
        qSelect('.result-search').style.display = 'none';
    }
        
},800));
