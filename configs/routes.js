module.exports = {
    home: {
        path: '/',
        method: 'get',
        handler: require('../src/js/components/Products.jsx'),
        label: 'Home',
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', {
                title: "Single Page App using React, Fluxible, Node.js, Atomic CSS (Atomizer), Less.js, Grunt - Pavan Ratankar"
            });
            done();
        }
    },
    about: {
        path: '/product/:productId',
        method: 'get',
        handler: require('../src/js/components/Overlay.jsx'),
        label: 'About',
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', {
                title: "Product Selected"
            });
            done();
        }
    },
    dynamicpage: {
        path: '/filters/:filters',
        method: 'get',
        handler: require('../src/js/components/Products.jsx'),
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', {
                title: "Single Page App using React, Fluxible, Node.js, Atomic CSS (Atomizer), Less.js, Grunt - Pavan Ratankar"
            });
            done();
        }
    }
};