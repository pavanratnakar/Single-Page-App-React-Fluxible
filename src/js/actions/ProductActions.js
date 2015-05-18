"use strict";

module.exports = function (context, payload, done) {
    switch (payload.type) {

        case "selectProduct":
        context.dispatch("PRODUCT_SELECTED", payload.data);
        break;

        case "deSelectProduct":
        context.dispatch("PRODUCT_DESELECTED", payload.data);
        break;

        case "receiveProducts":
        context.dispatch("PRODUCT_RECEIVE_DATA", payload.data);
        done();
        break

        default:
        break;
    };
};