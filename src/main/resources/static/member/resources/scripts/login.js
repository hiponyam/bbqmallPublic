 const form = window.document.getElementById('form');
const content = window.document.getElementById('content');

 function save (saveId, saveBoolean) {
     const id = saveId;
     const checked = saveBoolean;
     window.localStorage.savedId = id;
     window.localStorage.savedChecked= checked;

 }


 const load = () => {
     form['id'].value = window.localStorage.savedId ?? '';
     if (window.localStorage.savedChecked==='true'){
         form['checkbox'].checked= true
     }

 };

 window.addEventListener('load', () =>{
     load();
 });

 form['loginUser'].addEventListener('click',()=>{

     content.classList.add('login-mode-user');
     content.classList.remove('login-mode-null');
     form['id'].setAttribute('placeholder','아이디');
     form['password'].setAttribute('placeholder','비밀번호');

 })
 form['loginNull'].addEventListener('click',()=>{

     content.classList.remove('login-mode-user');
     content.classList.add('login-mode-null');

     form['id'].setAttribute('placeholder','주문번호');
     form['id'].value='';
     form['password'].setAttribute('placeholder','주문자 이메일');

 })



 form.onsubmit =e =>{

     e.preventDefault();

     if(content.classList.contains('login-mode-null')){
         alert("비회원 주문은 추후 추가될 예정입니다.")
         return;
     }

     if(form['id'].value === ''){

         alert("아이디를 입력해주세요.");
         // form['id'].focus();
         form['id'].select();

      return;
     }

     if(form['password'].value === ''){

         alert("비밀번호를 입력해주세요.");
         // form['id'].focus();
         form['password'].select();

      return;
     }

     Cover.show('로그인 중입니다.');

     const xhr = new XMLHttpRequest();
     const formData = new FormData();
     formData.append('id', form['id'].value);
     formData.append('password', form['password'].value);
     xhr.open('POST', './login');
     xhr.onreadystatechange = () => {
         if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
             Cover.hide();
             if (xhr.status >= 200 && xhr.status < 300) {
                 const responseObject = JSON.parse(xhr.responseText);//{resutl:suceess로 가져온것을 { \n result \t 식으로 만듬}

                 switch (responseObject['result']) {
                     case 'success':




                             if(form['checkbox'].checked) {

                                 save(form['id'].value, true);

                             }else {
                                 save('',false);
                             }





                         window.history.back();

                         break;

                     default:
                         alert('로그인 하지 못하였습니다.\n이메일과 비밀번호를 확인해주세요.')
                 }
             }else {
                 alert('서버와 통신하지 못하였습니다.')
             }
         }
     }
     xhr.send(formData);




 }