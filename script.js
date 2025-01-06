
document.addEventListener('DOMContentLoaded', function () {
 
    const container = document.getElementById('Main');
    const contactInfo = document.getElementById('background');

    
    const totalPhotos = 267;
    const numberOfPhotosToShow = 20;

    
    const images = [];

    
    const photoIndices = Array.from({ length: totalPhotos }, (_, i) => i + 1);

   
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]];  
        }
        return array;
    }

   
    shuffle(photoIndices);
    


    const selectedIndices = photoIndices.slice(0, numberOfPhotosToShow);


    let imagesLoaded = 0;


    selectedIndices.forEach((index) => {
        const img = new Image(); 
        img.src = `images/photo${index}.jpg`; 
        img.classList.add('image'); 
        img.onload = function () {
            imagesLoaded++;
            
            if (imagesLoaded === numberOfPhotosToShow) {
                displayImages();
            }
        };
        images.push(img); 
    });

   
    function createImageContainer(image, x = 0, y =0, size = 100) {
        const div = document.createElement('div'); 
        div.classList.add('image-container');
        div.style.top = 3+ Math.random() * 45 + 'vh'; 
        div.style.left = Math.random() * 80 + 'vw'; 

  
        const overlayImage = new Image();
        overlayImage.src = 'portrait_vierge.png';
        overlayImage.classList.add('overlay-image'); 
        overlayImage.style.width = `${422}px`; 
        overlayImage.style.left = `${-20}px`; 
        overlayImage.style.top = `${-42}px`; 

        
        const closeButton = document.createElement('div');
        closeButton.classList.add('close-button'); 
        closeButton.textContent = 'XXX'; 
        closeButton.onclick = function (event) {
            event.stopPropagation(); 
            div.remove(); 
            if (container.childElementCount === 0) {
                contactInfo.style.display = 'block';
            }
        };

       
        div.onclick = function () {
            const allContainers = document.querySelectorAll('.image-container');
            allContainers.forEach((container) => (container.style.zIndex = 1)); 
            div.style.zIndex = 2; 
        };

        div.appendChild(image);
        div.appendChild(overlayImage);
        div.appendChild(closeButton);
        container.appendChild(div);
    }

    function displayImages() {
        images.forEach((image, index) => {
            setTimeout(() => {
                createImageContainer(image, 10, 20, 150);
                document.querySelectorAll('.image-container')[index].style.opacity = 1;
            }, index * 60); 
        });
    }

    window.closeAllImages = function () {
        const allContainers = document.querySelectorAll('.image-container');
        allContainers.forEach((container) => container.remove());
        contactInfo.style.display = 'block';
    };
});