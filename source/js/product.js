
let card = document.getElementById("casual");
let left = document.getElementById("leftsc");
let right = document.getElementById("rightsc");

card.addEventListener("wheel",(evt)=>{

    card.scrollLeft += evt.deltaY;
});

right.addEventListener("click",()=>{
    card.style.scrollBehavior = "smooth"
    card.scrollLeft += 900;
})
left.addEventListener("click",()=>{
    card.style.scrollBehavior = "smooth"

    card.scrollLeft -= 900;
})

window.addEventListener("load",()=>{
    let loader = document.querySelector(".loader");
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend",()=>{
        document.body.removeChild("loader")

    })
})
