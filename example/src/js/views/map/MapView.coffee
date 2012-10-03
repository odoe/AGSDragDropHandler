define [
  'dojo/_base/declare'
  'dojo/Evented'
  'helpers/extentfactory'
  'helpers/popuphelper'
  'helpers/symbolHelper'
  'esri/layers/FeatureLayer'
  'esri/layers/osm'
], (declare, Evented, extents, popup, symbols, FeatureLayer) ->
  MapView = declare [Evented],
    map: null
    render: ->
      ext = extents.losAngeles()
      @map = new esri.Map "map",
        infoWindow: popup.create()
        extent: ext

      osm = new esri.layers.OpenStreetMapLayer()

      dojo.connect @map, "onLayersAddResult", (results) =>
        @emit "mapIsReady",
          map: @map

      @map.addLayers [osm]

      dojo.connect window, "resize", =>
        @map.resize()

    addPoint: (data) ->
      console.log 'data', data
      # convert screen pt to map point
      #console.log "Made it into sceenPtToMap"
      mp = esri.geometry.toMapGeometry @map.extent, @map.width, @map.height, data.pt
      pms = new esri.symbol.PictureMarkerSymbol()
      pms.setUrl data.url
      ###
      # Set width and heigth accordingly.
      # If you need to set an offset for a
      # pin type marker, do that also
      ###
      pms.setWidth 24
      pms.setHeight 24
      #pms.setOffset 0, (24/2)
      
      ###
      # Normally, I would et the attribute data from another, non-spatial data source,
      # and link it via an id or some other attribute, for now, I'll just use a simple
      # id field. I'll leave this up to you how you want to populate attributes
      ###

      template = new esri.InfoTemplate "Type of Point", "Type: ${TYPE}"

      graphic = new esri.Graphic mp, pms, TYPE: data.id, template

      @map.graphics.add graphic


  MapView
