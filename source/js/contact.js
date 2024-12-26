
let sendBtn = document.getElementById("send");

sendBtn.addEventListener("click",e=>sendInput(e));

function sendInput(e){
    e.preventDefault();
    let inputName = document.getElementById("name");
    let inputEmail = document.getElementById("email");
    let inputSubject= document.getElementById("subject");
    let inputMessage = document.getElementById("message");
    inputName.value = inputEmail.value = inputSubject.value = inputMessage.value =""
}