// form['back'].addEventListener('click', () => window.history.length < 2 ? window.close() : window.history.back());
const form = window.document.getElementById('form');
let button = window.document.querySelectorAll('.button');
const sorting = form.querySelectorAll('[rel="sorting"]');
let sid = window.document.querySelectorAll('.sort-index');
const cid = window.document.getElementById('cid');
const rankingSid=  window.document.getElementById('rankingSid');



// for (let i = 0; i < sorting.length; i++) {
//     sorting.item(i).addEventListener('click', (e) => {
//         e.preventDefault();
//         alert(sid.item(i).value);
//         const xhr = new XMLHttpRequest();
//         const formData = new FormData();
//         formData.append('sid', sid.item(i).value);
//         xhr.open('PATCH', './category');
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === XMLHttpRequest.DONE) {
//                 if (xhr.status >= 200 && xhr.status < 300) {
//                     const responseObject = JSON.parse(xhr.responseText)
//                     switch (responseObject['result']) {
//                         case 'success':
//                             alert(sid.item(i).value + '정렬 선택');
//                             location.reload();
//                             break;
//                         default:
//                             alert("알 수 없는 이유로 상품을 정렬하지 못하였습니다.\n잠시 후 다시 시도해 주세요.");
//                             break;
//
//                     }
//                 } else {
//
//                 }
//             }
//         };
//         xhr.send(formData);
//     });
// }




// form['ranking'].addEventListener = () => {
//     Warning.hide();
//
//     const xhr = new XMLHttpRequest();
//     const formData = new FormData();
//     formData.append('index', form['index'].value);
//     formData.append('title', form['productTitle'].value);
//     formData.append('cid', form['cid'].value);
//     formData.append('price',form['goodsPrice'].value);
//     xhr.open('POST', './category');
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === XMLHttpRequest.DONE) {
//             Cover.hide();
//             if(xhr.status >= 200 && xhr.status < 300) {
//                 const responseObject = JSON.parse(xhr.responseText); // responseObject에 controller에서 받아온 값을 넣고
//                 switch(responseObject['result']) { // responseObject의 값을 switch할 때
//                     case 'not_allowed':
//                         Warning.show('게시글을 작성할 수 있는 권한이 없거나 로그아웃되었습니다. 확인 후 다시 시도해 주세요.');
//                         break;
//                     case 'success':
//                         Warning.hide();
//                         const index = responseObject['index'];
//                         window.location.href = `view?cid=${index}`;
//                         alert('작성 성공');
//                         break;
//                     default:
//                         Warning.show('알 수 없는 이유로 게시글을 작성하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
//
//                 }
//             } else {
//                 Warning.show('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
//             }
//         }
//     };
//     xhr.send(formData);
// };

