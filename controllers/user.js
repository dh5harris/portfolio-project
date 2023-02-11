const mongodb = require('../db/connect');

// Get all users
const getAll = async(req, res) => {
  const result = await mongodb.getDb().db('portfolioproject').collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// Get a single user
const getUser = async(req, res) => {
	const username = {username: req.params.username};
	const result = await mongodb.getDb().db('portfolioproject').collection('users').find(username);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  }) 
}

// Create a user
const createUser = async(req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    birthdate: req.body.birthdate,
		themeID: req.body.themeID,
		skills: req.body.skills,
		projects: req.body.projects
  };
  const response = await mongodb.getDb().db('portfolioproject').collection('users').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating the contact.');
  }
}

// Update a user
const updateUser = async(req, res) => {
	const username = {username: req.params.username};
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    birthdate: req.body.birthdate,
		themeID: req.body.themeID,
		skills: req.body.skills,
		projects: req.body.projects
  };
  const response = await mongodb.getDb().db('portfolioproject').collection('users').replaceOne(username, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while updating the user.');
  }
}

// Delete a user
const deleteUser = async(req, res) => {
  const username = {username: req.params.username};
  const response = await mongodb.getDb().db('portfolioproject').collection('users').deleteOne(username);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occured while deleting the users.');
  }
}


module.exports = {getAll, getUser, createUser, updateUser, deleteUser};