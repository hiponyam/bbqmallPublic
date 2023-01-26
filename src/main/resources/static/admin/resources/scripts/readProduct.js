let imageButton= window.document.querySelectorAll('.image-select-button');
let images= window.document.querySelectorAll('.images');
let imageContainer=window.document.querySelectorAll('.image-container');
let noImage= window.document.querySelectorAll('.no-image');
let detailIndex;
let deleteButton = window.document.querySelectorAll('.delete');
let pid = window.document.querySelectorAll('.pid');

window.document.getElementById('sideBarRUD').style.cssText=`color: rgba(0,0,0,0.9);
    font-weight: 700;`;

form['menuIndex'].addEventListener('change', ()=>{
    if(form['menuIndex'].value==='99') {
        form['detailIndex1'].style.display = "none"
        form['detailIndex2'].style.display = "none"
        form['detailIndex3'].style.display = "none"

        window.location.href=`/admin/read/?menuIndex=99`

    }

    if(form['menuIndex'].value==='1') {
        form['detailIndex1'].style.display="inline-block"
        form['detailIndex2'].style.display="none"
        form['detailIndex2'].value=0;
        form['detailIndex3'].style.display="none"
        form['detailIndex3'].value=0;

    }else if(form['menuIndex'].value==='2') {
        form['detailIndex2'].style.display="inline-block"
        form['detailIndex1'].style.display="none"
        form['detailIndex1'].value=0;
        form['detailIndex3'].style.display="none"
        form['detailIndex3'].value=0;




    }else if(form['menuIndex'].value==='3') {
        form['detailIndex3'].style.display="inline-block"
        form['detailIndex2'].style.display="none"
        form['detailIndex2'].value=0;
        form['detailIndex1'].style.display="none"
        form['detailIndex1'].value=0;


    }




})
//상세 메뉴를 골랐을때
let nowDetailIndex= parseInt(form['nowDetailIndex'].value);
let nowMenuIndex= parseInt(form['nowMenuIndex'].value);

if (nowMenuIndex===99){
    form['menuIndex'].value=99;

}

if (!isNaN(nowMenuIndex) && nowMenuIndex===1){
    form['detailIndex1'].style.display="inline-block";
    form['detailIndex1'].value=nowDetailIndex;
    form['menuIndex'].value='1';

    form['detailIndex3'].style.display="none"
    form['detailIndex2'].style.display="none"
}
if (nowMenuIndex===2){

    form['detailIndex2'].style.display="inline-block";
    form['detailIndex2'].value=nowDetailIndex;
    form['menuIndex'].value='2';

    form['detailIndex1'].style.display="none"
    form['detailIndex3'].style.display="none"
}

// parseInt(form['detailIndex'].value) >=12
if (nowMenuIndex===3 ){

    form['detailIndex3'].style.display="inline-block";
    form['detailIndex3'].value=nowDetailIndex;
    form['menuIndex'].value='3';
    form['detailIndex1'].style.display="none"
    form['detailIndex2'].style.display="none"

}



form['detailIndex1'].addEventListener('change', ()=>{

    if(form['detailIndex1'].value!=='0') {
        detailIndex = form['detailIndex1'].value

        window.location.href = `/admin/read/?menuIndex=1&detailIndex=${detailIndex}`
    }
})
form['detailIndex2'].addEventListener('change', ()=>{


    if(form['detailIndex2'].value!=='0') {
        detailIndex = form['detailIndex2'].value
        window.location.href = `/admin/read/?menuIndex=2&detailIndex=${detailIndex}`
    }
})
form['detailIndex3'].addEventListener('change', ()=>{


    if(form['detailIndex3'].value!=='0') {
        detailIndex = form['detailIndex3'].value
        window.location.href = `/admin/read/?menuIndex=3&detailIndex=${detailIndex}`
    }
})






for (let i =0; i<deleteButton.length; i++){

    deleteButton.item(i).addEventListener("click",(e)=>{
        e.preventDefault();

        if (!confirm('상품을 삭제합니다.\n상품 데이터는 복구할 수 없습니다.\n진행하시겠습니까?')) {

            return;
        }

        Cover.show('처리중 입니다.\n잠시만 기다려 주세요.');

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('pid', pid.item(i).value);

        xhr.open('DELETE', "/admin/delete");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
                Cover.hide();
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseObject = JSON.parse(xhr.responseText);//{resut:suceess로 가져온것을 { \n result \t 식으로 만듬}

                    switch (responseObject['result']) {
                        case 'success':
                            alert('상품을 삭제하였습니다.');
                            window.location.reload()
                            break;

                        case 'not_allowed':
                            alert('로그아웃되었거나 권한이 없습니다.');
                            window.location.href = `/member/login`;

                            break;

                        case 'no_such_article':
                            alert('없는 상품입니다.');
                            window.location.reload()


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
