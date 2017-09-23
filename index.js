/**
 * Node.js client for the Untappd API (v4)
 * 
 * By: Matt Le
 */

const axios = require('axios');

class Untappd{
	constructor(accessToken){
		this.accessToken = accessToken;
	}

	/**
	 * Make request
	 * @param  {String}   method   GET or POST
	 * @param  {String}   path     Endpoint path
	 * @param  {Object}   params   Query paramters
	 * @param  {Object}   data     POST data (null for GET requests)
	 * @param  {Function} callback Callback (optional)
	 * @return {Promise}           Promise containing result
	 */
	req(method, path, params, data, callback) {
		if (!params) params = {};

		Object.keys(params).forEach(k => {
			if (params[k] == null) 
				delete params[k];
		});

		params.access_token = this.accessToken;

		return axios.request({
			url : path,
			method,
			baseURL : 'https://api.untappd.com',
			params,
			data
		}).then(({data}) => {
			if(callback){
				callback(null, data)
			}else{
				return data;
			}
		}).catch(err => {
			if(callback){
				callback(err);
			}else{
				throw(err);
			}
		})
	}

	/**
	 * Perform POST request
	 * @param  { String } path - URL path
	 * @param  { Object } params - Query parameters
	 * @param  { Object } data - The data to send in POST
	 * @param  { Function } callback - (Optional) callback (returns promise also)
	 * @return { Promise } - Promise containing data or exception
	 */
	post(path, params, data, callback){
		return this.req("POST",path,params,data,callback);
	}

	/**
	 * Perform GET request
	 * @param  { String } path - URL path
	 * @param  { Object } params - Query parameters
	 * @param  { Function } callback - (Optional) callback (returns promise also)
	 * @return { Promise } - Promise containing data or exception
	 */
	get(path, params, callback){
		return this.req("GET",path,params,null,callback);
	}

	validate(object, fields, path){
		fields.forEach(field => {
			if(object[field] == null){
				throw new Error(`Field ${field} cannot be null in ${path}`)
			}			
		});
	}

	/**
	 * Explicitly set the access token.  This method is useful if
	 * you have more than one access token and want to use a different
	 * token than the one specified in the constructor
	 * @param {String} token - Access token
	 */
	setAccessToken(token){
		this.accessToken = token;
	}

	/* -------------------- FEEDS ---------------------- */
	
	// https://untappd.com/api/docs#activityfeed
	activityFeed(data, callback) {
		data = data || {};
		return this.get("/v4/checkin/recent", data, callback);
	}

	// https://untappd.com/api/docs#useractivityfeed
	userActivityFeed(data, callback) {
		data = data || {};
		this.validate(data, ['USERNAME']);
		return this.get(`/v4/user/checkins/${data.USERNAME}`, data, callback);
	}

	// https://untappd.com/api/docs#theppublocal
	pubFeed(data, callback) {
		data = data || {};
		return this.get("/v4/thepub/local", data, callback);
	}

	// https://untappd.com/api/docs#venueactivityfeed
	venueActivityFeed(data, callback) {
		data = data || {};
		this.validate(data, ["VENUE_ID"])
		return this.get(`/v4/venue/checkins/${data.VENUE_ID}`, data, callback);
	}

	// https://untappd.com/api/docs#beeractivityfeed
	beerActivityFeed(data, callback) {
		data = data || {}
		this.validate(data, ['BID']);
		return this.get(`/v4/beer/checkins/${data.BID}`, data, callback);
	}

	// https://untappd.com/api/docs#breweryactivityfeed
	breweryActivityFeed(data, callback) {
		data = data || {};
		this.validate(data, ['BREWERY_ID']);
		return this.get(`/v4/brewery/checkins/${data.BREWERY_ID}`, data, callback);
	}

	// https://untappd.com/api/docs#notifications
	notifications(data, callback) {
		data = data || {};
		return this.get("/v4/notifications", data, callback);
	}

	/* --------------------- The INFO / SEARCH ------------------------- */

	// https://untappd.com/api/docs#userinfo
	userInfo(data, callback) {
		data = data || {};
		return this.get(`/v4/user/info/${(data.USERNAME || '')}`, data, callback);
	}

	// https://untappd.com/api/docs#userwishlist
	userWishList(data, callback) {
		data = data || {};
		return this.get(`/v4/user/wishlist/${(data.USERNAME || '')}`, data, callback);
	}

	// https://untappd.com/api/docs#userfriends
	userFriends(data, callback) {
		data = data || {};
		return this.get(`/v4/user/friends/${data.USERNAME || ''})`, data, callback);
	}

	// https://untappd.com/api/docs#userbadges
	userBadges(data, callback) {
		data = data || {};
		return this.get(`/v4/user/badges/${data.USERNAME || ''})`, data, callback);
	}

	// https://untappd.com/api/docs#userbeers
	userDistinctBeers(data, callback) {
		data = data || {};
		return this.get(`/v4/user/beers/${data.USERNAME || ''})`, data, callback);
	}

	// https://untappd.com/api/docs#breweryinfo
	breweryInfo(data, callback) {
		data = data || {};
		this.validate(data, ['BREWERY_ID']);
		return this.get(`/v4/brewery/info/${data.BREWERY_ID}`, data, callback);
	}

	// https://untappd.com/api/docs#beerinfo
	beerInfo(data, callback) {
		data = data || {};
		this.validate(data, ['BID']);
		return this.get(`/v4/beer/info/${data.BID}`, data, callback);
	}

	// https://untappd.com/api/docs#venueinfo
	venueInfo(data, callback) {
		data = data || {};
		this.validate(data, ['VENUE_ID']);
		return this.get(`/v4/venue/info/${data.VENUE_ID}`, data, callback);
	}

	// https://untappd.com/api/docs#beersearch
	beerSearch(data, callback) {
		data = data || {};
		this.validate(data, ['q']);
		return this.get("/v4/search/beer", data, callback);
	}

	// https://untappd.com/api/docs#brewerysearch
	brewerySearch(data, callback) {
		data = data || {};
		this.validate(data, ['q']);
		return this.get("/v4/search/brewery", data, callback);
	}

	/* ---------------------- Actions -------------------------- */

	// https://untappd.com/api/docs#checkin
	checkin(data, callback) {
		data = data || {};
		this.validate(data, ['gmt_offset', 'timezone', 'bid']);
		return this.post("/v4/checkin/add", {} , data, callback);
	}

	// https://untappd.com/api/docs#toast
	// If already toasted, this will untoast, otherwise it toasts.
	toast(data, callback) {
		data = data || {};
		this.validate(data, ['CHECKIN_ID']);
		return this.get(`/v4/checkin/toast/${data.CHECKIN_ID}`, data, callback);
	}

	// https://untappd.com/api/docs#pendingfriends
	pendingFriends(data, callback) {
		data = data || {};
		return this.get("/v4/user/pending", data, callback);
	}

	// https://untappd.com/api/docs#addfriend
	requestFriends(data, callback) {
		data = data || {};
		this.validate(data, ['TARGET_ID']);
		return this.get(`/v4/friend/request/${data.TARGET_ID}`, data, callback);
	}

	// https://untappd.com/api/docs#removefriend
	removeFriends(data, callback) {
		data = data || {};
		this.validate(data, ['TARGET_ID']);
		return this.get(`/v4/friend/remove/${data.TARGET_ID}`, data, callback);
	}

	// https://untappd.com/api/docs#acceptfriend
	acceptFriends(data, callback) {
		data = data || {};
		this.validate(data, ['TARGET_ID']);
		return this.post(`/v4/friend/accept/${data.TARGET_ID}`, {}, data, callback);
	}

	// https://untappd.com/api/docs#rejectfriend
	rejectFriends(data, callback) {
		data = data || {};
		this.validate(data, ['TARGET_ID']);
		return this.post(`/v4/friend/reject/${data.TARGET_ID}`, {}, data, callback);
	}

	// https://untappd.com/api/docs#addcomment
	addComment(data, callback) {
		data = data || {};
		this.validate(data, ['CHECKIN_ID', 'shout']);
		return this.post(`/v4/checkin/addcomment/${data.CHECKIN_ID}`, {}, data, callback);
	}

	// https://untappd.com/api/docs#removecommment
	removeComment(data, callback) {
		data = data || {};
		this.validate(data, ['COMMENT_ID']);
		return this.post(`/v4/checkin/deletecomment/${data.COMMENT_ID}`, {}, data, callback);
	}

	// https://untappd.com/api/docs#addwish
	addToWishList(data, callback) {
		data = data || {};
		this.validate(data, ['bid']);
		return this.get("/v4/user/wishlist/add", data, callback);
	}

	// https://untappd.com/api/docs#removewish
	removeFromWishList(data, callback) {
		data = data || {};
		this.validate(data, ['bid']);
		return this.get("/v4/user/wishlist/remove", data, callback);
	}

	// https://untappd.com/api/docs#foursquarelookup
	foursquareVenueLookup(callback, data) {
		data = data || {};
		this.validate(data, ['VENUE_ID']);
		return this.get(`/v4/venue/foursquare_lookup/${data.VENUE_ID}`, data, callback);
	}
}

module.exports = Untappd;