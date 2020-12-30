// replace with json so you can use it in react app as well!!
module.exports = {
	"custom": {
		"http": "http://",
		"https": "https://",
		"acceptAll": "0.0.0.0",
		"baseUrl": ".jamesframpton.com:",
		"port": "5000",
		"external": {
			"clientService": "http://clientservice.jamesframpton.com:5000",
			"postService": "http://postservice.jamesframpton.com:5000",
			"commentService": "http://commentservice.jamesframpton.com:5000",
			"queryService": "http://queryservice.jamesframpton.com:5000",
			"moderatorService": "http://moderatorservice.jamesframpton.com:5000",
			"eventBus": "http://eventbus.jamesframpton.com:5000"
		},
		"client": {
			"subdomain": "client",
			"port": "3000"
		},
		"postService": {
			"subdomain": "postservice",
			"port": "4000"
		},
		"commentService": {
			"subdomain": "commentservice",
			"port": "4001"
		},
		"queryService": {
			"subdomain": "queryservice",
			"port": "4002"
		},
		"eventBus": {
			"subdomain": "eventbus",
			"port": "4005"
		},
		"moderatorService": {
			"subdomain": "moderatorservice",
			"port": "4003"
		}
	}
}