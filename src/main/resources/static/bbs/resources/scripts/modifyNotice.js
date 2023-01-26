let editor;
ClassicEditor
    .create(form['content'], {
        simpleUpload: { //심플업로드는 오브젝트다.
            uploadUrl: './image'
        }
    })
    .then(e => editor = e); // e가 e2 > editor > form content .focus;

form['back'].addEventListener('click', () => window.history.length < 2 ? window.close() : window.history.back());



if(form['bidValue'].value==="notice") {



    // ClassicEditor
    //     .create(form['content'], {
    //         simpleUpload: { //심플업로드는 오브젝트다.
    //             uploadUrl: './image'
    //         }
    //     })
    //     .then(e => editor = e); // e가 e2 > editor > form content .focus;
    //
    // form['back'].addEventListener('click', () => window.history.length < 2 ? window.close() : window.history.back());

    form['bid'].value=form['bidLoad'].value;
    if(bidValue.value==='pi'|| bidValue.value==='pr'){
        form['bid'].setAttribute('disabled',true);
        form['bid'].style.display="none";


    }
    form.onsubmit = e => {


        e.preventDefault();

        if (form['title'].value === '') {
            alert('제목을 입력해 주세요.');
            form['title'].focus();
            return false;
        }
        if (editor.getData() === '') {
            alert('내용을 입력해 주세요.');
            editor.focus();
            return false;
        }

        Cover.show('게시글 수정을 처리중 입니다.');
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        const index = window.document.getElementById('index').value;

        // let bidValue = window.document.getElementById('bidValue').value;

        formData.append('title', form['title'].value);
        formData.append('BoardId',(bidValue.value==='pi'|| bidValue.value==='pr')?null:  form['bid'].value);

        // formData.append('content', form['content'].value);
        formData.append('content', editor.getData());
        formData.append('index', index)

        xhr.open('PATCH', './modifyNotice');//  window.location.href 를쓰면 boardid bid를 안보내도댐
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                Cover.hide();
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseObject = JSON.parse(xhr.responseText);//{resutl:suceess로 가져온것을 { \n result \t 식으로 만듬}

                    switch (responseObject['result']) {
                        case 'success':

                            alert('작성 성공');
                            if (bidValue.value==='pi'|| bidValue.value==='pr'){

                                window.location.href = `/board/?bid=`+bidValue.value;
                            }else {
                                window.location.href = `/board/`;//자바스크립트문법
                            }

                            break;

                        case 'not_login':
                            alert('로그인이 되었는지 확인후 다시 시도해 주세요.');
                            break;

                        case 'not_allowed':
                            alert('게시글을 수정할 수 있는 권한이 없습니다.');
                            break;

                        case 'no_such_article':
                            alert('게시글이 존재하지 않습니다.');
                            break;

                        default:
                            alert('알 수 없는 이유로 게시글을 수정하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
                    }
                } else {
                    alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.')
                }
            }
        }
        xhr.send(formData);


    };
}
else if(form['bidValue'].value==="bp") {
    form['bbid'].value=form['bbidLoad'].value;
    window.document.getElementById('sideBarBP').style.cssText=  `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;


    form['submit'].addEventListener("click",()=>{





        if(form['bbid'].value==='no'){
            alert('분류를 선택해 주세요.');
            form['bbid'].focus();
            return false;
        }
        if(form['name'].value===''){
            alert('담당자명을 입력해 주세요.');
            form['name'].focus();
            return false;
        }
        if(form['email'].value===''){
            alert('담당자 이메일을 입력해 주세요.');
            form['email'].focus();
            return false;
        }if(form['contact'].value===''){
            alert('담당자 연락처를 입력해 주세요.');
            form['contact'].focus();
            return false;
        }if(form['company'].value===''){
            alert('회사명을 입력해 주세요.');
            form['company'].focus();
            return false;
        }if(form['requestDate'].value==='') {
            alert('배송요청일을 선택해 주세요.');
            form['requestDate'].focus();
            return false;
        }if(form['productInfo'].value===''){
            alert('문의 상품을 기술해주세요.');
            form['productInfo'].focus();
            return false;

        }if(form['requestPrice'].value===''){
            alert('요청가격을 입력해 주세요.');
            form['requestPrice'].focus();
            return false;
        }if(form['pay'].value===''){
            alert('결제수단을 입력해 주세요.');
            form['pay'].focus();
            return false;
        }if(form['requestEvidence'].value===''){
            alert('결제시 필요한 증빙 자료를 입력해 주세요.\nex)"현금영수증 or 세금계산서 필요합니다."\n해당사항이 없으면 "없음"으로 입력해주세요');
            form['requestEvidence'].focus();
            return false;
        }if(form['title'].value==='') {
            alert('제목을 입력해 주세요.');
            form['title'].focus();
            return false;
        }if(editor.getData()===''){
            alert('내용을 입력해 주세요.');
            editor.focus();
            return false;
        }

        Cover.show('게시글 수정을 처리중 입니다.')
        // let replySms;
        // let replyEmail;
        // if (form['replySms'].checked){replySms=true;}
        // if (form['replyEmail'].checked){replyEmail=true;}

        // let replySmsBp;
        // let replyEmailBp;
        // replySmsBp =
        // replyEmailBp = ;




        Cover.show('게시글을 작성 중 입니다.')
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('index', form['bpIndex'].value);
        formData.append('id', form['id'].value);
        formData.append('bpBoardId', form['bbid'].value);
        formData.append('name', form['name'].value);
        formData.append('email', form['email'].value);
        formData.append('contact', form['contact'].value);
        formData.append('company', form['company'].value);
        formData.append('requestDate', form['requestDate'].value);
        formData.append('productInfo', form['productInfo'].value);

        formData.append('requestPrice', form['requestPrice'].value);
        formData.append('replySms', form['replySms'].checked?true:false);
        formData.append('replyEmail', form['replyEmail'].checked?true:false);
        formData.append('pay', form['pay'].value);
        formData.append('requestEvidence', form['requestEvidence'].value);
        formData.append('title', form['title'].value);
        formData.append('content', editor.getData());

        xhr.open('PATCH', './modifyBpArticle');//  window.location.href 를쓰면 boardid bid를 안보내도댐
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                Cover.hide();
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseObject = JSON.parse(xhr.responseText);//{resutl:suceess로 가져온것을 { \n result \t 식으로 만듬}

                    switch (responseObject['result']) {
                        case 'success':

                            alert('작성 성공');

                            window.location.href = `/board/?bid=bp`;//자바스크립트문법


                            break;

                        case 'not_login':
                            alert('로그인이 되었는지 확인후 다시 시도해 주세요.');
                            break;

                        case 'not_allowed':
                            alert('게시글을 수정할 수 있는 권한이 없습니다.');
                            break;

                        case 'no_such_article':
                            alert('게시글이 존재하지 않습니다.');
                            break;

                        default:
                            alert('알 수 없는 이유로 게시글을 수정하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
                    }
                } else {
                    alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.')
                }
            }
        }
        xhr.send(formData);


    })




}
if(window.document.getElementById('bidValue').value==="notice"){
    window.document.getElementById('sideBarN').style.cssText = `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;
}

if(window.document.getElementById('bidValue').value==="pi"){
    window.document.getElementById('sideBarPI').style.cssText = `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;
}
if(window.document.getElementById('bidValue').value==="pr"){
    window.document.getElementById('sideBarPR').style.cssText = `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;
}
