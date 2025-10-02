(function(){
  var btn = document.querySelector('[data-toggle-sidebar]');
  var sb = document.getElementById('sidebar');
  if (btn && sb) {
    btn.addEventListener('click', function(){
      var open = sb.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  var ct = document.querySelector('.city-select-toggle');
  var cm = document.getElementById('city-menu');
  if (ct && cm) {
    ct.addEventListener('click', function(){
      var isOpen = cm.hasAttribute('hidden') === false;
      if (isOpen) {
        cm.setAttribute('hidden', '');
        ct.setAttribute('aria-expanded', 'false');
      } else {
        cm.removeAttribute('hidden');
        ct.setAttribute('aria-expanded', 'true');
      }
    });
  }
})();
