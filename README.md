# lumos

## What is lumos?

Lumos is a simple javascript library to add an image overlay to your website.

## Why use it?

* easy to set up
* customizable
* lightweight (total 3KB)
* responsive
* no dependencies

## Demo

Check out the [official website](https://lumos.oliverschwendener.ch).

## Usage

1. Add `lumos.css` to your HTML
    ``` html
    <link rel="stylesheet" href="lumos.css">
    <link rel="stylesheet" href="your-stylesheet.css">
    ```
2. Add `lumos-min.js` to your HTML
    ``` html
    <script src="lumos-min.js"></script>
    <script src="your-scripts.js"></script>
    ```
3. Add the `data-action="lumos"` tag to your images
    ``` html
    <img data-action="lumos" src="image.jpg">
    ```
4. Optional: If you want to have small images on your website and display a high resolution image only if the user clicks on it: add the `data-lumos-src` tag to your images with an url to your high resolution image
    ``` html
    <img data-action="lumos" src="small-image.jpg" data-lumos-src="big-image.jpg">
    ```
5. Et voilà, you are ready to go

## Customization

You can modify the look of the lumos overlay with your own stylesheets.

## License

Licensed under the [MIT](LICENSE.md) license.
