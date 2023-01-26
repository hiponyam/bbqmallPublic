const cartForm = window.document.getElementById('cartForm');
const buyButton = window.document.querySelector('.buy-button');
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
    formData.append('orderAmount', window.document.getElementById('quantity').innerText);

    xhr.open('POST', './order');
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
                        alert("알 수 없는 이유로 상품을 주문하지 못하였습니다\n\n잠시 후 다시 시도해 주세요.");
                        break;

                }
            } else {

            }
        }
    };
    xhr.send(formData);
});
