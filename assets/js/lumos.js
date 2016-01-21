// Inject HTML Frame
$("body").append('<div class="lumos-container"><div class="img-alt-text"></div><img src="" /><svg version="1.1" class="lumos-prev" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 306 306" xml:space="preserve"><g><g id="chevron-right"><polygon points="211.7,306 247.4,270.3 130.1,153 247.4,35.7 211.7,0 58.7,153" /></g></g></svg><svg version="1.1" class="lumos-next" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 306 306" xml:space="preserve"><g><g id="chevron-right"><polygon points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153" /></g></g></svg><svg version="1.1" class="lumos-close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><path d="M512,51.75L460.25,0L256,204.25L51.75,0L0,51.75L204.25,256L0,460.25L51.75,512L256,307.75L460.25,512L512,460.25 L307.75,256L512,51.75z" /></svg><div class="lumos-name"></div></div>');

// Global Variables
var lumosContainer = $(".lumos-container");
var lumosImage = $(".lumos-container img");
var prevButton = $(".lumos-prev");
var nextButton = $(".lumos-next");
var closeButton = $(".lumos-close");
var linkSelector = ".lumos-link";
var lumosGalleryName = $(".lumos-name");
var allButtons = ".lumos-next, .lumos-prev, .lumos-close";
var animationSpeed = 250;
var mouseIsOnImage = false;
var isSingleImage = false;

// Click Events
$(linkSelector).click(function (e) {
    e.preventDefault();
    var clickedImage = $(this).attr("href");
    var galleryName = $(this).children().attr("data-lumos");
    openLumos(clickedImage, galleryName);
});
$(prevButton).click(function () {
    openLumos(getNextImage("prev"), lumosGalleryName.text());
});

$(nextButton).click(function () {
    openLumos(getNextImage("next"), lumosGalleryName.text());
});

$(closeButton).click(function () {
    closeLumos();
});
lumosContainer.click(function () {
    if (!mouseIsOnImage) {
        closeLumos();
    }
});

// Keyboard Events
$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        closeLumos();
    }
    if (e.keyCode == 39) {
        if (isSingleImage) { return; }
        openLumos(getNextImage("next"), lumosGalleryName.text());
    }
    if (e.keyCode == 37) {
        if (isSingleImage) { return; }
        openLumos(getNextImage("prev"), lumosGalleryName.text());
    }
});
    
// Mouse Enter / Leave Events
lumosImage.mouseenter(function () {
    mouseIsOnImage = true;
});
lumosImage.mouseleave(function () {
    mouseIsOnImage = false;
});
$(allButtons).mouseenter(function () {
    mouseIsOnImage = true;
});
$(allButtons).mouseleave(function () {
    mouseIsOnImage = false;
});

// Swipe Gestures
lumosContainer.swipe({
    swipe: function (event, direction) {
        if (direction == 'left') {
            openLumos(getNextImage("next"), lumosGalleryName.text());
        }
        if (direction == 'right') {
            openLumos(getNextImage("prev"), lumosGalleryName.text());
        }
        if (direction == 'up' || direction == 'down') {
            closeLumos();
        }
    }
});

// Functions
function openLumos(imageToOpen, galleryName) {
    if (typeof galleryName == "undefined") {
        disableButtons([prevButton, nextButton]);
        isSingleImage = true;
    }
    else {
        checkButtons($('[class=lumos-link][href="' + imageToOpen + '"]'), galleryName);
    }

    lumosContainer.fadeIn(animationSpeed);
    lumosImage.attr("src", imageToOpen);
    lumosGalleryName.text(galleryName);
}

function getNextImage(direction) {
    var currentGalleryName = lumosGalleryName.text();
    var currentImage = lumosImage.attr("src");
    var nextImage;

    if (direction == "next") {
        nextImage = $('[data-lumos="' + currentGalleryName + '"][src="' + currentImage + '"]').parent().next(".lumos-link");
    }
    if (direction == "prev") {
        nextImage = $('[data-lumos="' + currentGalleryName + '"][src="' + currentImage + '"]').parent().prev(".lumos-link");
    }

    checkButtons(nextImage, currentGalleryName);

    if (nextImage.children("img").attr("data-lumos") != currentGalleryName) {
        return currentImage;
    }

    return nextImage.attr("href");
}

function closeLumos() {
    lumosContainer.fadeOut(animationSpeed);
    lumosImage.attr("src", "");
    lumosGalleryName.text("");
    isSingleImage = false;
    setTimeout(function () {
        enableButtons([prevButton, nextButton]);
    }, animationSpeed);
}

function disableButtons(buttons) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].hide();
    }
}

function enableButtons(buttons) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].show();
    }
}

function checkButtons(nextImage, galleryName) {
    var currentGallery = $("[data-lumos='" + galleryName + "']");
    var firstImage = currentGallery[0].getAttribute("src");
    var lastImage = currentGallery[currentGallery.length - 1].getAttribute("src");

    if (nextImage.attr("href") == firstImage) {
        disableButtons([prevButton]);
    }
    else {
        enableButtons([prevButton]);
    }
    if (nextImage.attr("href") == lastImage) {
        disableButtons([nextButton]);
    }
    else {
        enableButtons([nextButton]);
    }
}