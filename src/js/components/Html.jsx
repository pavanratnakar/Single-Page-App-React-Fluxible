/** @jsx React.DOM */

var React = require("react");

var Html = React.createClass({
    render: function() {
        return (
            <html>
                <head lang="en">
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Single Page App using React, Fluxible, Node.js, Atomic CSS (Atomizer), Less.js, Grunt - Pavan Ratankar</title>
                    <link href="dist/style_less.min.css" rel="stylesheet" />
                </head>
                <body>
                    <section id="react-app" dangerouslySetInnerHTML={{__html: this.props.markup}}></section>
                    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                    <script src="dist/react/bundle.js"></script>
                </body>
            </html>
        );
    }
});

module.exports = Html;