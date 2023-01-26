

const questButton= window.document.querySelectorAll('.question-button');
const answerRow= window.document.querySelectorAll('.answer');

for (let i = 0; i < questButton.length; i++) {

    questButton.item(i).addEventListener("click",()=>{

        if (answerRow[i].classList.contains('visible')){
            answerRow[i].classList.remove('visible');

        }else answerRow[i].classList.add('visible');



    })

}