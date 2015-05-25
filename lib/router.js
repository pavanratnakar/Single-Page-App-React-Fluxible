/* eslint-env */

"use strict";

require("node-jsx").install({extension: ".jsx"});
var fs = require("fs"),
    async = require("async"),
    React = require("react"),
    App = require("../src/js/app.js"),
    productActions = require("../src/js/actions/ProductActions.js"),
    categoryActions = require("../src/js/actions/CategoryActions.js"),
    navigateAction = require("fluxible-router").navigateAction;

var HtmlComponent = React.createFactory(require("../src/js/components/Html.jsx"));

module.exports = function (app) {

    var LoadPage = function (req, res) {
        var context = App.createContext();

        res.type("html");
        async.auto({
            Products: function (next) {
                context.executeAction(productActions, {
                    type: "receiveProducts",
                    data: require("../data/products.json")
                }, next);
            },
            Categories: function (next) {
                context.executeAction(categoryActions , {
                    type: "receiveCategories",
                    data: [{
                        id: 1,
                        name: "nature",
                        value: false,
                        title: "Nature"
                    },
                    {
                        id: 2,
                        name: "people",
                        value: false,
                        title: "People"
                    }]
                }, next);
            },
            Main: ["Products", "Categories", function (next) {
                context.executeAction(navigateAction, {
                    url: req.url
                }, function (err) {
                    if (err) {
                        return;
                    }
                    res.expose(App.dehydrate(context), "App");
                    var Component = App.getComponent();
                    next(null, React.renderToStaticMarkup(HtmlComponent({
                        state: res.locals.state,
                        markup: React.renderToString(Component({
                            context: context.getComponentContext()
                        })),
                        context: context.getComponentContext()
                    })));
                });
            }]
        }, function (err, html) {
            if (err) {
                res.write("Error");
            } else {
                res.write(html.Main);
            }
            res.end();
        });
    };

    app.get("/", LoadPage);
};