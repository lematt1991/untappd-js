Untappd API (Node.js)
---------------------

A Node.js client for the Untappd API.  Documentation for the API can be found [here](https://untappd.com/api/docs)


Usage
------

```Javascript
const Untappd = require("untappd-js");
client = new Untappd(process.env.ACCESS_TOKEN);
client.pubFeed({lat, lon})
	.then(data => ...)
```