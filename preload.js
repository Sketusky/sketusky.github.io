var images = new Map();

function preLoadImages(onload) {
    var imagesNameList = ['aidkit', 'alien', 'background', 'background_2', 'battery', 'bullet', 'helicopter'];
    var loaded = 0;
    imagesNameList.forEach(name => {
        imageLoader(name, function () {
            loaded++;
            if (imagesNameList.length == loaded) {
                console.log("loaded");
                onload();
            }
        });
    });
}

function imageLoader(name, onload) {
    var image = new Image();
    image.src = "./assets/" + name + ".png";
    image.addEventListener('load', function () {
        images.set(name, image);
        console.log("Loaded " + name);
        onload();
    }, false);
}