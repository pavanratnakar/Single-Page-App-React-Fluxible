"use strict";

var createStore = require('fluxible/addons').createStore,
    _ = require("lodash");

var ProductStore = createStore({

    storeName: "ProductStore",

    handlers: {
        "PRODUCT_RECEIVE_DATA": "loadProductsData",
        "PRODUCT_RECEIVE": "select",
        "PRODUCT_SELECTED": "select",
        "PRODUCT_DESELECTED": "deSelect"
    },

    initialize: function (dispatcher) {
        this.products = [];
        this.selected = 0;
    },

    loadProductsData: function (data) {
        this.products = data;
        this.emitChange();
    },

    select: function (id) {
        this.selected = id;
        this.emitChange();
    },

    deSelect: function (id) {
        id = id || null;
        this.selected = id;
        this.emitChange();
    },

    getProducts: function (filters) {
        filters = filters || {};

        var t = this,
            results = [];

        _.each(filters, function (filter) {
            _.some(t.products, function (product) {
                if (product['category'] && product['category'].indexOf(filter.name) !== -1) {
                    results.push(product);
                }
            });
        });
        return results.length ? results : t.products;
    },

    getProduct: function () {
        var t = this,
            filteredProduct = _.filter(t.products, function (product) {
            if (product.id === t.selected) {
                return true;
            }
        });
        return filteredProduct ? filteredProduct[0] : null
    },

    dehydrate: function () {
        return {
            products: this.products,
            selected: this.selected
        };
    },

    rehydrate: function (state) {
        this.products = state.products;
        this.selected = state.selected;
    }

});

module.exports = ProductStore;