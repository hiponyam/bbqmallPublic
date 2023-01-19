let bidValue=form['bid'].value;
// const form = window.document.getElementById('form');

// ClassicEditor.create(form['content']);


const save = () => {
    const title = form['title'].value;
    const content = editor.getData();
    window.localStorage.savedTitle = title;
    window.localStorage.savedContent = content;

};

const load = () => {
    const title = window.localStorage.savedTitle ?? '';
    const content = window.localStorage.savedContent ?? '';
    form['title'].value = title;
    form['content'].value = content;
    editor.setData(content);
};
window.addEventListener('load', () =>{
    load();
    setInterval(save,1000);

})

if(window.document.getElementById('bid').value===''){
    window.document.getElementById('sideBarN').style.cssText=  `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;
}

if(window.document.getElementById('bid').value==='pi'){
    window.document.getElementById('sideBarPI').style.cssText=  `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;
}
if(window.document.getElementById('bid').value==='pr'){
    window.document.getElementById('sideBarPR').style.cssText=  `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;
}

if(window.document.getElementById('bid').value==='pr'|| window.document.getElementById('bid').value==='pi'){

    form['bid'].setAttribute('disabled', true);
    form['bid'].style.display="none";

    bidValue=window.document.getElementById('bid').value;
}


let editor;
ClassicEditor
    .create(form['content'],{
        simpleUpload: { //심플업로드는 오브젝트다.
            uploadUrl: './image'
        }
    })
    .then( e => editor =e); // e가 e2 > editor > form content .focus;




form['back'].addEventListener('click' , () => window.history.length <2 ? window.close() : window.history.back());


form.onsubmit = e =>{


    e.preventDefault();


    if(form['title'].value===''){
        alert('제목을 입력해 주세요.');
        form['title'].focus();
        return false;
    }
    if(editor.getData()===''){
        alert('내용을 입력해 주세요.');
        editor.focus();
        return false;
    }

    Cover.show('게시글을 작성 중 입니다.')
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('title', form['title'].value);
    // formData.append('content', form['content'].value);
    formData.append('content', editor.getData());

    formData.append('bid',bidValue );


    // bid= "${bid}";
    // xhr.open('POST', './write?bid='+form['bid'].value);
    xhr.open('POST', './writeNotice');//  window.location.href 를쓰면 boardid bid를 안보내도댐
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
            Cover.hide();
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);//{resutl:suceess로 가져온것을 { \n result \t 식으로 만듬}

                switch (responseObject['result']) {
                    case 'success':


                        alert('작성 성공');
                        if (bidValue==='pi'|| bidValue==='pr'){

                            window.location.href = `http://localhost:8080/board/?bid=`+bidValue;
                        }else {
                            window.location.href = `http://localhost:8080/board/`;//자바스크립트문법
                        }

                        break;

                    case 'not_allowed':
                        alert('게시글을 작성할 수 있는 권한이 없거나 로그아웃 되었습니다. 확인후 다시 시도해 주세요.');
                        break;


                    default:
                        alert('알 수 없는 이유로 게시글을 작성하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
                }
            }else {
                alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.')
            }
        }
    }
    xhr.send(formData);


};