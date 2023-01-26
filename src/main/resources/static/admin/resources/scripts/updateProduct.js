let imageButton= window.document.querySelectorAll('.image-select-button');
let images= window.document.querySelectorAll('.images');
let imageContainer=window.document.querySelectorAll('.image-container');
let noImage= window.document.querySelectorAll('.no-image');
let nowNoImage= window.document.querySelectorAll('.now-no-image');
let detailIndex;
let nowDetailIndex = form['nowDetailIndex'].value;
let imageChange=0; //이미지를 새로 넣었는가? 0:변경없음 1:새로 넣음 2:모두 지움
let detailImageChange=0; //이미지를 새로 넣었는가? 0:변경없음 1:새로 넣음 2:모두 지움

window.document.getElementById('sideBarRUD').style.cssText=`color: rgba(0,0,0,0.9);
    font-weight: 700;`;

if (nowDetailIndex<6){
    form['menuIndex'].value=1;
    form['detailIndex1'].style.display="inline-block"
    form['detailIndex2'].style.display="none"
    form['detailIndex1'].value=nowDetailIndex;
    form['detailIndex2'].value=0;
    form['detailIndex3'].style.display="none"
    form['detailIndex3'].value=0;
    detailIndex=nowDetailIndex;
}
else if (nowDetailIndex>5 && nowDetailIndex<12){
    form['menuIndex'].value=2;
    form['detailIndex2'].style.display="inline-block"
    form['detailIndex1'].style.display="none"
    form['detailIndex2'].value=nowDetailIndex;
    form['detailIndex1'].value=0;
    form['detailIndex3'].style.display="none"
    form['detailIndex3'].value=0;
    detailIndex=nowDetailIndex;

}
else {
    form['menuIndex'].value=3;
    form['detailIndex3'].style.display="inline-block"
    form['detailIndex2'].style.display="none"
    form['detailIndex3'].value=nowDetailIndex;
    form['detailIndex2'].value=0;
    form['detailIndex1'].style.display="none"
    form['detailIndex1'].value=0;
    detailIndex=nowDetailIndex;

}

form['menuIndex'].addEventListener('change', ()=>{



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


for (let i=0; i< imageButton.length; i++){
    imageButton.item(i).addEventListener("click",(e)=>{
        if(!confirm("기존 상품 이미지가 있다면 모두 삭제됩니다.\n이후 되돌리고 싶다면 새로고침 후 진행해야 합니다.\n진행 하시겠습니까?")){
            return ;
        }
        e.preventDefault();
        if (i===0){imageChange=1;}
        if (i===1){detailImageChange=1;}
        const imageContainerElement = imageContainer.item(i);
        imageContainerElement.querySelectorAll('img.image').forEach(x => x.remove());
        images.item(i).click();
    })



    images.item(i).addEventListener('input', () => {
        const imageContainerElement = imageContainer.item(i);

        if (images.item(i).files.length > 0) {
            nowNoImage.item(i).setAttribute("hidden",1);
            noImage.item(i).setAttribute("hidden",1);

        } else {
            noImage.item(i).removeAttribute('hidden');


        }

        for (let file of images.item(i).files) {
            const imageSrc = URL.createObjectURL(file);
            const imgElement = document.createElement('img');
            imgElement.classList.add('image');
            imgElement.setAttribute('src', imageSrc);
            imageContainerElement.append(imgElement);
        }

    });

}
//사진첨부를 눌렀을때

form['back'].addEventListener("click",()=>{
    window.location.href=`/admin/`

});

form['submit'].addEventListener("click",()=>{

    if(form['menuIndex'].value==='0'){
        alert("상품 카테고리를 선택해주세요.");
        return;

    }
    if(form['menuIndex'].value!=='0'){
        if(form['detailIndex1'].value==='0'&&
            form['detailIndex2'].value==='0'&&
            form['detailIndex3'].value==='0'){
            alert("상품 상세 메뉴를 선택해주세요.");
            return;

        }

    }

    if(form['productName'].value===''){
        alert("상품 이름을 입력해주세요.");
        return;

    }
    if(form['price'].value===''||  parseInt(form['price'].value)===0){
        alert("상품 가격을 입력해주세요.");
        return;

    }
    if(form['onSale'].checked && (form['amount'].value === '' ||  parseInt(form['amount'].value)===0)){
        alert("상품 재고가 없습니다.");
        return;

    }
    if(form['detailIndex1'].value!=='0'){detailIndex=form['detailIndex1'].value};
    if(form['detailIndex2'].value!=='0'){detailIndex=form['detailIndex2'].value};
    if(form['detailIndex3'].value!=='0'){detailIndex=form['detailIndex3'].value};

    Cover.show('상품정보를 업데이트중 입니다.');


    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('productIndex',form['productIndex'].value)
    formData.append('detailIndex',  detailIndex );
    formData.append('productName',form['productName'].value);
    formData.append('price',form['price'].value);
    formData.append('content',form['content'].value);
    formData.append('amount',form['amount'].value?form['amount'].value:0);
    formData.append('onSale',form['onSale'].checked?1:0);
    formData.append('saleQuantity',form['saleQuantity'].value);
    formData.append('imageChange',imageChange);
    formData.append('detailImageChange',detailImageChange);

    for (let file of form['images'].files) {
        formData.append('images', file);
    }
    for (let file of form['detailImages'].files) {
        formData.append('detailImages', file);
    }

    xhr.open('PATCH', './update');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
            Cover.hide();
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);//{resutl:suceess로 가져온것을 { \n result \t 식으로 만듬}

                switch (responseObject['result']) {
                    case 'success':

                        alert('상품 수정 성공');

                        window.location.href=`/admin/read/?menuIndex=99`;


                        break;

                    case 'not_signed':
                        alert('로그인이 되었는지 확인후 다시 시도해 주세요.');
                        break;

                    case 'not_allowed':
                        alert('권한이 없습니다.');
                        break;

                    default:
                        alert('알 수 없는 이유로 상품을 수정하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
                }
            } else {
                alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.')
            }
        }
    }
    xhr.send(formData);





})


