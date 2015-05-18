/* eslint-env */

"use strict";

require("node-jsx").install({extension: ".jsx"});
var fs = require("fs"),
    async = require("async"),
    React = require("react"),
    mainApp = require("./main");

var HtmlComponent = React.createFactory(require("../src/js/components/Html.jsx"));

module.exports = function (app) {
    var LoadPage = function (req, res) {

        var context = mainApp.createContext({
            req: req
        });

        res.type("html");
        context.getActionContext().executeAction(require("../src/js/actions/ProductActions"), {
            type: "receiveProducts",
            data: require("../data/products.json")
        }, function (err) {
            if (err) {
                if (err.status && err.status === 404) {
                    res.write("");
                } else {
                    res.write("Error");
                }
                return;
            }
            res.expose(mainApp.dehydrate(context), "App");
            var AppComponent = mainApp.getAppComponent();
            async.auto({
                Main: [function (next) {
                    var html = React.renderToStaticMarkup(HtmlComponent({
                        state: res.locals.state,
                        markup: React.renderToString(AppComponent({
                            context: context.getComponentContext()
                        }))
                    }));
                    next(null, html);
                }]
            }, function (err, html) {
                if (err) {
                    res.write("Error");
                } else {
                    res.write(html.Main);
                }
                res.end();
            });
        });
    };

    app.get("/react", LoadPage);
};