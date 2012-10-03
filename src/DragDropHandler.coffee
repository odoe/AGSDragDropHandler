# This is a little helper class that will handle the drag
# and drop of images from the DOM to an ArcGIS Map component.
# This class will bind to the correct drag events to capture
# when a specified image is being dragged to the map.
# When it is dropped in the map, it will emit an event
# passing along the x/y coordinate it was droppped at
# and that can be used to convert to a map coordinate
# to add new points to the map. The image source target
# is also passed along so that it's url can be used as
# the picture marker symbol.

define [
  "dojo/_base/declare"
  "dojo/_base/array"
  "dojo/Evented"
  "dojo/dom"
  "dojo/dom-geometry"
  "dojo/on" 
], (declare, array, Evented, dom, domGeom, _on) ->
  DragDropHandler = declare([ Evented ], {})

  DragDropHandler::dragdrop = (srcName, targetName) ->
    # Clean up function to remove handlers for all events
    # when they're not needed anymore
    _cleanup = (targets) -> array.forEach targets, (t) -> t.remove()

    # Cache the DOM elements
    src = dom.byId srcName
    target = dom.byId targetName

    handlers = []

    handlers.push _on target, "dragenter", (evt) -> evt.preventDefault()

    handlers.push _on target, "dragover", (evt) -> evt.preventDefault()

    handlers.push _on src, "dragend", (evt) =>
      console.log "clean up"
      _cleanup handlers 
    # Listen for the "dragstart" of the image and then
    # start the listener for the "drop" on the target
    handlers.push _on src, "dragstart", (evt) => 
      console.log "drag of item start"
      handlers.push _on target, "drop", (evt) =>
        evt.preventDefault()
        _cleanup handlers # clean up your mess
        # dojo did the best job on giving me
        # the proper DOM coordinates
        position = domGeom.position evt.currentTarget
        _x = evt.clientX - position.x
        _y = evt.clientY - position.y
        # dispatch an event with attached results
        @.emit "itemdrop",
          "bubbles"    : true
          "cancelable" : true
          "x"          : _x
          "y"          : _y
          "dragsource" : src

  DragDropHandler
