(function() {

  define(['jquery', 'underscore', 'views/infowindow/infoWindowView'], function($, _, InfoView) {
    return {
      identifyHandler: function(map, url) {
        var idParams, identifyTask;
        identifyTask = new esri.tasks.IdentifyTask(url);
        idParams = new esri.tasks.IdentifyParameters();
        idParams.tolerance = 3;
        idParams.returnGeometry = true;
        idParams.layerIds = [0, 1];
        idParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
        return dojo.connect(map, "onClick", function(evt) {
          var deferred,
            _this = this;
          idParams.geometry = evt.mapPoint;
          idParams.mapExtent = map.extent;
          idParams.width = map.width;
          idParams.height = map.height;
          deferred = identifyTask.execute(idParams);
          deferred.addCallback(function(response) {
            return dojo.map(response, function(result) {
              var content, feature, fields, key, template, view;
              feature = result.feature;
              feature.attributes.layerName = result.layerName;
              fields = [];
              for (key in feature.attributes) {
                if (!(key.toLowerCase().indexOf("shape") > -1 || key.toLowerCase() === "layername" || key.toLowerCase() === "objectid")) {
                  fields.push({
                    name: key
                  });
                }
              }
              view = new InfoView(fields);
              content = view.render().$el.html();
              template = new esri.InfoTemplate("", content);
              feature.setInfoTemplate(template);
              return feature;
            });
          });
          map.infoWindow.setFeatures([deferred]);
          return map.infoWindow.show(evt.mapPoint);
        });
      }
    };
  });

}).call(this);
