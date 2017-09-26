const electron = require('electron');
const clipboard = electron.clipboard;
const nativeImage = electron.nativeImage;

clipboard.writeText("hello, world");
clipboard.writeText("hello, quadrant");

console.log( clipboard.readText() );

let img = nativeImage.createFromPath("../images/app_logo02.png");

clipboard.writeImage(img);

const img2 = clipboard.readImage().toDataURL();

console.log( img2 );

const img3 = new Image();
img3.src = img2;

document.body.appendChild(img3);

console.log();