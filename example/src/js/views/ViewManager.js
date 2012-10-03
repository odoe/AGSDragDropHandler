(function() {

  define(['dojo/_base/declare', 'dojo/query', 'dojo/dom-attr', 'views/map/MapView', 'views/tools/sidebar/AccordionView', 'widgets/DragDropHandler', 'dojo/domReady!'], function(declare, query, domAttr, MapView, AccordionView, DragDropHandler) {
    var vm;
    vm = declare([], {
      render: function() {
        var handler, mapView;
        handler = new DragDropHandler();
        mapView = new MapView();
        mapView.on("mapIsReady", function(result) {
          var acView;
          console.log("map is ready", result);
          acView = new AccordionView(result.map, handler);
          acView.render();
          /*
                  # listen for drag icon mousedown event
          */
          return query('.drag-icon').on('mousedown', function(evt) {
            var srcName;
            srcName = domAttr.get(evt.currentTarget, "id");
            return handler.dragdrop(srcName, 'map');
          });
        });
        mapView.render();
        return handler.on("itemdrop", function(evt) {
          var data;
          console.log('item dropped', evt);
          data = {
            pt: new esri.geometry.Point(evt.x, evt.y),
            url: domAttr.get(evt.dragsource, 'src'),
            id: domAttr.get(evt.dragsource, 'id')
          };
          console.log('add to map', data);
          return mapView.addPoint(data);
        });
      }
    });
    return vm;
  });

}).call(this);
