// JavaScript source code
var menu = function () {
    'use strict';

    const loginExtraPadding = 15; // Extra padding on the bottom of login form.
    var menuDiv;
    var menuButton;
    var menuHeight;
    var loginBox;
    var menuIsOpen;

    document.addEventListener('DOMContentLoaded', menuOnLoad);
    function menuOnLoad() {
        menuDiv = document.getElementById('menu');
        menuButton = document.getElementById('menuButton');

        // Load initial items
        menuSetup();
        menuDiv.style.height = '0px';
        menuIsOpen = false;
    }

    function menuSetup() {
        // Load initial items and get the height of each
        var items = getMenuItems();
        menuDiv.innerHTML = '';
        menuHeight = 0;
        items.forEach(function (item, index) {
            menuDiv.innerHTML += item;
            menuHeight += menuDiv.children[index].getBoundingClientRect().height + 1;
        })

        menuDiv.style.height = menuHeight + 'px';

        var header = document.getElementsByTagName('header')[0];

        if (!isLoggedIn) {
            menuButton.style.visibility = 'hidden';
            header.style.visibility = 'hidden';
        }
        else {
            menuButton.style.visibility = 'visible';
            header.style.visibility = 'visible';
        }

        menuClose();
    }

    function menuOpen() {
        if (menuIsOpen)
            menuClose();
        else {
            menuDiv.style.height = menuHeight + 'px';
            menuIsOpen = true;
        }
    }

    function menuClose() {
        menuDiv.style.height = '0px';
        menuIsOpen = false;
    }

    function loginAction(form) {
        console.log();
        if (document.forms[form]['user'].value == '' || document.forms['login2']['pass'].value == '') {
            var errorText = document.getElementById('loginError')
            if (!errorText) {
                errorText = document.createElement('span');
                errorText.setAttribute('id', 'loginError');
                errorText.style.color = 'red';
                loginBox.appendChild(errorText);
            }
            errorText.innerHTML = 'You need to enter a username and password!';
            return;
        }
        isLoggedIn = true;

        menuSetup();
        setupStatus();
    }

    function logout() {
        isLoggedIn = false;
        menuSetup();
        menuClose();
        setupStatus(); // G� til start siden n�r man logger ut.
    }

    return { // Public methods
        logout: logout,
        menuOpen: menuOpen,
        menuClose: menuClose,
        menuSetup: menuSetup,
        loginAction: loginAction,
    }
}();
