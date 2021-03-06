function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function setText(el, val) {
  el = document.getElementById(el);
  if (el.textContent !== undefined)
    el.textContent = val;
  else
    el.innerText = val;
}

// javascript is so awesome. this is how you write June 1st. Cause June is the
// 5th month, indexed by zero. thanks javascript!
var date_its_over = Date.UTC(2014,05,06,10,00,00,00);
var days_left = Math.floor((date_its_over - Date.now())/(1000*24*60*60));
var days_left_message = '18 Days Early';

function totalRaisedCB(totalRaisedCents) {
  var GOAL = 5000000;
  var totalRaised = totalRaisedCents / 100;
  var alreadyBanked = 1000000;
  var progress = totalRaised-alreadyBanked;
  // todo: this needs to change when we make it past 2million
  var percent = Math.floor(progress * 100/ GOAL);
  setText("super-cool-progress-bar-percent", '' + percent + '% Funded');
  setText("super-cool-progress-bar-funded", '$' + addCommas(progress));
  document.getElementById("super-cool-progress-bar-bar").style.width='' + Math.min(100, percent) + '%';
  setText("super-cool-progress-bar-togo", days_left_message);
}

var total_req = document.createElement('script');
total_req.setAttribute("src",
                       "https://pledge.mayday.us/r/total?callback=totalRaisedCB");
document.head.appendChild(total_req);

function ready(fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'interactive')
        fn();
    });
  }
}
