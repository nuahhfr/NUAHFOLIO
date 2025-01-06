// Exécute le script une fois que tout le contenu HTML de la page est chargé
document.addEventListener('DOMContentLoaded', function () {
    // Récupère les éléments HTML pour le conteneur principal et les informations de contact
    const container = document.getElementById('Main');
    const contactInfo = document.getElementById('background');

    // Déclare le nombre total d'images disponibles et combien afficher
    const totalPhotos = 267;
    const numberOfPhotosToShow = 20;

    // Initialise un tableau pour stocker les objets Image
    const images = [];

    // Crée un tableau contenant les indices de toutes les photos (de 1 à totalPhotos)
    const photoIndices = Array.from({ length: totalPhotos }, (_, i) => i + 1);

    // Fonction pour mélanger les éléments d'un tableau (algorithme de Fisher-Yates)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Génère un index aléatoire
            [array[i], array[j]] = [array[j], array[i]];  // Échange les éléments
        }
        return array;
    }

    // Mélange les indices des photos pour créer un ordre aléatoire
    shuffle(photoIndices);
    

    // Sélectionne les indices des photos à afficher (les 20 premiers après mélange)
    const selectedIndices = photoIndices.slice(0, numberOfPhotosToShow);

    // Variable pour suivre le nombre d'images chargées
    let imagesLoaded = 0;

    // Précharge les images sélectionnées
    selectedIndices.forEach((index) => {
        const img = new Image(); // Crée une nouvelle image
        img.src = `images/photo${index}.jpg`; // Définit le chemin de l'image
        img.classList.add('image'); // Ajoute une classe CSS pour le style
        img.onload = function () {
            // Incrémente le compteur une fois l'image chargée
            imagesLoaded++;
            // Si toutes les images sont chargées, les afficher
            if (imagesLoaded === numberOfPhotosToShow) {
                displayImages();
            }
        };
        images.push(img); // Ajoute l'image préchargée au tableau
    });

    // Fonction pour créer un conteneur contenant l'image principale, une superposition et un bouton de fermeture
    function createImageContainer(image, x = 0, y =0, size = 100) {
        const div = document.createElement('div'); // Crée un conteneur div
        div.classList.add('image-container'); // Ajoute une classe CSS
        div.style.top = 3+ Math.random() * 45 + 'vh'; // Position verticale aléatoire
        div.style.left = Math.random() * 80 + 'vw'; // Position horizontale aléatoire

        // Crée une image superposée (overlay) avec des paramètres prédéfinis
        const overlayImage = new Image();
        overlayImage.src = 'portrait_vierge.png'; // Chemin vers l'image fixe
        overlayImage.classList.add('overlay-image'); // Ajoute une classe CSS
        overlayImage.style.width = `${422}px`; // Taille fixe
        overlayImage.style.left = `${-20}px`; // Décalage horizontal
        overlayImage.style.top = `${-42}px`; // Décalage vertical

        // Crée un bouton de fermeture
        const closeButton = document.createElement('div');
        closeButton.classList.add('close-button'); // Classe CSS pour le style
        closeButton.textContent = 'XXX'; // Texte du bouton
        closeButton.onclick = function (event) {
            event.stopPropagation(); // Empêche la propagation du clic
            div.remove(); // Supprime le conteneur
            // Si toutes les images sont fermées, réaffiche les infos de contact
            if (container.childElementCount === 0) {
                contactInfo.style.display = 'block';
            }
        };

        // Permet de mettre au premier plan l'image cliquée
        div.onclick = function () {
            const allContainers = document.querySelectorAll('.image-container');
            allContainers.forEach((container) => (container.style.zIndex = 1)); // Passe tout à l'arrière-plan
            div.style.zIndex = 2; // Met l'image cliquée au premier plan
        };

        // Ajoute l'image principale, l'overlay, et le bouton de fermeture au conteneur
        div.appendChild(image);
        div.appendChild(overlayImage);
        div.appendChild(closeButton);
        // Ajoute le conteneur au conteneur principal
        container.appendChild(div);
    }

    // Fonction pour afficher les images
    function displayImages() {
        images.forEach((image, index) => {
            setTimeout(() => {
                // Crée un conteneur pour chaque image avec des paramètres par défaut
                createImageContainer(image, 10, 20, 150);
                // Règle l'opacité pour rendre l'image visible
                document.querySelectorAll('.image-container')[index].style.opacity = 1;
            }, index * 60); // Ajoute un délai pour afficher les images progressivement
        });
    }

    // Fonction pour fermer toutes les images et afficher les infos de contact
    window.closeAllImages = function () {
        const allContainers = document.querySelectorAll('.image-container');
        allContainers.forEach((container) => container.remove()); // Supprime tous les conteneurs
        contactInfo.style.display = 'block'; // Réaffiche les infos de contact
    };
});