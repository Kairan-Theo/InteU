(function(){
  function ensureContainer(){
    let el = document.getElementById('toastContainer');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toastContainer';
      el.className = 'toast-container';
      document.body.appendChild(el);
    }
    return el;
  }

  function show(type, message, duration = 3200){
    const container = ensureContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : (type === 'warn' ? 'fa-bell' : 'fa-info-circle');
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span><button class="close" aria-label="Close">&times;</button>`;
    container.appendChild(toast);
    const remove = () => { if (toast.parentNode) toast.parentNode.removeChild(toast); };
    toast.querySelector('.close').addEventListener('click', remove);
    setTimeout(remove, duration);
  }

  window.Toast = { show };
})();