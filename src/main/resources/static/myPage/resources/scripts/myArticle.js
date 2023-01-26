

window.document.getElementById('passwordCheckButton').addEventListener("click",()=> {


    if (window.document.getElementById('passwordCheck').value === '') {

        alert("비밀번호를 입력해주세요.");
        // form['id'].focus();
        form['password'].select();

        return;
    }

    Cover.show('비밀번호 확인중 입니다.');

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('id', window.document.getElementById('id').value);
    formData.append('password',  window.document.getElementById('passwordCheck').value);
    xhr.open('POST', './modifyMyInfo');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
            Cover.hide();
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);//{resutl:suceess로 가져온것을 { \n result \t 식으로 만듬}

                switch (responseObject['result']) {
                    case 'success':

                        alert('비밀번호 인증 성공');

                        let modifyRow= window.document.querySelectorAll('.modify-row');

                        for (let i=0; i<modifyRow.length-1; i++){
                            modifyRow.item(i).style.display="block";
                        }
                        window.document.querySelector('.address-row').style.display="flex";
                        form['submit'].style.display="block";
                        window.document.querySelectorAll('.password-check-row').item(0).style.display="none";
                        window.document.querySelectorAll('.password-check-row').item(1).style.display="none";
                        break;

                    default:
                        alert('인증에 실패하였습니다.\n확인후 다시 시도해주세요.')
                }
            } else {
                alert('서버와 통신하지 못하였습니다.')
            }
        }
    }
    xhr.send(formData);


})
window.document.getElementById('passwordButton').addEventListener("click",()=>{
    window.document.querySelector('.password-row').classList.add('visible');
    form['password'].removeAttribute('disabled');
    form['password'].focus();

})
window.document.getElementById('passwordCancel').addEventListener("click",()=>{
    window.document.querySelector('.password-row').classList.remove('visible');
    form['password'].value=null;
    form['password2'].value=null;
    form['password'].setAttribute('disabled','disabled');

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
form.addEventListener("keydown",e =>{
    if(e.code==="Enter"){
        e.preventDefault();
    }
})


form.onsubmit=(e)=>{
    e.preventDefault()
    // if (!confirm("정보를 수정하시겠습니까?")){
    //     return;
    // }
    let regPassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    let regContact = /^\d{2,3}\d{3,4}\d{4}$/;

    if(form['name'].value===''){
        alert("이름을 입력해주세요.");
        return;
    }

    if(form['password'].value!==''){
        if (!regPassword.test(form['password'].value)) {

            alert("비밀번호 형식을 맞춰주세요.\n[8 ~ 16자의 영문, 숫자, 특수문자를 최소 한가지씩 포함]")

            return;
        }
        if(form['password'].value!==form['password2'].value){
            alert("비밀번호를 확인해주세요.");
            return;
        }
    }



    if (!regContact.test(form['contact'].value)) {

        alert('전화번호를 " - " 없이 전부 입력해주세요.');

        return;
    }

    if(form['birth'].value===''){
        alert("생일을 입력해주세요.");
        return;
    }
    if(form['addressPostal'].value===''){
        alert("주소를 입력해주세요.");
        return;
    }
    if(form['addressPrimary'].value===''){
        alert("주소를 입력해주세요.");
        return;
    }
    if(form['addressSecondary'].value===''){
        alert("상세주소를 입력해주세요.");
        return;
    }



    Cover.show('회원정보를 업데이트중 입니다.');

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('id',form['userId'].value);
    formData.append('name',form['name'].value);
    formData.append('password',form['password'].value);
    formData.append('email',form['email'].value);
    formData.append('contact',form['contact'].value);
    formData.append('birth',form['birth'].value);
    formData.append('addressPostal',form['addressPostal'].value);
    formData.append('addressPrimary',form['addressPrimary'].value);
    formData.append('addressSecondary',form['addressSecondary'].value);

    xhr.open('PATCH', './modifyMyInfo');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
            Cover.hide();
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);//{resutl:suceess로 가져온것을 { \n result \t 식으로 만듬}

                switch (responseObject['result']) {
                    case 'success':

                        alert('회원 정보가 수정되었습니다.\n다시 로그인해주세요.');
                        window.location.href='/'
                        break;
                    case 'not_signed':

                        alert('로그인 되어있지 않습니다.');
                        window.location.href='/'
                        break;
                    case 'not_allowed':

                        alert('회원정보가 일치하지 않습니다.\n확인 후 다시 시도해 주십시오.');

                        break;
                    case 'no_such_article':

                        alert('없는 회원입니다.');

                        break;

                    case 'contact_duplicated':

                        alert('이미 등록된 연락처입니다.');

                        break;

                    default:
                        alert('알 수 없는 이유로 실패하였습니다.\n확인 후 다시 시도해 주십시오.')
                }
            } else {
                alert('서버와 통신하지 못하였습니다.')
            }
        }
    }
    xhr.send(formData);

}