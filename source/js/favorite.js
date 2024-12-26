const recommendedList = document.getElementById('recommended-list');
const favoriteList = document.getElementById('favorite-list-items');
const alerts = document.getElementById('alerts');
let dataList;
let pageNumber = 0;
let favItems = [];


fetch('/source/api/products.json')
.then(response => response.json())
.then(response => {
    dataList = response.data.sneakers;
    let dataAvailable = [];
    let i = 0;

    if(localStorage.getItem('favList')) {
        favItems = localStorage.getItem('favList').split('-');
        favItems.pop();
        favItems.shift();
    } else {
        localStorage.setItem('favList', '-');
    }

    dataList.forEach(element => {
        if (!favItems.includes('' + element.id)) {
            dataAvailable.push(element);
        }
    });

    while(i < 3 && dataAvailable.length > 0) {
        let randomNumber = Math.floor(Math.random() * dataAvailable.length);

        let div = document.createElement('div');
        div.className = "md:mx-auto xl:pe-0 w-full h-full";

        div.innerHTML = 
            `<div class="border-l-4 border-teal-600 p-6 rounded-r-lg shadow-lg bg-white relative h-full flex flex-col justify-between">

                <button type="button" class="absolute top-5 right-5" data-id="${dataAvailable[randomNumber].id}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart fill-teal-400 w-6 h-6" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg>
                </button>

                <div class="flex lg:flex-col lg:text-center xl:flex-row xl:text-left items-center gap-4">
                    <img src="${dataAvailable[randomNumber].image}" alt="" class="w-20 rounded-md">
                    <div>
                        <a href="#" class="mb-1 text-lg font-semibold block hover:text-teal-600 transition-colors name">${dataAvailable[randomNumber].model}</a>
                        <span class="text-gray-500">${dataAvailable[randomNumber].gender.join(' / ')}</span>
                    </div>
                </div>

                <p class="my-7 text-gray-700 font-medium">${dataAvailable[randomNumber].description}</p>

                <div class="flex justify-between items-center">
                    <span class="font-semibold text-gray-500">${dataAvailable[randomNumber].brand}</span>
                    <h3 class="text-xl font-bold text-teal-600">${dataAvailable[randomNumber].price}$</h3>
                </div>
            </div>`;
        recommendedList.append(div);

        div.querySelector('button').addEventListener('click', addToFavorite);

        dataAvailable.splice(randomNumber, 1);

        i++;
    }

    updatePagesCount();
    updateFavoriteList(pageNumber);
})
.catch(error => console.log(error));


function addToFavorite() {
    let id = this.dataset.id;
    let name = this.nextElementSibling.querySelector('.name').textContent;
    if (!this.classList.contains('added-fav')) {
        this.classList.add('added-fav');
        this.innerHTML = 
            `<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-heart-fill fill-red-500 w-6 h-6" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"></path>
            </svg>`;
        
        localStorage.setItem('favList', `-${id}${localStorage.getItem('favList')}`)
        favItems.unshift(id);
        createAlert(name, 'Added to favorite');
        pageNumber = 0;
        updatePagesCount();
        updateFavoriteList()
    } else {
        this.classList.remove('added-fav');
        this.innerHTML = 
        `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart fill-teal-400 w-6 h-6" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg>`
        localStorage.setItem('favList', localStorage.getItem('favList').replace('-' + id + '-', '-'))
        favItems.splice(favItems.indexOf(id), 1);
        createAlert(name, 'Removed from favorite');
        updatePagesCount();
        updateFavoriteList(pageNumber)
    }
    
}

function updateFavoriteList(page = 0) {
    favoriteList.innerHTML = '';
    if (favItems.length == 0) {
        let div = document.createElement('div');
        div.className = "p-7 pb-0 text-center col-span-2 text-lg text-gray-600";
        div.innerHTML = "<p>List of favorite is empty, please add products to appear here.</p>";
        favoriteList.appendChild(div);
    }
    for (let i = page * 6; i < favItems.length; i++) {
        if (i == (page + 1) * 6) {
            break;
        }
        let item = dataList[+favItems[i] - 1];

        let div = document.createElement('div');
        div.dataset.id = item.id;

        div.className = "border rounded-lg shadow-md px-5 py-6 bg-white transition-opacity duration-500";
        div.innerHTML = 
            `<div class="flex xl:flex-col xl:text-center gap-6 items-center">
                <img class="w-24 sm:w-32 md:w-24 xl:w-44 rounded-lg" src="${item.image}" alt="">
                <div class="flex flex-col gap-2">
                    <a href="#" class="text-xl text-teal-600 font-bold name">${item.model}</a>
                    <b>${item.brand}</b>
                </div>
            </div>
            
            <p class="text-center text-lg text-gray-600 my-8">${item.description}</p>

            <div class="flex justify-between items-center flex-wrap gap-3">
                <h3 class="text-teal-600 font-bold text-lg">${item.price}$</h3>
                <div class="flex items-center gap-3">
                    <button type="button" class="fav-icon inline-flex justify-center items-center border border-gray-300 rounded-full w-9 h-9 hover:bg-gray-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" class="bi bi-heart-fill relative top-0.5 fill-red-500" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                        </svg>
                        <span class="sr-only">Heart Icon</span>
                    </button>
                    <button type="button" class="w-36 h-12 font-semibold bg-teal-400 hover:bg-teal-600 hover:text-white transition-colors rounded-lg">Add to Cart</button>
                </div>
            </div>
        </div>`;

        div.querySelector('.fav-icon').addEventListener('click', function () {
            div.style.opacity = 0;
            createAlert(div.querySelector('.name').textContent, 'Remove from favorite');
            localStorage.setItem('favList', localStorage.getItem('favList').replace('-' + div.dataset.id + '-', '-'));
            favItems.splice(favItems.indexOf(div.dataset.id), 1);
            this.remove();
            setTimeout(() => {
                div.remove();
                updatePagesCount();
                updateFavoriteList(pageNumber)
            }, 480)
        });

        favoriteList.append(div)
    }
}

function createAlert(title, msg) {
    let div = document.createElement('div');
    div.className = 'animated-alert-fadein w-80 bg-gray-700 text-white p-4 rounded-lg text-center shadow-xl mt-3';
    div.innerHTML = 
    `<h2 class="mb-2 text-lg font-bold">${title}</h2>
    <p>${msg}</p>`;
    alerts.append(div);

    setTimeout(() => {
        div.classList.remove('animated-alert-fadein')
        div.classList.add('animated-alert-fadeout')
    }, 3000)
    setTimeout(() => {
        div.remove();
    }, 3450)
}

let pagination = document.getElementById('pagination');

function updatePagesCount() {
    pagination.innerHTML = '';
    let pagesCount = Math.ceil(favItems.length / 6) + 1;
    for (let i = 1; i < pagesCount; i++) {
        let button = document.createElement('button');
        button.type = "button";
        button.className = "border-teal-400 hover:border-teal-600 transition-colors";
        button.textContent = i;

        pagination.appendChild(button);

        button.addEventListener('click', function () {
            const siblings = this.parentElement.querySelectorAll('button');
            for (let page of siblings) {
                page.classList.remove('active', 'bg-teal-200', 'border-teal-600');
            }
            this.classList.add('active', 'bg-teal-200', 'border-teal-600');
            pageNumber = button.textContent.trim() - 1;
            updateFavoriteList(button.textContent.trim() - 1);
        });
    }
    if (pagesCount > 1) {
        pageNumber = pageNumber + 1 == pagesCount ? pagesCount - 2: pageNumber;
        pagination.children[pageNumber].classList.add('active', 'border-teal-600', 'bg-teal-200');
    }
}