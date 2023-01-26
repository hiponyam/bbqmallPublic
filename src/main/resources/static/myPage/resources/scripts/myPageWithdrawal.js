window.document.onsubmit=(e)=>{
    e.preventDefault();

    if(form['radio'].value===''){
        alert("탈퇴사유를 선택해주세요.")
        return;


    }
    if(form['reasonText'].value===''){
        alert("삭제 사유를 입력해주세요.");
        return;
    }

    if(form['checkBox'].checked===false){
        alert("탈퇴 동의에 체크해주세요.")
        return;
    }


    if (!confirm('정말로 탈퇴하시겠습니까?')) {
        return;
    }
    alert(form['radio'].value);



    Cover.show('처리중 입니다.\n잠시만 기다려 주세요.');

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('reasonValue', form['radio'].value);
    formData.append('reasonText', form['reasonText'].value);


    //주소로 보내게 되면 폼데이터가 필요없다.
    xhr.open('DELETE', "/member/withdrawal");//  window.location.href 를쓰면 boardid bid를 안보내도댐
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
            Cover.hide();
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);//{resut:suceess로 가져온것을 { \n result \t 식으로 만듬}
                switch (responseObject['result']) {
                    case 'success':
                        alert('삭제성공');
                        // const bid = responseObject['bid'];
                        // window.location.href = `list?bid=` + commentForm['board'].value;
                        window.location.href="/"
                        break;
                    case 'not_signed':
                        alert('로그아웃 되었습니다.');
                        break;
                    case 'no_such_user':
                        alert('없는 계정입니다.');
                        break;

                    default:
                        alert('알 수 없는 이유로 실패 하였습니다. \n\n잠시후 다시 시도해 주세요.')
                        break;
                }
            } else {
                alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.')

            }

        }
    }
    xhr.send(formData);//데이터가 없음

}