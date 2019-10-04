//Starting the Server
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env); // tells the environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('running on port ' + PORT + '...');
});
