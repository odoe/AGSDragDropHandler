define [
  'dojo/_base/declare'
  'dojo/Evented'
  'dijit/layout/AccordionContainer'
  'dijit/layout/ContentPane'
  'text!templates/EditItems.html'
], (declare, Evented, AccordionContainer, ContentPane, template) ->
  AccordionView = declare [Evented],

    constructor: (@map, @handler) ->

    render: ->
      aContainer = new AccordionContainer {}, "sidebar-right"
      console.log "make accordion container"

      aContainer.addChild new ContentPane
        title: "Editor"
        content: template

      aContainer.startup()

  AccordionView
