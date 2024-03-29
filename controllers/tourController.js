const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkBody = (req, res, next) => {
	if (!req.body.name || !req.body.price) {
		return res.status(404).json({
			status: 'fail',
			message: ' missing name or price'
		});
	}
	next();
};

//2) Route Handlers
exports.getAllTours = (req, res) => {
	res.status(200).json({
		requestedTime: req.requestTime,
		status: 'success',
		results: tours.length,
		data: {
			tours
		}
	});
};

exports.getTour = (req, res) => {
	console.log(req.params);
	const id = req.params.id * 1;

	if (id > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid Id'
		});
	}
	const tour = tours.find((el) => el.id === id);
	res.status(200).json({
		status: 'success',
		data: {
			tour
		}
	});
};

exports.addTour = (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);
	fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
		res.status(201).json({
			status: 'success',
			data: {
				tour: newTour
			}
		});
	});
};

exports.updateTour = (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid Id'
		});
	}
	res.status(200).json({
		status: 'success',
		data: {
			tour: '<Updated tour here...>'
		}
	});
};

exports.deleteTour = (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid Id'
		});
	}
	res.status(204).json({
		status: 'success',
		data: null
	});
};
