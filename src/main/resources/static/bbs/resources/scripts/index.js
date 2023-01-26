// window.document.querySelector('.floating-banner').style.top= "90%";
window.addEventListener("scroll", () =>{
    let height = window.scrollY

    if (height>400 && height <=1000){
        window.document.querySelector('.floating-banner').style.top= ""+ 500- height+"px" }
    if (height<=400){
        window.document.querySelector('.floating-banner').style.top= "80%" }

    else {
        window.document.querySelector('.floating-banner').style.top= "40%" }


})