const { notification } = require('electron');
const path = require('path');

var notice = document.querySelector("#notice");

const option = {
    title : 'title',
    body : 'body',
    icon : path.join(__dirname,'../images/icon_expressive.png')
};

notice.onclick = function (){
    if( Notification.permission == "granted"){
        const myNotification = new Notification(option.title, option);
        console.log(myNotification);
        myNotification.onclick = () => {
            console.log('clicked');
        }
    }else{
        Notification.requestPermission();
        const myNotification = new Notification(option.title, option);
        myNotification.onclick = () => {
            console.log('clicked');
        }
    }
}


