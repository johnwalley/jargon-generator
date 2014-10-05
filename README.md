# Jargon Generator

Leverage synergies going forward.

[Live Demo](http://johnwalley.github.io/jargon-generator/)

[![Build Status](https://travis-ci.org/johnwalley/jargon-generator.png)](https://travis-ci.org/johnwalley/jargon-generator)

### Local Development

If you want to edit the web app locally, you can run the server by typing:

    npm install
    node scripts/web-server.js

Now you can navigate to `http://localhost:8000` and see your jargon generator while you edit it.  __Note__: You have to restart the server when you make changes to
see them.

### Customisation

If you want to customise the web app you need to modify the Config constant defined in [services.js](app/js/services.js). It currently has a single property: title. This is used for the page title and header.

    constant('Config', {
  	  title: "Database"
    })
    
You must also swap in your own Parse.com API keys. These are currently stored in [services.js](app/js/services.js) in the `ParseServices` module.
    
