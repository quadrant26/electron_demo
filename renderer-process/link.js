const { shell } = require('electron');
const path = require('path');

// shell.openExternal('www.baidu.com');

var links = document.querySelectorAll("a[href]");

Array.prototype.forEach( (link) => {
    var url = link.getAttribute('href');
    if( url.getAttribute('href').indexOf('http') == 0){
        
        link.onclick = (e) => {
            e.preventDefault();
            shell.openExternal(url);
        }
    }
})

var fullpath = document.querySelector("#fullPath");

fullpath.onclick = (e) => {
    shell.showItemInFolder(__dirname);
}