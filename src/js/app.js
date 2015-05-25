'use strict';

var React = require("react"),
    Fluxible = require("fluxible"),
    fetchrPlugin = require('fluxible-plugin-fetchr');

var app = new Fluxible({
    component: React.createFactory(require("./components/App.jsx"))
});

app.registerStore(require("./stores/RouteStore"));
app.registerStore(require("./stores/ApplicationStore"));
app.registerStore(require("./stores/CategoryStore"));
app.registerStore(require("./stores/ProductStore"));

module.exports = app;