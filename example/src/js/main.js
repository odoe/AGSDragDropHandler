(function() {

  require({
    async: true,
    parseOnLoad: true,
    aliases: [["text", "dojo/text"]],
    packages: [
      {
        name: "templates",
        location: location.pathname.replace(/\/[^/]+$/, "") + "templates"
      }, {
        name: "views",
        location: location.pathname.replace(/\/[^/]+$/, "") + "js/views"
      }, {
        name: "helpers",
        location: location.pathname.replace(/\/[^/]+$/, "") + "js/helpers"
      }, {
        name: "widgets",
        location: location.pathname.replace(/\/[^/]+$/, "") + "js/widgets"
      }, {
        name: "app",
        location: location.pathname.replace(/\/[^/]+$/, "") + "js",
        main: "app"
      }
    ]
  });

  require(['app', 'dojo/ready'], function(App, ready) {
    return ready(function() {
      return App.initialize();
    });
  });

}).call(this);
