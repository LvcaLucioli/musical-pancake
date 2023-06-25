
// mobile check
Object.defineProperty(window, 'IS_MOBILE', {
    get: function() {
      return window.innerWidth < 992;
    }
});
