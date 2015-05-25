"use strict";

var createStore = require("fluxible/addons").createStore;

var ApplicationStore = createStore({

    storeName: "ApplicationStore",

    handlers: {
        "UPDATE_PAGE_TITLE": "_updatePageTitle"
    },

    _updatePageTitle: function (payload) {
        this.pageTitle = payload.title;
        this.emitChange();
    },

    initialize: function () {
        this.pageTitle = null;
    },

    getPageTitle: function () {
        return this.pageTitle;
    },

    getState: function () {
        return {
            pageTitle: this.pageTitle
        };
    },

    dehydrate: function () {
        return this.getState();
    },

    rehydrate: function (state) {
        this.pageTitle = state.pageTitle;
    }

});

module.exports = ApplicationStore;