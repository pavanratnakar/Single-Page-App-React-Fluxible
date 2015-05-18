/** @jsx React.DOM */

"use strict";

var React = require("react"),
    FluxibleApp = require("fluxible-app");

var app = new FluxibleApp({
    appComponent: React.createFactory(require("../src/js/components/App.jsx"))
});

app.registerStore(require("../src/js/stores/CategoryStore"));
app.registerStore(require("../src/js/stores/ProductStore"));

module.exports = app;