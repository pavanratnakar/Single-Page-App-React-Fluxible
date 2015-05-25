/** @jsx React.DOM */

var React = require("react"),
    RouteStore = require("../stores/RouteStore"),
    ApplicationStore = require("../stores/ApplicationStore"),
    ProductStore = require("../stores/ProductStore"),
    CategoryStore = require("../stores/CategoryStore"),
    FluxibleMixin = require("fluxible/addons/FluxibleMixin"),
    RouterMixin = require("fluxible-router").RouterMixin,
    navigateAction = require("fluxible-router").navigateAction,
    productActions = require("../actions/ProductActions"),
    categoryActions = require("../actions/CategoryActions"),
    _ = require("lodash");

// Export the ReactApp component
var ReactApp = React.createClass({

    mixins: [RouterMixin, FluxibleMixin],

    statics: {
        storeListeners: [ApplicationStore, ProductStore, CategoryStore]
    },

    onChange: function () {
        var t = this,
            state = t.getState(),
            tr = "/",
            filters = [];

        t.currentProps.products = state.products;
        t.currentProps.product = state.product;
        t.currentProps.categories = state.categories;
        _.each(state.categories, function (category) {
            if (category.value) {
                filters.push(category.id)
            }
        });

        if (state.product.id) {
            tr = "/product/" + state.product.id;
        } else if (filters.length > 0) {
            tr = "/filters/{\"category\":" + JSON.stringify(filters) + "}";
        }
        // t.props.context.executeAction(navigateAction, {
        //     type: "click",
        //     url: "/product",
        //     params: {

        //     }
        // });
    },

    getState: function () {
        var productStore = this.getStore(ProductStore),
            categoryStore = this.getStore(CategoryStore);

        return {
            page: this.getStore(ApplicationStore).getState(),
            products: productStore.getProducts(categoryStore.getActiveCategories()),
            product: productStore.getProduct() || {},
            categories: categoryStore.getCategories()
        };
    },

    showProductPage: function () {
        $(".single-product").addClass("visible");
    },

    showProductsPage: function () {
        $(".all-products").addClass("visible");
    },

    showNotFound: function () {
        $(".error").addClass("visible");
    },

    getInitialState: function () {
        // Set initial application state using props
        this.currentProps = {};
        return this.getState();
    },

    renderPage: function () {
        var t = this;

        $(".main-content .page").removeClass("visible");

    },

    loadPage: function () {
        var t = this,
            route = t.getStore(RouteStore).getCurrentRoute();

        if (route.get("name") === "notFound") {
            t.showNotFound();
        } else {
            if (route.get("params").get("productId")) {
                t.showProductPage();
            } else {
                t.showProductsPage();
            }
        }
    },

    componentDidUpdate: function () {
        this.loadPage();
        return true;
    },

    componentWillMount: function () {
        var t = this,
            state = {},
            route = t.getStore(RouteStore).getCurrentRoute();

        if (route.get("name") === "notFound") {
            state = {};
        } else {
            if (route.get("params").get("productId")) {
                t.props.context.executeAction(productActions, {
                    type: "selectProduct",
                    data: route.get("params").get("productId")
                }, function () {});
            }
            if (route.get("params").get("filters")) {
                var f = JSON.parse(route.get("params").get("filters"));
                _.each(f.category, function (category) {
                    t.props.context.executeAction(categoryActions, {
                        type: "selectCategory",
                        data: category
                    });
                });
            }
            state = t.getState();
        }
        state = t.getState();
        t.currentProps = state;
    },

    componentDidMount: function () {
        this.loadPage();
    },

    render: function () {
        var t = this,
            Handler = t.getStore(RouteStore).getCurrentRoute().get("handler");

        return (
            <div className="main-content Bxz(bb) Ta(c) M(a) Mstart(45px) Mend(60px) Pstart(40px) Pend(40px) Mx(auto)--sm My(45px)--sm Px(24px)--sm Py(0)--sm">
                <Handler {...t.currentProps} context={t.props.context} />
            </div>
        )
    }
});

module.exports = ReactApp;