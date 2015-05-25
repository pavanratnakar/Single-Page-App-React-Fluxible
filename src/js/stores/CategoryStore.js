"use strict";

var createStore = require('fluxible/addons').createStore,
    _ = require("lodash");

var CategoryStore = createStore({

    storeName: "CategoryStore",

    handlers: {
        "CATEGORY_RECEIVE_DATA": "loadCategoriesData",
        "CATEGORY_SELECTED": "select",
        "CATEGORY_DESELECTED": "deSelect"
    },

    initialize: function (dispatcher) {
        this.categories = [];
    },

    loadCategoriesData: function (data) {
        this.categories = data;
        this.emitChange();
    },

    select: function (id) {
        this.categories = _.map(this.categories, function (category) {
            if (category.id === id) {
                category.value = true;
            }
            return category;
        });
        this.emitChange();
    },

    deSelect: function (id) {
        id = id || null;
        _categories = _.map(_categories, function (category) {
            if (!id || category.id === id) {
                category.value = false;
            }
            return category;
        });
    },

    getCategories: function () {
        return this.categories;
    },

    getActiveCategories: function () {
        return _.filter(this.categories, function (category) {
            if (category.value) {
                return true;
            }
            return false;
        });
    },

    dehydrate: function () {
        return {
            categories: this.categories
        };
    },

    rehydrate: function (state) {
        this.categories = state.categories;
    }

});

module.exports = CategoryStore;