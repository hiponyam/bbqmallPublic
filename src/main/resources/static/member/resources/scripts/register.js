 const form = window.document.getElementById('form');
const  codeSendRow = form.querySelector('.code-send-row');
const  codeCheckRow = form.querySelector('.code-check-row');
const terms=  window.document.querySelector('.terms-content')
let date= new  Date();

 date.setMinutes(5);
 date.setSeconds(0);


 function timer (){


     date.setSeconds(date.getSeconds()-1);
     window.document.getElementById('guideText').innerText='수신된 인증 코드를 확인합니다.['+date.getMinutes()+ ":"+date.getSeconds()+']';
     if(date.getMinutes()===0&& date.getSeconds()===0){
         clearInterval(interval);
         window.document.getElementById('guideText').innerText='페이지를 새로고침하여 다시 진행해주세요.'

     }

 }
let interval;



form['emailButton'].addEventListener('click', ()=>{


    form['emailButton'].classList.add('visible');
    window.document.getElementById('guideText').innerText='이메일을 입력하여 인증을 진행합니다.'

    codeSendRow.classList.add('visible');

    form['next'].classList.add('visible');

})

 form['codeSendButton'].addEventListener('click', ()=> {


     if(form['emailText'].value === '') {
       alert('이메일 주소를 입력해주세요.');
         form['emailText'].focus();
         return;
     }
     let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

     if (!regEmail.test(form['emailText'].value)) {
         alert('이메일 주소를 바른 형식으로 입력해 주세요');

         form['emailText'].focus();
         return;

     }

     Cover.show('인증번호를 전송하고 있습니다.\n\n 잠시만 기다려 주세요.');

     const xhr = new XMLHttpRequest(); // new XHR 탭 자동완성
     const formData = new FormData(); // FormData 객체를 사용하는 formData 변수 선언
     formData.append('email', form['emailText'].value); // @RequestParam의 value, form의 input의 name

     xhr.open('POST', './email'); // 1이 찍힘
     xhr.onreadystatechange = () => {
         if(xhr.readyState === XMLHttpRequest.DONE) { // 연결 상태가 연결완료(성공, 실패 관계없이)일 때, 4가 찍힘
             Cover.hide(); // visible 클래스 삭제
             if(xhr.status >= 200 && xhr.status < 300) { // 연결 성공. status = XMLHttpRequest 내장 Property, 문서 상태 나타냄. 200~300 :
                 const responseObject = JSON.parse(xhr.responseText);
                 switch(responseObject['result']) {
                     case 'success':
                         // form.querySelector('[rel="emailWarning"]').innerText = '인증 번호를 전송하였습니다.\n 전송된 인증번호는 5분간만 유효합니다.';

                         alert('인증 번호를 전송하였습니다. 전송된 인증번호는 5분간만 유효합니다.');



                         interval= setInterval( timer,1000);


                         // date.setMinutes(date.getMinutes() +5);
                         // date= date.toLocaleTimeString();
                         form['emailText'].setAttribute('disabled', 'disabled'); //  email을 사용불가로
                         // form['emailText'].classList.add('disabled');
                         form['codeSendButton'].setAttribute('disabled', 'disabled'); // emailSend 버튼을 사용불가로
                         // form['codeSendButton'].classList.add('disabled');
                         codeSendRow.classList.add('disabled');
                         form['codeSendButton'].setAttribute('value','전송완료');
                         // form['emailAuthCode'].removeAttribute('disabled'); // 인증번호 의 disalbed 삭제하여 사용가능하게
                         form['emailAuthSalt'].value = responseObject['salt'];//히든에 값을 준다.
                         // form['codeCheckButton'].removeAttribute('disabled');


                         codeCheckRow.classList.add('visible');

                         // window.document.getElementById('guideText').innerText='수신된 인증 코드를 확인합니다.[코드만료]:'+date;

                         form['emailAuthCode'].focus(); // 인증번호 칸에 포커스

                         break;

                     case 'email_duplicated':
                         // form.querySelector('[rel="emailWarning"]').innerText = '해당 이메일은 이미 사용중입니다.';
                         // form.querySelector('[rel="emailWarning"]').classList.add('visible');
                         alert('해당 이메일은 이미 사용중입니다.');

                         form['emailText'].focus();
                         form['emailText'].select(); // 이메일 내용 드래그상태
                         break;
                     default:
                         // form.querySelector('[rel="emailWarning"]').innerText = '알 수 없는 이유로 인증 번호를 전송하지 못하였습니다.\n 잠시 후 다시 시도해 주세요.';
                         // form.querySelector('[rel="emailWarning"]').classList.add('visible');
                         alert('알 수 없는 이유로 인증번호를 전송하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
                         form['emailText'].focus();
                         form['emailText'].select(); // 이메일 내용 드래그상태
                 }
                 console.log(responseObject['result']);
                 console.log(responseObject['salt']);
             } else {
                alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
             }
         }
     };
     xhr.send(formData);
 });



 form['codeCheckButton'].addEventListener('click', () => {
     if (form['emailAuthCode'].value === ''){
         alert('인증번호를 입력해 주세요');
         form['emailAuthCode'].focus();
         return;
     }
     if (!new RegExp('^(\\d{6}$)').test(form['emailAuthCode'].value)) {
         alert('올바른 인증번호를 입력해 주세요');
         form['emailAuthCode'].focus();
         form['emailAuthCode'].select();
         return;
     }
     Cover.show('인증 번호를 확인하고 있습니다. \n\n 잠시만 기다려주세요.');
     const xhr = new XMLHttpRequest();
     const formData = new FormData();
     formData.append('email', form['emailText'].value);
     formData.append('code', form['emailAuthCode'].value);//맴버변수, html 넹미
     formData.append('salt', form['emailAuthSalt'].value);
     xhr.open('PATCH', './email');
     xhr.onreadystatechange = () => {
         if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
             Cover.hide();
             if (xhr.status >= 200 && xhr.status < 300) {
                 const responseObject = JSON.parse(xhr.responseText);
                 switch (responseObject['result']){
                     case 'expired':
                         alert('인증 정보가 만료되었습니다. 다시 시도해 주세요');
                         form['emailText'].removeAttribute('disabled');
                         form['emailText'].focus();
                         form['emailText'].select();
                         // form['emailSend'].removeAttribute('disabled');
                         // form['emailAuthCode'].value = '';
                         // form['emailAuthCode'].setAttribute('disabled','disabled');
                         // form['emailAuthSalt'].value= '';
                         // form['emailVerify'].setAttribute('disabled','disabled');
                         break;

                     case 'success':
                         alert('이메일이 정상적으로 인증되었습니다.')
                         // form['emailAuthCode'].setAttribute('disabled','disabled');
                         // form['emailVerify'].setAttribute('disabled','disabled');
                         // form['password'].focus();
                         clearInterval(interval);

                         // form['next'].classList.add('visible');

                         codeCheckRow.classList.add('disabled');
                         form['emailAuthCode'].setAttribute('disabled', 'disabled'); // emailSend 버튼을 사용불가로
                         form['codeCheckButton'].setAttribute('disabled', 'disabled'); // emailSend 버튼을 사용불가로
                         // form['codeSendButton'].classList.add('disabled');
                         codeSendRow.classList.add('disabled');
                         form['codeCheckButton'].setAttribute('value','인증완료');

                         window.document.getElementById('guideText').innerText='다음 페이지에서 회원가입을 진행합니다.'


                         break;
                     default:
                         alert('인증번호가 올바르지 않습니다.');
                         // form['emailAuthCode'].focus();
                         // form['emailAuthCode'].select();
                         // break;
                 }

                 console.log(xhr.responseText);


             } else {
                 alert('서버와 통신하지 못하였습니다.')
             }
         }
     };
     xhr.send(formData);
 });

 form['next'].addEventListener('click',()=>{

     //이메일 인증페이지에서 다음버튼을 눌렀을때 정보페이지로 간다.
     if(!form.classList.contains('step3') && !form.classList.contains('step2') && !form.classList.contains('step1')) {

         if(codeSendRow.classList.contains('disabled')&&
         codeCheckRow.classList.contains('disabled') &&
             (form['emailAuthSalt'].value != null)){

             form.classList.add('step1');
             form.classList.remove('step0');
             form['email'].value=form['emailText'].value;


         }else {

         alert("이메일 인증을 완료해주세요.");
         }



     }else if (form.classList.contains('step1')){

        if(!form['checkboxShop'].checked || !form['checkboxUser'].checked){
            alert('필수사항을 체크해주세요.');
            return;
        }

        form.classList.add('step2');
        form.classList.remove('step1');


     }

  //정보 입력페이지에서 눌렀을때 완료페이지로 가진다.
     else if(form.classList.contains('step2')) {

         form['email'].value=form['emailText'].value;
         let regId = /^[a-z]+[a-z0-9]{5,19}$/g;
         let regPassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
         let regContact = /^\d{2,3}\d{3,4}\d{4}$/;

         if (!regId.test(form['id'].value)) {

             alert("아이디 형식을 맞춰주세요.\n[공백 없는 영문/숫자 포함 6~20자]");
             return;
         }

         if (!regPassword.test(form['password'].value)) {

             alert("비밀번호 형식을 맞춰주세요.\n[8 ~ 16자의 영문, 숫자, 특수문자를 최소 한가지씩 포함]")

             return;
         }

        if(form['password'].value!==form['passwordCheck'].value){

            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if(form['name'].value===''){
            alert("이름을 입력해주세요.")
            return;
        }

         if (!regContact.test(form['contact'].value)) {

             alert('전화번호를 " - " 없이 입력해주세요.');

             return;
         }

         if (form ['addressPostal'].value==='' || form['addressSecondary'].value==='') {
             alert('주소를 확인해주세요');
             form['addressPostal'].focus();
             return;
         }

         if(form['birth'].value===''){
             alert('생년월일을 선택해주세요.');

         }

          Cover.show('회원가입 진행중입니다. 잠시만 기다려주세요');

          const xhr = new XMLHttpRequest();
          const formData = new FormData();

          formData.append('id',form['id'].value);
          formData.append('code',form['emailAuthCode'].value);
          formData.append('salt',form['emailAuthSalt'].value);
          formData.append('password', form['password'].value);
          formData.append('name',form['name'].value);
          formData.append('email',form['email'].value);
          formData.append('birth',form['birth'].value);



          formData.append('contact', form['contact'].value);
          formData.append('addressPostal',form['addressPostal'].value);
          formData.append('addressPrimary',form['addressPrimary'].value);
          formData.append('addressSecondary',form['addressSecondary'].value);

          xhr.open('POST', './register');
          xhr.onreadystatechange = () => {
              if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                  Cover.hide();
                  if (xhr.status >= 200 && xhr.status < 300) {
                      const responseObject = JSON.parse(xhr.responseText);
                      switch (responseObject['result']){
                          case 'success':
                              console.log('회원가입성공');
                              alert("가입성공!");

                              form['next'].value='로그인하러 가기'
                              form.classList.remove('step2');
                              form.classList.add('step3');

                              // form.querySelector('[rel="stepText"]').innerText = '회원가입 완료';
                              // form.querySelector('[rel="nextButton"]').innerText = '로그인하러 가기';
                              // form.classList.add('step3');
                              break;
                          case 'email_not_verified':
                              alert('이메일이 인증이 완료되지 않았습니다.');
                              break;
                          default:
                              alert('알 수 없는 이유로 회원가입에 실패하였습니다.');
                              break;
                      }
                  } else {
                      alert('서버와 통신하지 못하였습니다. 잠시후 다시 시도해 주세요.');
                  }
              }
          };
          xhr.send(formData);
     }

    else if(form.classList.contains('step3')){

        window.location.href='/member/login';

     }




 })


 //다음 지도
 form['addressFind'].addEventListener('click', () => {
     new daum.Postcode({
         oncomplete: e => {
             console.log(e);
             form.querySelector('[rel="addressFindPanel"]').classList.remove('visible');
             form['addressPostal'].value = e['zonecode'];
             form['addressPrimary'].value = e['address'];

             form['addressSecondary'].removeAttribute('disabled');

             form['addressSecondary'].value = '';
             form['addressSecondary'].focus();


         }
     }).embed(form.querySelector('[rel= "addressFindPanelDialog"]'));
     form.querySelector('[rel="addressFindPanel"]').classList.add('visible');


 })

 form.querySelector('[rel="addressFindPanel"]').addEventListener('click', () => {
     form.querySelector('[rel="addressFindPanel"]').classList.remove('visible');
 });


 //약관 동의

 form['checkAll'].addEventListener('click',()=>{

     if (form['checkAll'].checked){
         form['checkboxShop'].checked=true;
         form['checkboxUser'].checked=true;
         form['checkboxMarketing'].checked=true;
         form['checkboxEmail'].checked=true;
         form['checkboxSMS'].checked=true;

     }else     {
         form['checkboxShop'].checked=false;
         form['checkboxUser'].checked=false;
         form['checkboxMarketing'].checked=false;
         form['checkboxEmail'].checked=false;
         form['checkboxSMS'].checked=false;
     }

 });

 form['checkboxMarketing'].addEventListener('click',()=>{
     if (form['checkboxMarketing'].checked){
         form['checkboxEmail'].checked=true;
         form['checkboxSMS'].checked=true;

     }else     {

         form['checkboxEmail'].checked=false;
         form['checkboxSMS'].checked=false;
     }

    form['checkAll'].checked=false;
 });
 form['checkboxEmail'].addEventListener('click',()=>{

     if(!form['checkboxEmail'].checked && !form['checkboxSMS'].checked){

         form['checkboxMarketing'].checked=false;

     }else   form['checkboxMarketing'].checked=true;

     form['checkAll'].checked=false;


 });
 form['checkboxSMS'].addEventListener('click',()=>{

     if(!form['checkboxEmail'].checked && !form['checkboxSMS'].checked){

         form['checkboxMarketing'].checked=false;

     } else      form['checkboxMarketing'].checked=true;

     form['checkAll'].checked=false;

 });








 window.document.querySelector('.terms-text-button-shop').addEventListener('click',()=>{

     terms.classList.add('visible');
     window.document.getElementById('termsTitle').innerText='쇼핑몰 이용약관';
    window.document.querySelector('.shop-terms-text').classList.add('visible');

 } )
 window.document.querySelector('.terms-text-button-user').addEventListener('click',()=>{

     terms.classList.add('visible');
     window.document.getElementById('termsTitle').innerText='개인정보 수집 및 이용';
     window.document.querySelector('.user-terms-text').classList.add('visible');


 } )


 const exitingButtons= window.document.querySelectorAll('.exiting-button');

 for (const exitingButton of exitingButtons) {
     exitingButton.addEventListener('click', ()=>{
         terms.classList.remove('visible');
         window.document.querySelector('.shop-terms-text').classList.remove('visible');
         window.document.querySelector('.user-terms-text').classList.remove('visible');

     });}


