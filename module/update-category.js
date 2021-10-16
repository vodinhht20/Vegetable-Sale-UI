
//         

async function main() {
    var url = window.location.search;
    const urlParams = new URLSearchParams(url);
    var id = urlParams.get('id');
    const formAdd = document.querySelector('#form-add');

    await axios.get('http://localhost:3000/categories/'+id)
            .then(response => response.data)
            .then(data => {
                document.querySelector('#nameCategory').value = data.name;
            });
    await formAdd.addEventListener('submit', function(e) {
                        e.preventDefault();
                        var inpName = document.querySelector('#nameCategory').value;
                        axios.patch('http://localhost:3000/categories/'+id,{name: inpName})
                            .then(window.location = "./list-category.html");
                            
        });
}
main();