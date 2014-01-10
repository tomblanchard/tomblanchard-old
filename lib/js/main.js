/*!  Apollo v1.2.1 by Todd Motto: http://toddmotto.com */ window.Apollo=function(a,b){"use strict";var c=b.documentElement.classList,d={hasClass:function(a,b){return c?a.classList.contains(b):new RegExp("(^|\\s)"+b+"(\\s|$)").test(a.className)},addClass:function(a,b){c?a.classList.add(b):d.hasClass(a,b)||(a.className+=(a.className?" ":"")+b)},removeClass:function(a,b){c?a.classList.remove(b):d.hasClass(a,b)&&(a.className=a.className.replace(new RegExp("(^|\\s)*"+b+"(\\s|$)*","g"),""))},toggleClass:function(a,b){if(c)a.classList.toggle(b);else{var e=d.hasClass(a,b)?d.removeClass:d.addClass;e(a,b)}}};return d}(window,document);

(function (window, document, undefined) { 'use strict';

  var next_buttons_el = document.querySelectorAll('.site-foot__item-quote-next'),
      next_button_1_el = document.querySelector('.site-foot__item-quote--1 .site-foot__item-quote-next'),
      next_button_2_el = document.querySelector('.site-foot__item-quote--2 .site-foot__item-quote-next'),
      next_button_3_el = document.querySelector('.site-foot__item-quote--3 .site-foot__item-quote-next'),
      quotes_el = document.querySelectorAll('.site-foot__item-quote'),
      quote_1_el = document.querySelector('.site-foot__item-quote--1'),
      quote_2_el = document.querySelector('.site-foot__item-quote--2'),
      quote_3_el = document.querySelector('.site-foot__item-quote--3'),
      next_buttons_act = function(event) {
        for(var i = 0; i < quotes_el.length; i++) {
          Apollo.removeClass(quotes_el[i], 'site-foot__item-quote--current');
          event.preventDefault();
        }
      };

  for(var i = 0; i < next_buttons_el.length; i++) {
    next_buttons_el[i].addEventListener('click', next_buttons_act, false);
  }

  next_button_1_el.addEventListener('click', function() {
    Apollo.addClass(quote_2_el, 'site-foot__item-quote--current');
  }, false);

  next_button_2_el.addEventListener('click', function() {
    Apollo.addClass(quote_3_el, 'site-foot__item-quote--current');
  }, false);

  next_button_3_el.addEventListener('click', function() {
    Apollo.addClass(quote_1_el, 'site-foot__item-quote--current');
  }, false);

})(window, document);