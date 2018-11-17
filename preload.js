var images = new Map();

function preLoadImages(onload) {
    var imagesNameList = ['aidkit', 'alien', 'background', 'background_2', 'battery', 'bullet', 'helicopter'];
    var loaded = 0;
    var resolution = 1080;
    if(window.innerWidth <= 360) {
        resolution = 360;
    } else if(window.innerWidth <= 720) {
        resolution = 720;
    }

    imagesNameList.forEach(name => {
        imageLoader(name, resolution, function () {
            loaded++;
            if (imagesNameList.length == loaded) {
                console.log("loaded");
                onload();
            }
        });
    });
}

function imageLoader(name, resolution, onload) {
    var image = new Image();
    image.src = "./assets/" + resolution + "/" + name + ".png";
    console.log(image.src);
    image.addEventListener('load', function () {
        images.set(name, image);
        console.log("Loaded " + name);
        onload();
    }, false);
}