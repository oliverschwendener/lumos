# Lumos

## What is it?
Lumos.js is a simple jQuery Plugin to add an image overlay to your website.
Perfect for single images and image galleries!

## Why use it?
* easy to use
* easy to customize
* lightweight (total 25KB)
* responsive
* touch gestures
* only vector icons

## Demo
Check out the [Official Website](http://lumos.oliverschwendener.ch)

## Requirements
* The only requirement is [jQuery](https://jquery.com/)

## Usage
1. Link the `lumos.css` file before your own stylesheets
``` html
<head>
    ...
    <link rel="stylesheet" href="css/lumos.css">
    <link rel="stylesheet" href="css/your-stylesheets.css">>
</head>
```

2. Link the `lumos-min.js` file before the closing tag of your body after jQuery
``` html
    ...
    <script src="js/jQuery.min.js"></script>
    <script src="js/lumos-min.js"></script>
    <script src="js/your-scripts.js"></script>
</body>
...
```

3. HTML Structure

    **Single Image**: Add an `a` element around your image with the `lumos-link` class.
    ``` html
    <a href="path/to/your-image.jpg" class="lumos-link">
        <img src="path/to/your-thumbnail.jpg">
    </a>
    ```
    **Image Group**: Add an `a` element around your image with the `lumos-link` class. Add a `data-lumos="..."` tag. The `data-lumos` attribute will combine all images with the same value to the same image group.
    ``` html
    <!-- Gallery 1 -->
    <a href="path/to/your-image1.jpg" class="lumos-link" data-lumos="gallery1">
        <img src="path/to/your-thumbnail1.jpg">
    </a>
    <a href="path/to/your-image2.jpg" class="lumos-link" data-lumos="gallery1">
        <img src="path/to/your-thumbnail2.jpg">
    </a>
    <a href="path/to/your-image3.jpg" class="lumos-link" data-lumos="gallery1">
        <img src="path/to/your-thumbnail3.jpg">
    </a>

    <!-- Gallery 2 -->
    <a href="path/to/your-image4.jpg" class="lumos-link" data-lumos="gallery2">
        <img src="path/to/your-thumbnail4.jpg">
    </a>
    <a href="path/to/your-image5.jpg" class="lumos-link" data-lumos="gallery2">
        <img src="path/to/your-thumbnail5.jpg">
    </a>
    ```

4. Display the alt attribute
If you want to display the `alt` attribute just add the `alt="..."` attribute to the image.
``` html
<img src="path/to/your-thumbnail1.jpg" alt="Image 1">
```

## Customization
### You can customize the look of your lumos overlay with your own CSS!

|Customize|CSS Selector|
|-----|-----|
|General overlay of Lumos|.lumos-container|
|Lumos image|.lumos-container .lumos-img|
|Image description|.lumos-container .lumos-alt-text|
|All control buttons|.lumos-container svg|
|Next button|.lumos-container .lumos-next|
|Prev button|.lumos-container .lumos-prev|
|Close button|.lumos-container .lumos-close|
|Loading icon|.lumos-container .spinner-container .spinner|

## License
100% FREE for commercial and non-commercial use!

Feel free to contact me for some feedback!
