define [
  'dojo/_base/declare'
  'dojo/query'
  'dojo/dom-attr'
  'views/map/MapView'
  'views/tools/sidebar/AccordionView'
  'widgets/DragDropHandler'
  'dojo/domReady!'
], (declare, query, domAttr, MapView, AccordionView, DragDropHandler) ->
  vm = declare [],
    render: ->
      handler = new DragDropHandler()
      mapView = new MapView()
      mapView.on "mapIsReady", (result) ->
        console.log "map is ready", result
        acView = new AccordionView result.map, handler
        acView.render()

        ###
        # listen for drag icon mousedown event
        ###
        query('.drag-icon').on 'mousedown', (evt) ->
          srcName = domAttr.get evt.currentTarget, "id"
          handler.dragdrop srcName, 'map'

      mapView.render()

      handler.on "itemdrop", (evt) ->
        console.log 'item dropped', evt
        data =
          pt: new esri.geometry.Point evt.x, evt.y
          url: domAttr.get evt.dragsource, 'src'
          id: domAttr.get evt.dragsource, 'id'
        console.log 'add to map', data
        mapView.addPoint data

  vm

