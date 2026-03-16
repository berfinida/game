(function(){
  var openBtn = document.getElementById('rx-open-popup');
  var closeBtn = document.getElementById('rx-close-popup');
  var mask = document.getElementById('rx-popup-mask');
  var list = document.getElementById('rx-variation-list');
  var priceEl = document.getElementById('rxp-price');
  var oldPriceEl = document.getElementById('rxp-old-price');
  var selectedEl = document.getElementById('rxp-selected-variation');
  var descEl = document.getElementById('rxp-short-desc');
  var stockA = document.getElementById('rxp-stock-a');
  var stockACount = document.getElementById('rxp-stock-a-count');
  var stockB = document.getElementById('rxp-stock-b');
  var stockBCount = document.getElementById('rxp-stock-b-count');
  var stockABar = document.getElementById('rxp-stock-a-bar');
  var stockBBar = document.getElementById('rxp-stock-b-bar');
  var simulateSaleBtn = document.getElementById('rxp-simulate-sale');
  var stockNote = document.getElementById('rxp-stock-note');

  var open = function(e){
    if(e){ e.preventDefault(); }
    if(mask){
      mask.style.display='flex';
      mask.setAttribute('aria-hidden','false');
    }
  };
  var close = function(e){
    if(e){ e.preventDefault(); }
    if(mask){
      mask.style.display='none';
      mask.setAttribute('aria-hidden','true');
    }
  };

  var applyVariation = function(btn){
    if(!btn){ return; }
    var name = btn.getAttribute('data-variation') || btn.textContent.trim();
    var price = btn.getAttribute('data-price');
    var oldPrice = btn.getAttribute('data-old-price');
    var stockAVal = btn.getAttribute('data-stock-a');
    var stockBVal = btn.getAttribute('data-stock-b');
    var desc = btn.getAttribute('data-desc');

    if(priceEl && price){ priceEl.textContent = '₺ ' + price; }
    if(oldPriceEl && oldPrice){ oldPriceEl.textContent = '₺ ' + oldPrice; }
    if(selectedEl && name){ selectedEl.textContent = 'Seçili: ' + name; }
    if(descEl && desc){ descEl.textContent = desc; }

    if(stockACount && stockAVal){ stockACount.textContent = 'Mevcut: ' + stockAVal; }
    if(stockBCount && stockBVal){ stockBCount.textContent = 'Mevcut: ' + stockBVal; }
    if(stockABar && stockAVal){
      var a = Math.min(100, Math.max(0, parseInt(stockAVal,10) * 2));
      stockABar.querySelector('span').style.width = a + '%';
    }
    if(stockBBar && stockBVal){
      var b = Math.min(100, Math.max(0, parseInt(stockBVal,10) * 4));
      stockBBar.querySelector('span').style.width = b + '%';
    }
  };

  if(openBtn){ openBtn.addEventListener('click', open); }
  if(closeBtn){ closeBtn.addEventListener('click', close); }
  if(mask){
    mask.addEventListener('click', function(e){ if(e.target === mask){ close(e); } });
  }

  if(list){
    list.addEventListener('click', function(e){
      var btn = e.target.closest('button[data-variation]');
      if(!btn){ return; }
      var buttons = list.querySelectorAll('button[data-variation]');
      buttons.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      applyVariation(btn);
      close(e);
    });
  }

  var mainGrid = document.querySelector('.rxp-variation-grid');
  if(mainGrid){
    mainGrid.addEventListener('click', function(e){
      var btn = e.target.closest('button[data-variation]');
      if(!btn){ return; }
      var buttons = mainGrid.querySelectorAll('button[data-variation]');
      buttons.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      applyVariation(btn);
    });

    applyVariation(mainGrid.querySelector('button[data-variation].active') || mainGrid.querySelector('button[data-variation]'));
  }

  var showInactive = document.getElementById('rxp-show-inactive');
  var groupCards = document.querySelectorAll('.rxp-group-card.is-inactive');
  var updateInactiveVisibility = function(){
    var visible = !!(showInactive && showInactive.checked);
    groupCards.forEach(function(card){
      card.style.display = visible ? 'block' : 'none';
    });
  };

  if(showInactive){
    showInactive.addEventListener('change', updateInactiveVisibility);
    updateInactiveVisibility();
  }

  var parseStock = function(el){
    if(!el){ return 0; }
    var match = el.textContent.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  var setStock = function(el, bar, value, multiplier){
    if(el){
      el.textContent = 'Mevcut: ' + value;
    }
    if(bar){
      var percent = Math.min(100, Math.max(0, value * multiplier));
      var span = bar.querySelector('span');
      if(span){
        span.style.width = percent + '%';
      }
    }
  };

  if(simulateSaleBtn){
    simulateSaleBtn.addEventListener('click', function(e){
      e.preventDefault();
      var a = Math.max(0, parseStock(stockACount) - 1);
      var b = Math.max(0, parseStock(stockBCount) - 1);
      setStock(stockACount, stockABar, a, 2);
      setStock(stockBCount, stockBBar, b, 4);
      if(stockNote){
        stockNote.textContent = 'Demo satış uygulandı: stok değerleri 1 adet azaltıldı.';
      }
    });
  }

  // Video modal
  var videoModal = document.getElementById('rxp-video-modal');
  var videoClose = document.getElementById('rxp-video-close');
  var videoIframe = document.getElementById('rxp-video-iframe');
  var videoBadge = document.querySelector('.rxp-video-badge');

  var openVideo = function(e){
    if(e){ e.preventDefault(); }
    if(videoModal && videoIframe && videoBadge){
      var url = videoBadge.getAttribute('data-video');
      videoIframe.src = url;
      videoModal.style.display='flex';
      videoModal.setAttribute('aria-hidden','false');
    }
  };
  var closeVideo = function(){
    if(videoModal && videoIframe){
      videoIframe.src = '';
      videoModal.style.display='none';
      videoModal.setAttribute('aria-hidden','true');
    }
  };

  if(videoBadge){ videoBadge.addEventListener('click', openVideo); }
  if(videoClose){ videoClose.addEventListener('click', closeVideo); }
  if(videoModal){ videoModal.addEventListener('click', function(e){ if(e.target === videoModal){ closeVideo(); } }); }
})();
