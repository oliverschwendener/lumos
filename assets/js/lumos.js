let lumosContainer = document.getElementById('lumos-container');
let lumosImage = document.getElementById('lumos-image');
let elements = document.querySelectorAll('[data-action="lumos"]');

document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
        hideLumos();
    }
});

elements.forEach((element) => {
    element.addEventListener('click', () => {
        handleElementClick(element);
    });
});

lumosContainer.addEventListener('click', (event) => {
    hideLumos();
});

function handleElementClick(element) {
    showLumos();

    let imageUrl = element.attributes['data-lumos-src'] === undefined
        ? element.attributes['src'].value
        : element.attributes['data-image-url'].value;

    updateLumosImage(imageUrl);
}

function updateLumosImage(imageUrl) {
    lumosImage.attributes['src'].value = imageUrl;
}

function showLumos() {
    if (!lumosContainer.classList.contains('visible')) {
        lumosContainer.classList.add('visible');
    }

    disableScroll();
}

function hideLumos() {
    if (lumosContainer.classList.contains('visible')) {
        lumosContainer.classList.remove('visible');
    }

    enableScroll();
}

function disableScroll() {
    if (!document.body.classList.contains('scroll-disabled')) {
        document.body.classList.add('scroll-disabled')
    }
}

function enableScroll() {
    if (document.body.classList.contains('scroll-disabled')) {
        document.body.classList.remove('scroll-disabled');
    }
}