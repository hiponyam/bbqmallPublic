 const form = window.document.getElementById('form');
const content = window.document.getElementById('content');
 let emailAuthIndex = null;

 let date;


 function timer (){


     date.setSeconds(date.getSeconds()-1);
     form.querySelector('.row-title2').innerText='수신된 이메일을 확인합니다.['+date.getMinutes()+ ":"+date.getSeconds()+']';
     if(date.getMinutes()===0&& date.getSeconds()===0){
         clearInterval(interval);
         form.querySelector('.row-title2').innerText='페이지를 새로고침하여 다시 진행해주세요.';


    }
 }
 let interval;







if(form['recoverMode'].value==='pw'){
    form.classList.remove('recover-mode-id');
    form.classList.add('recover-mode-password');


    form['name'].removeAttribute('disabled');
    form['email'].removeAttribute('disabled');

    form.querySelector('.result-button-row').classList.remove('visible');



    form.querySelector('.result-row').classList.remove('visible');
    form.querySelector('.next-button-row').classList.add('visible');
    form.querySelector('.icon-row').classList.add('visible');




////////








}


form['recoverId'].addEventListener('click',()=>{
if(form.querySelector('.next-button-row').classList.contains('password-patch')||
form.classList.contains('send-email')) {
    if (confirm("현재까지 진행했던 단계가 초기화 됩니다.\n진행하시겠습니까?") === true){
    }else {
        return;
}

}
        if(form.classList.contains('recover-mode-password')){
    form.classList.add('recover-mode-id');
    form.classList.remove('recover-mode-password');




        form['name'].removeAttribute('disabled');
        form['email'].removeAttribute('disabled');

        form.querySelector('.result-button-row').classList.remove('visible');



        form.querySelector('.result-row').classList.remove('visible');
        form.querySelector('.next-button-row').classList.add('visible');
        form.querySelector('.icon-row').classList.add('visible');


            form['next'].value = "이메일 전송";
            form.querySelector('.next-button-row').classList.remove('password-patch');
            form.querySelector('.name-row').classList.remove('disabled');
            form.querySelector('.email-row').classList.remove('disabled');

            form.querySelector('.password-check-row').classList.remove('visible');
            form.querySelector('.password-row').classList.remove('visible');
            form.querySelector('.user-id').classList.remove('visible');

            clearInterval(interval);
            form.querySelector('.row-title2').innerText='회원가입시 등록한 정보로 찾을 수 있습니다.';

            form['next'].removeAttribute('disabled');
            form.classList.remove('send-email');
            form['next'].style.cssText="cursor:pointer;";


}
})



 form['recoverPassword'].addEventListener('click',()=>{

     if(form.classList.contains('recover-mode-id')) {


         form.classList.remove('recover-mode-id');
         form.classList.add('recover-mode-password');


         form['name'].removeAttribute('disabled');
         form['email'].removeAttribute('disabled');
         form['id'].removeAttribute('disabled');

         form.querySelector('.result-button-row').classList.remove('visible');

         form.querySelector('.id-row').classList.remove('disabled');


         form.querySelector('.result-row').classList.remove('visible');
         form.querySelector('.next-button-row').classList.add('visible');
         form.querySelector('.icon-row').classList.add('visible');

         form.querySelector('.next-button-row').classList.remove('password-patch');


     }
 })

 form['next'].addEventListener('click',()=>{

//아이디 찾기 전송
     if(form.classList.contains('recover-mode-id')){


         if(form['name'].value==='' || form['email'].value===''){
             alert("이름, 이메일을 모두 입력해주세요.");
             return;
         }

         Cover.show('데이터 처리 중입니다. 잠시만 기다려주세요');

         const xhr = new XMLHttpRequest();
         const formData = new FormData();


         formData.append('name',form['name'].value);
         formData.append('email',form['email'].value);

         xhr.open('POST', '/member/recover');
         xhr.onreadystatechange = () => {
             if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                 Cover.hide();
                 if (xhr.status >= 200 && xhr.status < 300) {
                     const responseObject = JSON.parse(xhr.responseText);
                     switch (responseObject['result']){
                         case 'success':
                             alert('이메일 찾기 성공');

                             form['name'].setAttribute('disabled','disabled');
                             form['email'].setAttribute('disabled','disabled');

                             form.querySelector('.result-button-row').classList.add('visible');

                             let resultId= (responseObject['id']);
                             form.querySelector('[rel="result-id"]').innerHTML='<b style="color: yellow; background-color: black" >'  +  resultId +'</b>' ;
                             form.querySelector('.result-row').classList.add('visible');
                             form.querySelector('.next-button-row').classList.remove('visible');
                             form.querySelector('.icon-row').classList.remove('visible');
                             form['id'].value=resultId;

                             break;

                         default:
                             alert('입력한 정보와 일치하는 회원이 없습니다.');

                            form.querySelector('.result-button-row').classList.add('visible');

                     }
                 } else {
                     alert('서버와 통신하지 못하였습니다. 잠시후 다시 시도해 주세요.');
                 }
             }
         };
         xhr.send(formData);




     // 비밀번호찾기 전송
     }else if (form.classList.contains('recover-mode-password')&& !form.querySelector('.next-button-row').classList.contains('password-patch') ){



     if(form['name'].value==='' || form['id'].value==='' || form['email'].value==='') {
         alert("이름, 아이디, 이메일을 모두 입력해주세요.");
         return;

     }

         Cover.show('데이터 처리 중입니다. 잠시만 기다려주세요');

         const xhr = new XMLHttpRequest();
         const formData = new FormData();


         formData.append('name',form['name'].value);
         formData.append('email',form['email'].value);
         formData.append('id',form['id'].value);


         xhr.open('POST', '/member/recoverPassword');
         xhr.onreadystatechange = () => {
             if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                 Cover.hide();
                 if (xhr.status >= 200 && xhr.status < 300) {
                     const responseObject = JSON.parse(xhr.responseText);
                         switch (responseObject['result']) {
                             case 'success':
                             // alert('됨!');
                             emailAuthIndex = responseObject['index'];
                             form['email'].setAttribute('disabled','disabled');
                             // form['next'].setAttribute('disabled','disabled');
                             // form.querySelector('[rel="messageRow"]').classList.add('visible');
                             alert("이메일로 메일을 보냈습니다.");
                             form['next'].setAttribute('disabled','disabled');

                                 form['next'].style.cssText="cursor: not-allowed;";

                                 form['id'].setAttribute('disabled', 'disabled');
                               form['name'].setAttribute('disabled', 'disabled');

                                form.classList.add('send-email');

                                  date= new  Date();

                                 date.setMinutes(5);
                                 date.setSeconds(0);
                                 interval= setInterval( timer,1000);

                             break;

                         default:
                           alert('해당 이메일을 사용하는 계정을 찾을 수 없습니다.');
                             form['email'].focus();
                             form['email'].select();

                             form.querySelector('.result-button-row').classList.add('visible');

                     }
                 } else {
                     alert('서버와 통신하지 못하였습니다. 잠시후 다시 시도해 주세요.');
                 }
             }
         };
         xhr.send(formData);





     }

     else if (form.querySelector('.next-button-row').classList.contains('password-patch')) {

             Cover.show();
             if (form['password'].value === '') {

                 alert('비밀번호를 입력해주세요.');
                 form['password'].focus();
                 form['password'].select();
                 Cover.hide();
                 return;
             }
             if (form['passwordCheck'].value === '') {

                 alert('비밀번호를 입력해주세요.');
                 form['passwordCheck'].focus();
                 form['passwordCheck'].select();
                 Cover.hide();

                 return;
             }

             if (form ['password'].value !== form['passwordCheck'].value) {

                 alert('비밀번호가 서로 일치하지 않습니다.');
                 form['password'].focus();
                 form['password'].select();
                 Cover.hide();

                 return;
             }

             Cover.show('비밀번호를 재설정하고 있습니다.');

             const xhr = new XMLHttpRequest();
             const formData = new FormData();

             formData.append('email', form['email'].value);
             formData.append('code', form['code'].value);
             formData.append('salt', form['salt'].value);
             formData.append('password', form['password'].value);
             xhr.open('PATCH', '/member/recoverPassword');
             xhr.onreadystatechange = () => {
                 if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                     Cover.hide();
                     if (xhr.status >= 200 && xhr.status < 300) {
                         const responseObject = JSON.parse(xhr.responseText);//{result:success 로 가져온것을 { \n result \t 식으로 만듬}

                         switch (responseObject['result']) {
                             case 'success':
                                 alert('비밀번호를 성공적으로 재설정하였습니다.\n\n확인버튼을 누르면 로그인 페이지로 이동합니다.');
                                 window.location.href = 'login';
                                 break;

                             default:
                                 alert('비밀번호를 재설정하지 못하였습니다. ');
                         }
                     } else {
                         alert('서버와 통신하지 못하였습니다.');
                     }
                 }
             }; xhr.send(formData);

     }


 })


 setInterval(()=>{
     if (emailAuthIndex===null){
         return;
     }

     const xhr = new XMLHttpRequest();
     const formData = new FormData();
     formData.append('index', emailAuthIndex);
     xhr.open('POST', './recoverPasswordEmail');
     xhr.onreadystatechange = () => {
         if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝;
             if (xhr.status >= 200 && xhr.status < 300) {
                 const responseObject = JSON.parse(xhr.responseText);//{resutl:suceess로 가져온것을 { \n result \t 식으로 만듬}

                 switch (responseObject['result']) {
                     case 'success':
                         form['code'].value = responseObject['code'];
                         form['salt'].value = responseObject['salt'];
                         // form.querySelector('[rel="messageRow"]').classList.remove('visible');
                         emailAuthIndex = null;

                         form.querySelector('.user-id').classList.add('visible');
                         form.querySelector('.password-row').classList.add('visible');
                         form.querySelector('.password-check-row').classList.add('visible');

                         form['password'].focus();
                         form['password'].select();

                         form['userId'].value = form['id'].value;
                         form.querySelector('.email-row').classList.add('disabled');
                         form.querySelector('.id-row').classList.add('disabled');
                         form.querySelector('.name-row').classList.add('disabled');


                         form.querySelector('.result-button-row').classList.remove('visible');

                         // let resultId= (responseObject['id']);
                         // form.querySelector('[rel="result-id"]').innerHTML='<b style="color: yellow; background-color: black" >'  +  resultId +'</b>' ;
                         form.querySelector('.result-row').classList.remove('visible');
                         // form.querySelector('.next-button-row').classList.remove('visible');
                         form.querySelector('.icon-row').classList.remove('visible');
                         form.querySelector('.next-button-row').classList.add('visible');

                         form['next'].value = "비밀번호 변경";
                         form.querySelector('.next-button-row').classList.add('password-patch');
                         form['next'].removeAttribute('disabled');
                         form['next'].style.cssText="cursor: pointer";


                         clearInterval(interval);

                         break;
                     default:

                 }
             }
         }
     };
     xhr.send(formData);
 },1000);


form['login'].addEventListener('click',()=>{
    window.location="login";

});
 form['register'].addEventListener('click',()=>{

     window.location="register";
 });
