searchText = window.document.getElementById('searchText');

const Cover = {
    show:(text) =>{
        const cover=window.document.getElementById('cover');
        cover.querySelector('[rel="text"]').innerText= text;
        cover.classList.add('visible');

    },
    hide:()=>{
        window.document.getElementById('cover').classList.remove('visible');
    }
};
window.document.getElementById('searchButton').addEventListener("click",()=>{


    window.location.href=`/search?keyword=${searchText.value}`
})

window.onsubmit=e => {
    e.preventDefault();
}


const topButton= window.document.getElementById('topButton');


topButton.addEventListener("click",()=>{window.scroll({top:0, behavior: "smooth"});});

window.addEventListener("scroll", () =>{ window.scrollY > 500 ? topButton.style.opacity = 1 : topButton.style.opacity = 0});