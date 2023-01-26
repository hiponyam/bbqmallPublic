

let imageButton= window.document.querySelectorAll('.image-select-button');
let images= window.document.querySelectorAll('.images');
let imageContainer=window.document.querySelectorAll('.image-container');
let noImage= window.document.querySelectorAll('.no-image');
let detailIndex;
window.document.getElementById('sideBarC').style.cssText=`color: rgba(0,0,0,0.9);
    font-weight: 700;`;

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

        e.preventDefault();
        images.item(i).click();
    })



    images.item(i).addEventListener('input', () => {
        const imageContainerElement = imageContainer.item(i);
        imageContainerElement.querySelectorAll('img.image').forEach(x => x.remove());
        if (images.item(i).files.length > 0) {
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
    history.back();

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
    if(form['onSale'].checked &&(form['amount'].value === '' ||  parseInt(form['amount'].value)===0)){
        alert("상품 재고가 없습니다.");
        return;

    }
    if(form['detailIndex1'].value!=='0'){detailIndex=form['detailIndex1'].value};
    if(form['detailIndex2'].value!=='0'){detailIndex=form['detailIndex2'].value};
    if(form['detailIndex3'].value!=='0'){detailIndex=form['detailIndex3'].value};


    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('detailIndex',  detailIndex );
    formData.append('productName',form['productName'].value);
    formData.append('price',form['price'].value);
    formData.append('content',form['content'].value);
    formData.append('amount', form['amount'].value?form['amount'].value:0);
    formData.append('onSale',form['onSale'].checked?1:0);
    formData.append('saleQuantity',form['saleQuantity'].value);
    for (let file of form['images'].files) {
        formData.append('images', file);
    }
    for (let file of form['detailImages'].files) {
        formData.append('detailImages', file);
    }

    xhr.open('POST', './create');//  window.location.href 를쓰면 boardid bid를 안보내도댐

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {//4 성공인게 아니고 작업의끝
            Cover.hide();
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);//{resutl:suceess로 가져온것을 { \n result \t 식으로 만듬}

                switch (responseObject['result']) {
                    case 'success':

                        alert('상품 등록 성공');

                        window.location.href=`./`

                        break;

                    case 'not_signed':
                        alert('로그인이 되었는지 확인후 다시 시도해 주세요.');
                        break;

                    case 'not_allowed':
                        alert('권한이 없습니다.');
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


