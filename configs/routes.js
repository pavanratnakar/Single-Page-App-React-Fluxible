module.exports = {
    products: {
        path: '/',
        method: 'get',
        handler: require('../src/js/components/Products.jsx'),
        label: "home",
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', {
                title: "Single Page App using React, Fluxible, Node.js, Atomic CSS (Atomizer), Less.js, Grunt - Pavan Ratankar"
            });
            done();
        }
    },
    product: {
        path: '/product/:productId',
        method: 'get',
        handler: require('../src/js/components/Overlay.jsx'),
        label: "product",
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', {
                title: "Product Selected"
            });
            done();
        }
    },
    filters: {
        path: '/filters/:filters',
        method: 'get',
        handler: require('../src/js/components/Products.jsx'),
        label: "filters",
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', {
                title: "Single Page App using React, Fluxible, Node.js, Atomic CSS (Atomizer), Less.js, Grunt - Pavan Ratankar"
            });
            done();
        }
    },
    notFound: {
        path: '*',
        method: 'get',
        handler: require('../src/js/components/Error.jsx'),
        label: "notFound",
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', {
                title: "Page not found"
            });
            done();
        }
    }
};