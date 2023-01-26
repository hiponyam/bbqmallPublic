const cartForm = window.document.getElementById('cartForm');
const deleteButton = window.document.getElementById('deleteButton');
let wishlistIndex = window.document.querySelectorAll('.wishlist-index');
let button = window.document.querySelectorAll('.delete-button');
const buyButton = window.document.querySelector('.all-order-btn');
const id = window.document.getElementById('id');
const name = window.document.getElementById('userName');
const contact = window.document.getElementById('contact');
const email = window.document.getElementById('email');
const addressPostal = window.document.getElementById('addressPostal');
const addressPrimary = window.document.getElementById('addressPrimary');
const addressSecondary = window.document.getElementById('addressSecondary');
const pid = window.document.getElementById('pid');
const productName = window.document.getElementById('productName');
const price = window.document.getElementById('price');
const orderAmount = window.document.getElementById('quantity');


for (let i = 0; i < button.length; i++) {
    button.item(i).addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('wishlistIndex', wishlistIndex.item(i).value);

        xhr.open('DELETE', './wishlist');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseObject = JSON.parse(xhr.responseText)
                    switch (responseObject['result']) {
                        case 'success':
                            location.reload();
                            break;
                            default:
                                alert("알 수 없는 이유로 상품을 삭제하지 못하였습니다\n\n잠시 후 다시 시도해 주세요.");
                            break;

                    }
                } else {

                }
            }
        };
        xhr.send(formData);
    });
}

buyButton.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('id', id.value);
    formData.append('name', window.document.getElementById('userName').innerText);
    formData.append('contact', window.document.getElementById('contact').innerText);
    formData.append('addressPostal',window.document.getElementById('addressPostal').innerText);
    formData.append('addressPrimary', window.document.getElementById('addressPrimary').innerText);
    formData.append('addressSecondary', window.document.getElementById('addressSecondary').innerText);
    formData.append('productIndex', pid.value);
    formData.append('productName', window.document.getElementById('productName').innerText);
    formData.append('price', window.document.getElementById('price').innerText);
    formData.append('orderAmount', window.document.getElementById('sumQuantity').value);

    xhr.open('PATCH', './wishlist');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText)
                switch (responseObject['result']) {
                    case 'success':
                        alert('order 테이블에 삽입성공');
                        window.location.href='./';
                        break;
                    default:
                        alert("알 수 없는 이유로 상품을 삭제하지 못하였습니다\n\n잠시 후 다시 시도해 주세요.");
                        break;

                }
            } else {

            }
        }
    };
    xhr.send(formData);
});