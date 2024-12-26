document.addEventListener('DOMContentLoaded', function() {
    const colorThumbnails = document.querySelectorAll('.thumbnail-card');
    const mainImage = document.getElementById('mainImage');
    const thumbnailsStrip = document.querySelector('.thumbnails-strip');
    const scrollContainer = document.getElementById('scrollContainer');
    const addedProducts = document.querySelector('.added-products');
    
    const url = window.location.href;
    const sneakerId = url.split('?id=').pop();

    const sneakerTitle = document.querySelector('.product-info h1');
    const sneakerPrice = document.getElementById('price');

    function updateSideViews(sideImages) {
        if (!thumbnailsStrip) return;
        
        thumbnailsStrip.innerHTML = '';
        
        sideImages.forEach((imageSrc) => {
            const thumbnailItem = document.createElement('div');
            thumbnailItem.className = 'thumbnail-item object-contain cursor-pointer';
            thumbnailItem.innerHTML = `
                <div class="thumbnail-container object-contain sm:w-[126px] sm:h-[95px] bg-gray-100 rounded-lg flex items-center justify-center scroll-snap-start overflow-hidden">
                    <img src="${imageSrc}" alt="Side View" 
                         class="w-[90px] object-contain transform overflow-hidden">
                </div>
            `;

            thumbnailItem.addEventListener('click', () => {
                mainImage.src = imageSrc;
                mainImage.classList.add('side-view');
                
                document.querySelectorAll('.thumbnail-item').forEach(item => {
                    item.classList.remove('active');
                });
                thumbnailItem.classList.add('active');
            });

            thumbnailsStrip.appendChild(thumbnailItem);
            mainImage.classList.remove('side-view');
        });
    }

    function updateModelSneakers(sneakers, currentBrand) {
        if (!scrollContainer) return;
        
        scrollContainer.innerHTML = '';
        
        const brandSneakers = sneakers.filter(s => s.brand && s.brand.toLowerCase() === currentBrand.toLowerCase());
        
        brandSneakers.forEach((sneaker) => {
            const scrollItem = document.createElement('div');
            
            scrollItem.innerHTML = `
                <div class="min-w-[262px] h-[195px] bg-gray-100 rounded-lg flex items-center justify-center">
                 <img src="${sneaker.image}" alt="${sneaker.name}"
                        class="w-full h-full object-contain cursor-pointer p-4">
                </div>
            `;
    
           scrollItem.addEventListener('click', () => {
                window.location.href = `#${sneaker.id}`;

                const selectSneaker = sneakers.find(a => a.id === sneaker.id)

                if(selectSneaker) {
                    updateProductInfo(selectSneaker);
                    updateSideViews(selectSneaker.sides[0].Images)

                    if(mainImage) {
                        mainImage.src = selectSneaker.sides[0].main
                    }

                    updateModelSneakers(sneakers, selectSneaker.brand)
                   
                    colorx(selectSneaker)
                }
            });
    
            scrollContainer.appendChild(scrollItem);
            
        });
    }

    function updateProductInfo(sneaker) {
        if (sneakerTitle) {
            sneakerTitle.textContent = sneaker.model;
        }
        if (sneakerPrice) {
            sneakerPrice.textContent = `$${sneaker.price.toFixed(2)}`;
        }
    }
    function colorx(sneakerItem){
        colorThumbnails.forEach((thumbnail, index) => {
            if (sneakerItem.sides[index]) {
                thumbnail.src = sneakerItem.sides[index].main;
            }
            
            thumbnail.addEventListener('click', function() {
                colorThumbnails.forEach(thumb => {
                    thumb.closest('div').classList.remove('border-teal-500');
                });
                
                this.closest('div').classList.add('border-teal-500');
                
                if (mainImage && sneakerItem.sides[index]) {
                    mainImage.src = sneakerItem.sides[index].main;
                    updateSideViews(sneakerItem.sides[index].Images);
                }
            });
        });
    }


    fetch('/source/api/products.json')
        .then(response => response.json())
        .then(data => {

            let sneakerData = data.data.sneakers
            const sneaker = data.data.sneakers.find(s => s.id.toString() === sneakerId);
            
            
            if (!sneaker) {
                console.error('Sneaker not found');
                return;
            }
            
            let localCards = JSON.parse(localStorage.getItem('addCardsToLocal')) || []

            sneakerData.forEach(data => {

                for (let i = 0; i < localCards.length; i++) {
                    const element = localCards[i];
                    
                    if(data.id == element) {
                        addedProducts.innerHTML += `<div class="h-[190px] md:h-[360px] w-fit grid grid-rows-3 contain-content rounded-lg">
                        <div class="row-span-2 flex items-center justify-center">
                            <img src="${data.image}" class="w-fit h-fit object-contain" alt="">
                        </div>
                        <div
                            class=" bg-gradient-to-t from-zinc-800 to-gray-400 text-zinc-300 flex flex-col items-start pl-2 justify-center sm:h-fit md:h-auto ">
                            <a href="../pages/shop.html?id=${data.id}">
                                <h2 class="text-xs sm:text-sm md:text-2xl">${data.name}</h2>
                            </a>
                            <h2 class="TT p-0 text-xs sm:text-sm md:text-xl md:text-wrap  ">Club Fleece
                                Pantalon de jogging pour ado</h2>
                            <h2 class="text-xs sm:text-sm md:text-2xl">$${data.price}</h2>
                        </div>
                    </div>`
                    }
                }
            })
            
            
            updateProductInfo(sneaker);

            // Update the sneakers section with same brand sneakers
            updateModelSneakers(data.data.sneakers, sneaker.brand);
            colorx(sneaker)
            
            console.log(sneaker);
            
            
            if (sneaker.sides[0]) {
                if (mainImage) {
                    mainImage.src = sneaker.sides[0].main;
                }
                updateSideViews(sneaker.sides[0].Images);
            }
            
            
        })
        .catch(error => {
            console.error('Error loading sneaker data:', error);
        });
});