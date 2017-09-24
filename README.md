Untappd API (Node.js)
---------------------

A Node.js client for the Untappd API.  The original documentation for the API can be found [here](https://untappd.com/api/docs)


Usage
------

```Javascript
const Untappd = require("untappd-js");
client = new Untappd(process.env.ACCESS_TOKEN);
client.pubFeed({lat, lon})
	.then(data => ...)
```

API
----

All methods are of the form `method(data, [callback])`.  If the callback is not supplied, then the method returns a promise.

### Feeds
- `userActivityFeed`: [`/v4/user/checkins/[USERNAME]`](https://untappd.com/api/docs#useractivityfeed)
- `pubFeed`: [`/v4/thepub/local`](https://untappd.com/api/docs#theppublocal)
- `venueActivityFeed`: [`/v4/venue/checkins/[VENUE_ID]`](https://untappd.com/api/docs#venueactivityfeed)
- `beerActivityFeed`: [`/v4/beer/checkins/${data.BID}`](https://untappd.com/api/docs#beeractivityfeed)
- `breweryActivityFeed`: [`/v4/brewery/checkins/[BREWERY_ID]`](https://untappd.com/api/docs#breweryactivityfeed)
- `notifications`: [`/v4/notifications`](https://untappd.com/api/docs#notifications)

### Info / Search
- `userInfo`: [`/v4/user/info/[USERNAME]`](https://untappd.com/api/docs#userinfo)
- `userWishList`: [`/v4/user/wishlist/[USERNAME]`](https://untappd.com/api/docs#userwishlist)
- `userFriends`: [`/v4/user/friends/[USERNAME]`](https://untappd.com/api/docs#userfriends)
- `userBadges`: [`/v4/user/badges/[USERNAME]`](https://untappd.com/api/docs#userbadges)
- `userDistinctBeers`: [`/v4/user/beers/[USERNAME]`](https://untappd.com/api/docs#userbeers)
- `breweryInfo`: [`/v4/brewery/info/[BREWERY_ID]`](https://untappd.com/api/docs#breweryinfo)
- `beerInfo`: [`/v4/beer/info/${data.BID}`](https://untappd.com/api/docs#beerinfo)
- `venueInfo`: [`/v4/venue/info/[VENUE_ID]`](https://untappd.com/api/docs#venueinfo)
- `beerSearch`: [`/v4/search/beer`](https://untappd.com/api/docs#beersearch)
- `brewerySearch`: [`/v4/search/brewery`](https://untappd.com/api/docs#brewerysearch)

### Action
- `checkin`: [`/v4/checkin/add`](https://untappd.com/api/docs#checkin)
- `toast`: [`/v4/checkin/toast/[CHECKIN_ID]`](https://untappd.com/api/docs#toast)
- `pendingFriends`: [`/v4/user/pending`](https://untappd.com/api/docs#pendingfriends)
- `requestFriends`: [`/v4/friend/request/[TARGET_ID]`](https://untappd.com/api/docs#addfriend)
- `removeFriends`: [`/v4/friend/remove/[TARGET_ID]`](https://untappd.com/api/docs#removefriend)
- `acceptFriends`: [`/v4/friend/accept/[TARGET_ID]`](https://untappd.com/api/docs#acceptfriend)
- `rejectFriends`: [`/v4/friend/reject/[TARGET_ID]`](https://untappd.com/api/docs#rejectfriend)
- `addComment`: [`/v4/checkin/addcomment/[CHECKIN_ID]`](https://untappd.com/api/docs#addcomment)
- `removeComment`: [`/v4/checkin/deletecomment/[COMMENT_ID]`](https://untappd.com/api/docs#removecommment)
- `addToWishList`: [`/v4/user/wishlist/add`](https://untappd.com/api/docs#addwish)
- `removeFromWishList`: [`/v4/user/wishlist/remove`](https://untappd.com/api/docs#removewish)

### Utilities
- `foursquareVenueLookup`: [`/v4/venue/foursquare_lookup/[VENUE_ID]`](https://untappd.com/api/docs#foursquarelookup)