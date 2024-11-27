function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function toggleDescription(button) {
  const container = button.closest('.details-container');
  const img = container.querySelector('.project-img');
  const description = container.querySelector('.project-description');
  
  if (img.style.display !== 'none') {
    img.style.display = 'none';
    description.style.display = 'block';
    button.textContent = 'Voir image';
  } else {
    img.style.display = 'block';
    description.style.display = 'none';
    button.textContent = 'Description';
  }
} 

// Ajouter ces variables au début du fichier
let currentProject = "";
let currentImageIndex = 0;
let projectImages = {};

// Fonction pour charger les images d'un projet
async function loadProjectImages(projectName) {
    try {
        const response = await fetch(`./assets/${projectName}/manifest.json`);
        const data = await response.json();
        projectImages[projectName] = data.images;
        return data.images;
    } catch (error) {
        console.error("Erreur de chargement des images:", error);
        return [];
    }
}

// Fonction pour ouvrir le modal
async function openImageModal(projectImg) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const projectContainer = projectImg.closest(".details-container");
    const projectTitle = projectContainer
        .querySelector(".project-title")
        .textContent.toLowerCase();

    currentProject = projectTitle;
    currentImageIndex = 0;

    if (!projectImages[currentProject]) {
        await loadProjectImages(currentProject);
    }

    if (
        projectImages[currentProject] &&
        projectImages[currentProject].length > 0
    ) {
        modalImg.src = `./assets/${currentProject}/${projectImages[currentProject][0]}`;
        modal.style.display = "block";
    }
}

// Navigation dans le carrousel
function changeImage(direction) {
    if (!projectImages[currentProject]) return;

    const images = projectImages[currentProject];
    currentImageIndex =
        (currentImageIndex + direction + images.length) % images.length;

    const modalImg = document.getElementById("modalImage");
    modalImg.src = `./assets/${currentProject}/${images[currentImageIndex]}`;
}

// Ajouter les écouteurs d'événements
document.addEventListener("DOMContentLoaded", function () {
    // Fermer le modal
    const modal = document.getElementById("imageModal");
    const closeBtn = document.querySelector(".close");
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Clic en dehors du modal
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Navigation
    document.querySelector(".prev").onclick = () => changeImage(-1);
    document.querySelector(".next").onclick = () => changeImage(1);

    // Ajouter le clic sur les images de projet
    const projectImages = document.querySelectorAll(".project-img");
    projectImages.forEach((img) => {
        img.onclick = function () {
            openImageModal(this);
        };
    });
});

function toggleDescription(button) {
    const container = button.closest(".details-container");
    const img = container.querySelector(".project-img");
    const description = container.querySelector(".project-description");

    if (img.style.display !== "none") {
        img.style.display = "none";
        description.style.display = "block";
        button.textContent = "Voir image";
    } else {
        img.style.display = "block";
        description.style.display = "none";
        button.textContent = "Description";
    }
}