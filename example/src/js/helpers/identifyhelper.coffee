define [
  'jquery'
  'underscore'
  'views/infowindow/infoWindowView'
], ($, _, InfoView) ->

    identifyHandler: (map, url) ->
      identifyTask = new esri.tasks.IdentifyTask url
      idParams = new esri.tasks.IdentifyParameters()
      idParams.tolerance = 3
      idParams.returnGeometry = true
      idParams.layerIds = [0,1]
      idParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL

      #dojo.disconnect handle # just in case
      dojo.connect map, "onClick", (evt) ->
        #dojo.disconnect handle
        idParams.geometry = evt.mapPoint
        idParams.mapExtent = map.extent
        idParams.width = map.width
        idParams.height = map.height
        deferred = identifyTask.execute idParams

        deferred.addCallback (response) =>
          dojo.map response, (result) ->
            feature = result.feature
            feature.attributes.layerName = result.layerName
            fields = []
            for key of feature.attributes
              fields.push name:key unless key.toLowerCase().indexOf("shape") > -1 or key.toLowerCase() is "layername" or key.toLowerCase() is "objectid"
            view = new InfoView fields
            content = view.render().$el.html()
            template = new esri.InfoTemplate "", content #"ID: ${ID}, Location:${LOC_ID}"
            feature.setInfoTemplate template
            feature
        map.infoWindow.setFeatures [ deferred ]
        map.infoWindow.show evt.mapPoint

