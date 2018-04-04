(() => {
    document.body.innerHTML += `<div id="lumos-container">
                                    <img src="" id="lumos-image">
                                </div>`;

    const lumosContainer = document.getElementById('lumos-container');
    const lumosImage = document.getElementById('lumos-image');
    const elements = document.querySelectorAll('[data-action="lumos"]');
    const transitionSpeedInMilliseconds = 250;

    window.addEventListener('keyup', (event) => {
        if (event.key === 'Escape') {
            hideLumos();
        }
    });

    elements.forEach((element) => {
        element.addEventListener('click', () => {
            handleElementClick(element);
        });
    });

    lumosContainer.addEventListener('click', hideLumos);

    function handleElementClick(htmlElement) {
        updateLumosImage(getImageUrl(htmlElement));
        showLumos();
    }

    function getImageUrl(htmlElement) {
        return htmlElement.attributes['data-lumos-src'] === undefined
            ? htmlElement.attributes['src'].value
            : htmlElement.attributes['data-lumos-src'].value;
    }

    function updateLumosImage(imageUrl) {
        lumosImage.attributes['src'].value = imageUrl;
    }

    function showLumos() {
        if (!lumosContainerIsVisible()) {
            lumosContainer.classList.remove('hidden');
            lumosContainer.classList.add('visible');
        }
    }

    function hideLumos() {
        if (lumosContainerIsVisible()) {
            lumosContainer.classList.add('hidden');

            setTimeout(() => {
                lumosContainer.classList.remove('visible');
                lumosContainer.classList.remove('hidden');
                lumosImage.attributes['src'].value = '';
            }, transitionSpeedInMilliseconds);
        }
    }

    function lumosContainerIsVisible() {
        return lumosContainer.classList.contains('visible');
    }
})();