const mainHeadline = document.querySelector('#main-headline');

const words = "Driven by creativity, powered by passion, we strive to make a lasting impact.".split(" ");

let counter = 0;
for (let i = 0; i < words.length; i++) {
    let div = document.createElement('div');
    div.style.display = "inline-block";
    let f = words[i].split('');
    mainHeadline.append(div);

    for(let y = 0; y < f.length; y++) {
        let span = document.createElement('span');
        span.innerHTML = f[y];
        span.className = "animated-letter";
        span.style.animationDelay = (counter++ * 0.05) + 1 + "s";
        div.append(span);
    }

    div.innerHTML += "&nbsp;";

}

console.log(words.length);

setTimeout(() => {
    let explore = document.createElement('a');
    explore.href="#about-body";
    explore.type="button";
    explore.className="absolute bottom-10 left-1/2 -translate-x-1/2 text-teal-600 text-xl md:text-2xl font-bold text-center animated-slide-up";

    explore.innerHTML = `<span>Explore More</span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5 md:w-6 md:h-6 fill-teal-600 mx-auto mt-3 animated-bounce"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"/></svg>`

    mainHeadline.parentElement.after(explore);

}, (counter * 50) + 1000);
