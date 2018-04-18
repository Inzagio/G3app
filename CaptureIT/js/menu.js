// JavaScript source code
'use strict';

var menuDiv;
var menuWidth;
var menuPos;
var extraPadding = 50;
var loginBox

document.addEventListener('DOMContentLoaded', menuOnLoad);
function menuOnLoad() {
    menuDiv = document.getElementById('menu');
    menuWidth = parseInt(window.getComputedStyle(menuDiv).getPropertyValue('width'));
    menuPos = Math.abs(parseInt(window.getComputedStyle(menuDiv).getPropertyValue('left')) + menuWidth + extraPadding);

    // Login Box
    loginBox = document.createElement('div');
    loginBox.setAttribute('id', 'loginBox');
    menuDiv.appendChild(loginBox);

    loginBox.style = '\
        position: absolute; \
        z-index: 2; \
        left: 150px; \
        top: 50px; \
        width: 180px; \
        background-color: skyblue; \
        padding: 10px;';
    loginBox.innerHTML = '' +
        '<form action="" name="login">' +
        'Username:<br /> <input type="text" name="username"><br />' +
        'Password:<br /><input type="password" name="password"><br />' +
        '<input id="loginButton" type="button" value="Log In">';

    loginHide();
    menuDiv.getElementsByTagName('a')[1].addEventListener('click', loginShow);
    document.getElementById('loginButton').addEventListener('click', loginAction);


    // Login Button
    var loginButton = document.createElement('input');
    document.getElementById('showcase').getElementsByClassName('container')[0].appendChild(document.createElement('br'));
    document.getElementById('showcase').getElementsByClassName('container')[0].appendChild(loginButton);
    loginButton.setAttribute('type', 'button');
    loginButton.setAttribute('value', 'Login');
    loginButton.addEventListener('click', menuOpen);
    loginButton.addEventListener('click', loginShow);
}

function menuOpen() {
    menuDiv.style.left = menuPos + 'px';
}

function menuClose() {
    loginHide();
    menuDiv.style.left = '-' + (menuWidth + extraPadding) + 'px';
}

function loginShow() {
    loginBox.style.visibility = 'visible';
    loginBox.getElementsByTagName('form')[0].getElementsByTagName('input')[0].focus();
}

function loginHide() {
    loginBox.style.visibility = 'hidden';
}

function loginAction() {
    loginHide();
    menuClose();
}
