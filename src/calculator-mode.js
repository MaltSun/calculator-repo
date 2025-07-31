let modeSwitch = document.getElementById('modeSwitch');
const input = document.querySelector('input');
const container = document.getElementById('container');
let buttons = document.getElementsByTagName('button');
let numbers = document.getElementsByClassName('number');

function lightmode_init() {
  let modeCookie = {
    set: function (key, value, time, path, secure = false) {
      let expires = new Date();
      expires.setTime(expires.getTime() + time);
      path =
        typeof path !== 'undefined' ? (path = 'path=' + path + ';') : '';
       secure = secure ? ';secure' : '';

      document.cookie =
        key +
        '=' +
        value +
        ';' +
        path +
        'expires=' +
        expires.toUTCString() +
        secure;
    },
    get: function () {
      let keyValue = document.cookie.match('(^|;) ?lightmode=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : null;
    },
    remove: function () {
      document.cookie = 'lightmode=; Max-Age=0; path=/';
    },
  };

  if (modeCookie.get() == 'true') {
    modeSwitch.classList.add('active');

    input.classList.add('lightTheme');
    container.classList.add('lightTheme');

    for (let button of buttons) {
      button.classList.add('lightTheme');
    }
    for (let num of numbers) {
      num.classList.add('lightTheme');
    }
  }

  modeSwitch.addEventListener('click', (event) => {
    event.preventDefault();
    event.target.classList.toggle('active');

    input.classList.toggle('lightTheme');
    container.classList.toggle('lightTheme');

    for (let button of buttons) {
      button.classList.toggle('lightTheme');
    }
    for (let num of numbers) {
      num.classList.toggle('lightTheme');
    }

    if (input.classList.contains('lightTheme')) {
      modeCookie.set('lightTheme', 'true', 2628000000, '/', false);
    } else {
      modeCookie.remove();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  lightmode_init();
});
