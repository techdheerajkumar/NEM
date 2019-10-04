const express = require('express');
const app = express();
const morgan = require('morgan'); //3rd party middleware
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//1) Middlewares
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json()); //middleware
app.use(express.static(`${__dirname}/public`)); //get static files not folders

app.use((req, res, next) => {
	console.log('hello from the middleware');
	next(); //Without calling next function server can't send response to client
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
