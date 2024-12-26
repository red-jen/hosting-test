const header = document.querySelector('header')
const changeImg = document.querySelector('#changeImg')

console.log(changeImg);


window.addEventListener('scroll', () => {
    let scrollDown = window.scrollY

    console.log(scrollDown);
    
    if(scrollDown < 20) {
        header.classList.remove('bg-[#effffd]', 'text-black')
        changeImg.src = "./source/img/logo_shoes-removebg-preview.png"
    } else {
        header.classList.add('bg-[#effffd]', 'text-black')
        changeImg.src = "./source/img/logo_shoes-removebg-preview__1_-Photoroom-removebg-preview.png"
    }
})