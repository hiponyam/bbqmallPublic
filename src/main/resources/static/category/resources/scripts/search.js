keyword= window.document.getElementById('keyword');
mainForm= window.document.getElementById('mainForm');
mainForm.onsubmit=()=>{

    window.location.href=`/search?keyword=${keyword.value}`;

};