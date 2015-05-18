"use strict";

module.exports = function (context, payload, done) {
    switch (payload.type) {

        case "selectCategory":
        context.dispatch("CATEGORY_SELECTED", payload.data);
        break;

        case "deSelectCategory":
        context.dispatch("CATEGORY_DESELECTED", payload.data);
        break;

        case "deSelectCategories":
        context.dispatch("CATEGORY_DESELECTED", payload.data);
        break;

        case "receiveCategories":
        context.dispatch("CATEGORY_RECEIVE_DATA", payload.data);
        break;

        default:
        break;
    };
};