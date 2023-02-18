const mongodb = require('../db/connect');
const { userSchema } = require('../validate/validate_schema');

// Get all users
const getAll = async(req, res) => {
	try{
		const result = await mongodb.getDb().db('portfolioproject').collection('users').find();
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists);
		});
	}
	catch(err) {
		res.status(500).json(err);
	}
};

// Get a single user
const getUser = async(req, res) => {
	try {
		const username = {username: req.params.username};
		if(!username) {
			res.status(400).send("A username is required");
		}
		const result = await mongodb.getDb().db('portfolioproject').collection('users').find(username);
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists[0]);
		}) 
	}	
	catch (err){
		res.status(500).json(err);
	}
}

// Create a user
const createUser = async(req, res) => {
	try {
		let user = {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
			birthdate: req.body.birthdate,
			themeName: req.body.themeName,
			skills: req.body.skills,
			projects: req.body.projects
		};
		user = await userSchema.validateAsync(user);
		console.log(user);
		const response = await mongodb.getDb().db('portfolioproject').collection('users').insertOne(user);
		if (response.acknowledged) {
			res.status(201).json(response);
		} else {
			res.status(500).json(response.error || 'An error occured while creating the contact.');
		}
	}
	catch(err) {
		res.status(500).json(err);
	}	
}

// Update a user
const updateUser = async(req, res) => {
	try {
		const username = {username: req.params.username};
		if(!username) {
			res.status(400).send("A username is required");
		}
		let user = {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
			birthdate: req.body.birthdate,
			themeName: req.body.themeName,
			skills: req.body.skills,
			projects: req.body.projects
		};
		user = await userSchema.validateAsync(user);
		const response = await mongodb.getDb().db('portfolioproject').collection('users').replaceOne(username, user);
		if (response.modifiedCount > 0) {
			res.status(204).send();
		} else {
			res.status(500).json(response.error || 'An error occured while updating the user.');
		}
	}
	catch(err) {
		res.status(500).json(err);
	}


}

// Delete a user
const deleteUser = async(req, res) => {
	try {
		const username = {username: req.params.username};
		if(!username) {
			res.status(400).send("A username is required");
		}
		const response = await mongodb.getDb().db('portfolioproject').collection('users').deleteOne(username);
		if (response.deletedCount > 0) {
			res.status(200).send();
		} else {
			res.status(500).json(response.error || 'An error occured while deleting the users.');
		}
	}
	catch(err) {
		res.status(500).json(err);
	}
}


module.exports = {getAll, getUser, createUser, updateUser, deleteUser};