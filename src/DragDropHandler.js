(function() {

  define(["dojo/_base/declare", "dojo/_base/array", "dojo/Evented", "dojo/dom", "dojo/dom-geometry", "dojo/on"], function(declare, array, Evented, dom, domGeom, _on) {
    var DragDropHandler;
    DragDropHandler = declare([Evented], {});
    DragDropHandler.prototype.dragdrop = function(srcName, targetName) {
      var handlers, src, target, _cleanup,
        _this = this;
      _cleanup = function(targets) {
        return array.forEach(targets, function(t) {
          return t.remove();
        });
      };
      src = dom.byId(srcName);
      target = dom.byId(targetName);
      handlers = [];
      handlers.push(_on(target, "dragenter", function(evt) {
        return evt.preventDefault();
      }));
      handlers.push(_on(target, "dragover", function(evt) {
        return evt.preventDefault();
      }));
      handlers.push(_on(src, "dragend", function(evt) {
        console.log("clean up");
        return _cleanup(handlers);
      }));
      return handlers.push(_on(src, "dragstart", function(evt) {
        console.log("drag of item start");
        return handlers.push(_on(target, "drop", function(evt) {
          var position, _x, _y;
          evt.preventDefault();
          _cleanup(handlers);
          position = domGeom.position(evt.currentTarget);
          _x = evt.clientX - position.x;
          _y = evt.clientY - position.y;
          return _this.emit("itemdrop", {
            "bubbles": true,
            "cancelable": true,
            "x": _x,
            "y": _y,
            "dragsource": src
          });
        }));
      }));
    };
    return DragDropHandler;
  });

}).call(this);
