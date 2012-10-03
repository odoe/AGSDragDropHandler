(function() {

  define(['dojo/_base/declare', 'dojo/Evented', 'helpers/extentfactory', 'helpers/popuphelper', 'helpers/symbolHelper', 'esri/layers/FeatureLayer', 'esri/layers/osm'], function(declare, Evented, extents, popup, symbols, FeatureLayer) {
    var MapView;
    MapView = declare([Evented], {
      map: null,
      render: function() {
        var ext, osm,
          _this = this;
        ext = extents.losAngeles();
        this.map = new esri.Map("map", {
          infoWindow: popup.create(),
          extent: ext
        });
        osm = new esri.layers.OpenStreetMapLayer();
        dojo.connect(this.map, "onLayersAddResult", function(results) {
          return _this.emit("mapIsReady", {
            map: _this.map
          });
        });
        this.map.addLayers([osm]);
        return dojo.connect(window, "resize", function() {
          return _this.map.resize();
        });
      },
      addPoint: function(data) {
        var graphic, mp, pms, template;
        console.log('data', data);
        mp = esri.geometry.toMapGeometry(this.map.extent, this.map.width, this.map.height, data.pt);
        pms = new esri.symbol.PictureMarkerSymbol();
        pms.setUrl(data.url);
        /*
              # Set width and heigth accordingly.
              # If you need to set an offset for a
              # pin type marker, do that also
        */
        pms.setWidth(24);
        pms.setHeight(24);
        /*
              # Normally, I would et the attribute data from another, non-spatial data source,
              # and link it via an id or some other attribute, for now, I'll just use a simple
              # id field. I'll leave this up to you how you want to populate attributes
        */
        template = new esri.InfoTemplate("Type of Point", "Type: ${TYPE}");
        graphic = new esri.Graphic(mp, pms, {
          TYPE: data.id
        }, template);
        return this.map.graphics.add(graphic);
      }
    });
    return MapView;
  });

}).call(this);
