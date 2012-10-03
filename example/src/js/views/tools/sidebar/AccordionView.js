(function() {

  define(['dojo/_base/declare', 'dojo/Evented', 'dijit/layout/AccordionContainer', 'dijit/layout/ContentPane', 'text!templates/EditItems.html'], function(declare, Evented, AccordionContainer, ContentPane, template) {
    var AccordionView;
    AccordionView = declare([Evented], {
      constructor: function(map, handler) {
        this.map = map;
        this.handler = handler;
      },
      render: function() {
        var aContainer;
        aContainer = new AccordionContainer({}, "sidebar-right");
        console.log("make accordion container");
        aContainer.addChild(new ContentPane({
          title: "Editor",
          content: template
        }));
        return aContainer.startup();
      }
    });
    return AccordionView;
  });

}).call(this);
