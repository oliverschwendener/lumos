// Inject HTML Frame
$("body").append('<div class="lumos-container"><div class="lumos-alt-text"></div><img class="lumos-img" src="" /><svg version="1.1" class="lumos-prev" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 306 306" xml:space="preserve"><g><g id="chevron-right"><polygon points="211.7,306 247.4,270.3 130.1,153 247.4,35.7 211.7,0 58.7,153" /></g></g></svg><svg version="1.1" class="lumos-next" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 306 306" xml:space="preserve"><g><g id="chevron-right"><polygon points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153" /></g></g></svg><svg version="1.1" class="lumos-close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><path d="M512,51.75L460.25,0L256,204.25L51.75,0L0,51.75L204.25,256L0,460.25L51.75,512L256,307.75L460.25,512L512,460.25 L307.75,256L512,51.75z" /></svg><div class="lumos-name"></div><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>');

// Global Variables
var lumosContainer = $(".lumos-container");
var lumosImage = $(".lumos-img");
var altText = $(".lumos-alt-text");
var prevButton = $(".lumos-prev");
var nextButton = $(".lumos-next");
var closeButton = $(".lumos-close");
var linkSelector = ".lumos-link";
var lumosGalleryName = $(".lumos-name");
var allButtons = ".lumos-next, .lumos-prev, .lumos-close, .lumos-alt-text";
var spinner = $(".lumos-container .spinner");
var animationSpeed = 250;
var fadeInSpeed = 750;
var isSingleImage = false;
var isFirst = false;
var isLast = false;

// Click Events
$(linkSelector).click(function (e) {
    e.preventDefault();
    var clickedImage = $(this).attr("href");
    var galleryName = $(this).attr("data-lumos");
    openLumos(clickedImage, galleryName);
});
$(prevButton).click(function () {
    if (isFirst) { return; }
    openLumos(getNextImage("prev"), lumosGalleryName.text());
});
$(nextButton).click(function () {
    if (isLast) { return; }
    openLumos(getNextImage("next"), lumosGalleryName.text());
});
$(closeButton).click(function () {
    closeLumos();
});
lumosContainer.on('click', function(event) {
    if (!$(event.target).closest(lumosImage).length) {
        closeLumos();
    }
});

// Keyboard Events
$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        closeLumos();
    }
    if (e.keyCode == 37) {
        if (isFirst || isSingleImage) { return; }
        openLumos(getNextImage("prev"), lumosGalleryName.text());
    }
    if (e.keyCode == 39) {
        if (isLast || isSingleImage) { return; }
        openLumos(getNextImage("next"), lumosGalleryName.text());
    }
});

// Swipe Gestures
lumosContainer.swipe({
    swipe: function (event, direction) {
        if (direction == "left") {
            if (isLast || isSingleImage) { return; }
            openLumos(getNextImage("next"), lumosGalleryName.text());
        }
        if (direction == "right") {
            if (isFirst || isSingleImage) { return; }
            openLumos(getNextImage("prev"), lumosGalleryName.text());
        }
        if (direction == "up" || direction == "down") {
            closeLumos();
        }
    }
});

// Open
function openLumos(imageToOpen, galleryName) {
    if (typeof galleryName == "undefined") {
        disableButtons([prevButton, nextButton]);
        isSingleImage = true;
    }
    else {
        checkButtons($('[class=lumos-link][href="' + imageToOpen + '"]'), galleryName);
    }

    disableScroll();
    spinner.show();
    lumosContainer.fadeIn(animationSpeed);
    lumosImage.attr("src", imageToOpen);

    lumosContainer.imagesLoaded(function () {
        lumosImage.fadeIn(fadeInSpeed);
    });

    lumosGalleryName.text(galleryName);
    getAltText();
}

// Next
function getNextImage(direction) {
    if (isSingleImage) { return; }
    lumosImage.hide();

    var currentGalleryName = lumosGalleryName.text();
    var currentGallery = $("[data-lumos='" + currentGalleryName + "']");
    var currentImage = lumosImage.attr("src");
    var nextImage;

    for (var i = 0; i < currentGallery.length; i++) {
        if (currentGallery[i].getAttribute("href") == currentImage) {
            if (direction == "next") { i++; }
            if (direction == "prev") { i--; }
            nextImage = currentGallery[i];
            break;
        }
    }

    if (nextImage.getAttribute("data-lumos") != currentGalleryName) {
        return currentImage;
    }

    return nextImage.getAttribute("href");
}

// Close
function closeLumos() {
    enableScroll();
    lumosContainer.fadeOut(animationSpeed);
    lumosImage.attr("src", "");
    lumosGalleryName.text("");
    altText.text("");
    spinner.hide();
    isSingleImage = false;
    isFirst = false;
    isLast = false;
    setTimeout(function () {
        enableButtons([prevButton, nextButton]);
        lumosImage.hide();
    }, animationSpeed);
}

// Disable Buttons
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

// Check Buttons & Last / First
function checkButtons(nextImage, galleryName) {
    var currentGallery = $("[data-lumos='" + galleryName + "']");
    var firstImage = currentGallery[0].getAttribute("href");
    var lastImage = currentGallery[currentGallery.length - 1].getAttribute("href");

    if (nextImage.attr("href") == firstImage) {
        disableButtons([prevButton]);
        isFirst = true;
    }
    else {
        enableButtons([prevButton]);
        isFirst = false;
    }
    if (nextImage.attr("href") == lastImage) {
        disableButtons([nextButton]);
        isLast = true;
    }
    else {
        enableButtons([nextButton]);
        isLast = false;
    }
}

// Get Alt Text
function getAltText() {
    var currentImage = lumosImage.attr("src");
    var currentAltText = $("[href='" + currentImage + "']").children("img").attr("alt");
    if (currentAltText != undefined) {
        altText.html(currentAltText);
    }
}

// Disable Scrolling
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
// End Disable Scrolling
