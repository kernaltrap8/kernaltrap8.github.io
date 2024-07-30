function getRandomImageFilename() {
    const start = 2687204;
    const end = 2687272;
    const extensions = ['jpg', 'png', 'gif'];
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    // Ensure the random number falls within the range
    const randomNumber = (start + dayOfYear) % (end - start + 1) + start;
    const baseFilename = `${randomNumber}`;
    return { baseFilename, extensions };
}

function checkImageExists(url, callback) {
    const img = new Image();
    img.onload = function () {
        callback(true);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = url;
}

function updateImage() {
    const { baseFilename, extensions } = getRandomImageFilename();
    const imgElement = document.getElementById('random-image');
    
    function tryNextExtension(index) {
        if (index >= extensions.length) {
            imgElement.src = '/waldo/images/placeholder.jpg';
            return;
        }
        const extension = extensions[index];
        const url = `/waldo/images/${baseFilename}.${extension}`;
        checkImageExists(url, function (exists) {
            if (exists) {
                imgElement.src = url;
            } else {
                tryNextExtension(index + 1);
            }
        });
    }
    tryNextExtension(0);
}

window.onload = updateImage;
