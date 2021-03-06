const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const httpProxy = require("express-http-proxy");
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

const searchServiceProxy = httpProxy("http://twittersearch:3000");
const postServiceProxy = httpProxy("http://twitterpost:3000");
const retweetServiceProxy = httpProxy("http://twitterretweet:3000");
const authServiceProxy = httpProxy("http://auth:3000");

// MW
app.use(cors())
app.use(logger("short"))
app.use(helmet());
app.use(express.json())
app.use(bodyParser.json())

app.get("/", (req, res) => {
	res.send("api gateway")
})

app.get("/search/", (req, res, next) => {
	searchServiceProxy(req, res, next);
})

app.post("/post/", (req, res, next) => {
	postServiceProxy(req, res, next);
})

app.post("/retweet/:id", (req, res, next) => {
	retweetServiceProxy(req, res, next);
})

app.post("/auth", (req, res, next) => {
	authServiceProxy(req, res, next);
})

app.listen(process.env.PORT, () => {
	console.log(`gateway listen on port ${process.env.PORT}`)
})