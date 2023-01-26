


if(window.document.getElementById('bid').value===("notice")) {
    const index = window.document.getElementById('index').value;

    const important = window.document.getElementById('important').value;
    const announceButton = window.document.querySelector('.announce-button');

    window.document.getElementById('sideBarN').style.cssText=  `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;

    if(window.document.getElementById('isAdmin').value==='1') {

        if (important === 'false') {
            announceButton.innerText = "공지해제"
        } else announceButton.innerText = "공지등록"


        announceButton.addEventListener('click', () => {

            if (!confirm('공지글로 변경 하시겠습니까?')) {

                return;
            }

            const xhr = new XMLHttpRequest();
            const formData = new FormData();

            formData.append('index', index);
            formData.append('important', important);

            // formData.append('isImportant', 'true');
            //http://localhost:8080/board/modifyNotice?nid=12
            xhr.open('PATCH', '/board/modifyNotice');
            //메소드방식은 아무능력이 없음  window.location.href 를쓰면 boardid bid를 안보내도댐
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                    Cover.hide();
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const responseObject = JSON.parse(xhr.responseText);//{resut:suceess로 가져온것을 { \n result \t 식으로 만듬}
                        switch (responseObject['result']) {

                            case 'success':
                                if (important === 'false') {
                                    alert("공지를 해제하였습니다.");
                                } else {
                                    announceButton.innerText = "공지등록"
                                    alert("공지로 등록하였습니다.");
                                }


                                window.location.href = "/board/"

                                break;
                            case 'no_such_article':
                                alert("게시물이 없습니다.");
                                window.location.href = `/board/`;

                                break;

                            case 'not_signed':
                                alert("로그인 되어 있지 않습니다.");

                                break;
                            case 'not_allowed':
                                alert("권한이 없습니다.");

                                break;

                            default :
                                alert("알 수 없는 이유로 실패하였습니다.");
                                break
                        }
                    } else {
                        alert("서버에 이상이 있습니다. 잠시후 시도해 주세요.");
                    }
                }
            }
            xhr.send(formData);

        })

    }




}else if(window.document.getElementById('bid').value===("pi")) {
    window.document.getElementById('sideBarPI').style.cssText=  `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;
    const piCommentButton = window.document.getElementById('piCommentButton');
    const piCommentWriteComplete = window.document.getElementById('piCommentWriteComplete');
    const piCommentCancel = window.document.getElementById('piCommentCancel');


    if (window.document.getElementById('isAdmin').value==='1') {
        piCommentButton.addEventListener("click", () => {

            window.document.querySelector('.write-comment-row').classList.add('visible');
        })

        piCommentCancel.addEventListener("click", () => {
            if (!confirm("답변작성을 취소하시겠습니까?")) {
                return false;
            }

            window.document.querySelector('.write-comment-row').classList.remove('visible');


        })
        piCommentWriteComplete.addEventListener("click", () => {
            if (!confirm("답변 작성겠습니까?")) {
                return false;
            }
            // alert("안료")
            Cover.show('처리중 입니다.\n잠시만 기다려 주세요.');

            const xhr = new XMLHttpRequest();
            const formData = new FormData();

            formData.append('nid', window.document.getElementById('noticeIndex').value);
            formData.append('content', window.document.getElementById('content').value);
            //주소로 보내게 되면 폼데이터가 필요없다.
            xhr.open('POST', "./writeAdminComment");//  window.location.href 를쓰면 boardid bid를 안보내도댐
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                    Cover.hide();
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const responseObject = JSON.parse(xhr.responseText);//{resut:suceess로 가져온것을 { \n result \t 식으로 만듬}

                        switch (responseObject['result']) {
                            case 'success':
                                alert('작성성공');
                                // const bid = responseObject['bid'];
                                // window.location.href = `list?bid=` + commentForm['board'].value;
                                window.location.reload();
                                break;
                            case 'not_signed':
                                alert('로그인 해주세요.');
                                break;

                            case 'not_allowed':
                                alert('로그아웃되었거나 권한이 없습니다.');
                                break;

                            case 'no_such_article':
                                alert('없는 게시물입니다.');
                                window.location.href = `/board/?bid=pi`;

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


        })

    }
    let modifyAdminComment= window.document.querySelectorAll('.modifyAdminComment');
    let commentModifyComplete= window.document.querySelectorAll('.commentModifyComplete');

    for (let i=0; i< modifyAdminComment.length; i++){


        modifyAdminComment.item(i).addEventListener("click",()=> {

            window.document.querySelectorAll('.modify-comment-row')[i].classList.add('visible');
            window.document.querySelectorAll('.delete-row')[i].classList.remove('visible');
            window.document.querySelectorAll('.comment-content')[i].style.display = 'none';


            window.document.querySelectorAll('.commentModifyCancel')[i].addEventListener("click", () => {

                if (confirm("답변 수정을 취소하시겠습니까?")) {
                    window.document.querySelectorAll('.modify-comment-row')[i].classList.remove('visible');
                    window.document.querySelectorAll('.delete-row')[i].classList.add('visible');
                    window.document.querySelectorAll('.comment-content')[i].style.display = 'block';

                } else return false;

            })

            commentModifyComplete.item(i).addEventListener("click", () => {

                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('articleIndex',  window.document.getElementById('noticeIndex').value);
                formData.append('bid', 'pi');
                formData.append('index', window.document.querySelectorAll('.picIndex')[i].value);
                formData.append('content', window.document.querySelectorAll('.modify-comment-content')[i].value);

                xhr.open('PATCH', './modifyAdminComment');//  window.location.href 를쓰면 boardid bid를 안보내도댐

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                        Cover.hide();
                        if (xhr.status >= 200 && xhr.status < 300) {
                            const responseObject = JSON.parse(xhr.responseText);//{resutl:suceess로 가져온것을 { \n result \t 식으로 만듬}

                            switch (responseObject['result']) {
                                case 'success':

                                    alert('수정 성공');

                                    window.location.reload();//자바스크립트문법


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
        })
    }

    let deleteAdminComments= window.document.querySelectorAll('.deleteAdminComment');


    for (let i=0 ; i< deleteAdminComments.length; i++){
        let item = deleteAdminComments.item(i);



        item.addEventListener("click",()=> {

            if (!confirm('정말로 삭제하시겠습니까?')) {

                return;
            }
            Cover.show('처리중 입니다.\n잠시만 기다려 주세요.');

            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append('index',window.document.querySelectorAll('.picIndex')[i].value  );
            formData.append('articleIndex',  window.document.getElementById('noticeIndex').value);
            formData.append('bid', 'pi');


            //주소로 보내게 되면 폼데이터가 필요없다.
            xhr.open('DELETE', "/board/deleteAdminComment");//  window.location.href 를쓰면 boardid bid를 안보내도댐
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
                                window.location.reload();
                                break;

                            case 'not_allowed':
                                alert('로그아웃되었거나 권한이 없습니다.');
                                break;

                            case 'no_such_article':
                                alert('없는 게시물이거나 답변입니다.');
                                window.location.href = `/board/?bid=bp`;

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
        })}

}else if(window.document.getElementById('bid').value===("pr")) {
    window.document.getElementById('sideBarPR').style.cssText=  `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;

}
else if(window.document.getElementById('bid').value===("pi")){

    window.document.getElementById('sideBarPI').style.cssText=  `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;

}else if(window.document.getElementById('bid').value===("pr")){

    window.document.getElementById('sideBarPR').style.cssText=  `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;

}


else {


    const commentButton = window.document.getElementById('commentButton');
    const commentCancel = window.document.getElementById('commentCancel');
    const commentWriteComplete = window.document.getElementById('commentWriteComplete');
    const authority=window.document.getElementById('authority');

    window.document.getElementById('sideBarBP').style.cssText=  `  color: rgba(0,0,0,0.9);
    font-weight: 700;`;


    if (authority.value==="true") {
        commentButton.addEventListener("click", () => {

            window.document.querySelector('.write-comment-row').classList.add('visible');
        })

        commentCancel.addEventListener("click", () => {
            if (!confirm("답변작성을 취소하시겠습니까?")) {
                return false;
            }

            window.document.querySelector('.write-comment-row').classList.remove('visible');


        })
        commentWriteComplete.addEventListener("click", () => {
            if (!confirm("답변 작성겠습니까?")) {
                return false;
            }
            // alert("안료")
            Cover.show('처리중 입니다.\n잠시만 기다려 주세요.');

            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append('bbid', form['bbid'].value);
            formData.append('content', form['content'].value);
            //주소로 보내게 되면 폼데이터가 필요없다.
            xhr.open('POST', "./writeAdminComment");//  window.location.href 를쓰면 boardid bid를 안보내도댐
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                    Cover.hide();
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const responseObject = JSON.parse(xhr.responseText);//{resut:suceess로 가져온것을 { \n result \t 식으로 만듬}

                        switch (responseObject['result']) {
                            case 'success':
                                alert('작성성공');
                                // const bid = responseObject['bid'];
                                // window.location.href = `list?bid=` + commentForm['board'].value;
                                window.location.reload();
                                break;
                            case 'not_signed':
                                alert('로그인 해주세요.');
                                break;

                            case 'not_allowed':
                                alert('로그아웃되었거나 권한이 없습니다.');
                                break;

                            case 'no_such_article':
                                alert('없는 게시물입니다.');
                                window.location.href = `/board/?bid=bp`;

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


        })


        const bpIndex = window.document.getElementById('bpIndex').value;


        window.document.getElementById('BpDeleteButton').addEventListener('click', e => {
            e.preventDefault();

            if (!confirm('정말로 삭제하시겠습니까?')) {

                return;
            }

            Cover.show('처리중 입니다.\n잠시만 기다려 주세요.');

            const xhr = new XMLHttpRequest();
            // const formData = new FormData();
            // formData.append('index', index);
            //주소로 보내게 되면 폼데이터가 필요없다.
            xhr.open('DELETE', "/board/deleteNotice?bid=bp&bbid=" + bpIndex);//  window.location.href 를쓰면 boardid bid를 안보내도댐
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
                                window.location.href = `/board/?bid=bp`;
                                break;

                            case 'not_allowed':
                                alert('로그아웃되었거나 권한이 없습니다.');
                                break;

                            case 'no_such_article':
                                alert('없는 게시물입니다.');
                                window.location.href = `/board/?bid=bp`;

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
            xhr.send();//데이터가 없음


        })

    }

    let modifyAdminComment= window.document.querySelectorAll('.modifyAdminComment');
    let commentModifyComplete= window.document.querySelectorAll('.commentModifyComplete');

    for (let i=0; i< modifyAdminComment.length; i++){


        modifyAdminComment.item(i).addEventListener("click",()=> {

            window.document.querySelectorAll('.modify-comment-row')[i].classList.add('visible');
            window.document.querySelectorAll('.delete-row')[i].classList.remove('visible');
            window.document.querySelectorAll('.comment-content')[i].style.display = 'none';
            window.document.querySelectorAll('.commentModifyCancel')[i].addEventListener("click", () => {

                if (!confirm("답변 수정을 취소하시겠습니까?")) {
                    return false;
                }  window.document.querySelectorAll('.modify-comment-row')[i].classList.remove('visible');
                window.document.querySelectorAll('.delete-row')[i].classList.add('visible');
                window.document.querySelectorAll('.comment-content')[i].style.display = 'block';

            })

            commentModifyComplete.item(i).addEventListener("click", () => {

                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('articleIndex',  form['bbid'].value);
                formData.append('index', window.document.querySelectorAll('.acIndex')[i].value);
                formData.append('content', window.document.querySelectorAll('.modify-comment-content')[i].value);
                formData.append('bid', 'bpArticle');

                xhr.open('PATCH', './modifyAdminComment');//  window.location.href 를쓰면 boardid bid를 안보내도댐

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                        Cover.hide();
                        if (xhr.status >= 200 && xhr.status < 300) {
                            const responseObject = JSON.parse(xhr.responseText);//{resutl:suceess로 가져온것을 { \n result \t 식으로 만듬}

                            switch (responseObject['result']) {
                                case 'success':

                                    alert('수정 성공');

                                    window.location.reload();//자바스크립트문법


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
        })
    }



    let deleteAdminComments= window.document.querySelectorAll('.deleteAdminComment');


    for (let i=0 ; i< deleteAdminComments.length; i++){
        let item = deleteAdminComments.item(i);



        item.addEventListener("click",()=>{

            if (!confirm('정말로 삭제하시겠습니까?')) {

                return;
            }
            Cover.show('처리중 입니다.\n잠시만 기다려 주세요.');

            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append('articleIndex',  form['bbid'].value);
            formData.append('index', window.document.querySelectorAll('.acIndex')[i].value);
            formData.append('bid', 'bpArticle');


            //주소로 보내게 되면 폼데이터가 필요없다.
            xhr.open('DELETE', "/board/deleteAdminComment");//  window.location.href 를쓰면 boardid bid를 안보내도댐
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
                                window.location.reload();
                                break;

                            case 'not_allowed':
                                alert('로그아웃되었거나 권한이 없습니다.');
                                break;

                            case 'no_such_article':
                                alert('없는 게시물이거나 답변입니다.');
                                window.location.href = `/board/?bid=bp`;

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




        })




    }


}

if (window.document.getElementById('isMine').value==='1') {
    window.document.getElementById('deleteButton').addEventListener('click', e => {
        e.preventDefault();

        if (!confirm('정말로 삭제하시겠습니까?')) {

            return;
        }

        Cover.show('처리중 입니다.\n잠시만 기다려 주세요.');

        const xhr = new XMLHttpRequest();
        // const formData = new FormData();
        // formData.append('index', index);
        //주소로 보내게 되면 폼데이터가 필요없다.
        xhr.open('DELETE', "/board/deleteNotice?bid=notice&nid=" + index);//  window.location.href 를쓰면 boardid bid를 안보내도댐
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                Cover.hide();
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseObject = JSON.parse(xhr.responseText);//{resut:suceess로 가져온것을 { \n result \t 식으로 만듬}

                    switch (responseObject['result']) {
                        case 'success':
                            alert('삭제성공');

                            if (window.document.getElementById('bid').value===("notice")){
                                window.location.href = `/board/`;
                            }else {
                                window.location.href = `/board/?bid=` + window.document.getElementById('bid').value;

                            }


                            break;

                        case 'not_allowed':
                            alert('로그아웃되었거나 권한이 없습니다.');
                            break;

                        case 'no_such_board':
                            alert('없는 게시물입니다.');
                            window.location.href = `/board/`;

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
        xhr.send();//데이터가 없음


    })
}