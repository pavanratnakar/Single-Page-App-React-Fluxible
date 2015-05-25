"use strict";
var React = require("react");
var app = require("./app");
var dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support

app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;
    var mountNode = document.getElementById("react-app");

    var Component = app.getComponent();
    React.render(Component({
        context:context.getComponentContext()
    }), mountNode);
});