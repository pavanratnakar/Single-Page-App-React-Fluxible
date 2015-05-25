"use strict";

module.exports = function (context, payload, done) {
    switch (payload.type) {

        case "selectCategory":
        context.dispatch("CATEGORY_SELECTED", payload.data);
        done();
        break;

        case "deSelectCategory":
        context.dispatch("CATEGORY_DESELECTED", payload.data);
        done();
        break;

        case "deSelectCategories":
        context.dispatch("CATEGORY_DESELECTED", payload.data);
        done();
        break;

        case "receiveCategories":
        context.dispatch("CATEGORY_RECEIVE_DATA", payload.data);
        done();
        break;

        default:
        break;
    };
};