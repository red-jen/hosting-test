const showCards = document.querySelector('.show-cards');
const btnShop = document.querySelectorAll('.btn-shop');

for (btn of btnShop) {
            
    btn.addEventListener('click', () => {
        showCards.classList.toggle('show')
    })
}