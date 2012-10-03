(function() {

  define(function() {
    return {
      exists: function(array, item) {
        var attr, _i, _len;
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          attr = array[_i];
          if (item.label === attr.label) return true;
        }
        return false;
      }
    };
  });

}).call(this);
