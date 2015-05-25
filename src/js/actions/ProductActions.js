"use strict";

module.exports = function (context, payload, done) {

    switch (payload.type) {

        case "selectProduct":
        context.dispatch("PRODUCT_SELECTED", payload.data);
        done();
        break;

        case "deSelectProduct":
        context.dispatch("PRODUCT_DESELECTED", payload.data);
        done();
        break;

        case "receiveProducts":
        context.dispatch("PRODUCT_RECEIVE_DATA", payload.data);
        done();
        break;

        default:
        break;
    };
};