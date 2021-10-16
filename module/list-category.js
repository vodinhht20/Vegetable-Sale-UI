
var listCategory =  document.querySelector('#content');
function showData(index,name,id,status) {
    status = status? 'checked' : '';
      return `
        <tr>
            <td>${index+1}</td>
            <td>${name}</td>
            <td class="bnt-status">
                <input class="statusChecked" type="checkbox"value="${id}" ${status} data-toggle="toggle">
            </td>
            <td><a href="update-category.html?id=${id}" class="btn btn-success">Sửa</a></td>
        </tr>`;
}
async function main() {
    await axios.get('https://x4vxf.sse.codesandbox.io/categories')
        .then((response) => response.data)
        .then(data => {
            var result = data.map((post,index) => {
                return showData(index, post.name, post.id,post.disabled)
            }).join("");
            listCategory.innerHTML = result;
        })
    await addLinkCript('https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js');
    await updateStatus();
}
main();
function updateStatus () {
    const qSelectAll = document.querySelectorAll.bind(document);
    const qSelect = document.querySelector.bind(document);
    qSelectAll('.bnt-status').forEach((element,index) => {
                element.addEventListener('click', e => {
                        setTimeout(function(){
                            var idCategory = qSelectAll('.statusChecked')[index].value;
                            var status = qSelectAll('.statusChecked')[index].checked;
                            var dataPost = {
                                disabled: status
                            }
                            axios.patch('https://x4vxf.sse.codesandbox.io/categories/'+idCategory, dataPost)
                        },100)
                })
            });
}
function addLinkCript (link) {
    let script = document.createElement("script");
    script.src = link;
    document.head.append(script);
}
