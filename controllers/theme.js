const mongodb = require('../db/connect');
const { themeSchema } = require('../validate/validate_schema');


const getAll = async(req, res) => {
  const result = await mongodb.getDb().db('portfolioproject').collection('themes').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// const getTheme = async(req, res) => {
// 	const themeName = req.params.themeName;
// 	const result = await mongodb.getDb().db('portfolioproject').collection('themes').find(themeName);
// 	result.toArray().then((lists) => {
// 		res.setHeader('Content-Type', 'application/json');
// 		res.status(200).json(lists[0]);
// 	});
// };

const createTheme = async(req, res) => {
  let theme = {
    themeName: req.body.themeName,
    fontSize: req.body.fontSize,
    fontColor: req.body.fontColor,
    backgroundColor: req.body.backgroundColor
  };
	theme = await themeSchema.validateAsync(theme);
  const response = await mongodb.getDb().db('portfolioproject').collection('themes').insertOne(theme);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating the themes.');
  }
}

// const getSingle = async(req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const result = await mongodb.getDb().db('portfolioproject').collection('themes').find({_id: userId});
//   result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists[0]);
//   }) 
// }

// const updateTheme = async(req, res) => {
// 	const userId = new ObjectId(req.params.id);
//   const theme = {
//     themeName: req.body.themeName,
//     fontSize: req.body.fontSize,
//     fontColor: req.body.fontColor,
//     backgroundColor: req.body.backgroundColor
//   };
//   const response = await mongodb.getDb().db('portfolioproject').collection('themes').replaceOne({_id: userId}, theme);
//   console.log(response);
//   if (response.modifiedCount > 0) {
//     res.status(204).send();
//   } else {
//     res.status(500).json(response.error || 'An error occured while updating the theme.');
//   }
// }

// const deleteTheme = async(req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const response = await mongodb.getDb().db('portfolioproject').collection('themes').deleteOne({_id: userId}, true);
//   console.log(response);
//   if (response.deletedCount > 0) {
//     res.status(200).send();
//   } else {
//     res.status(500).json(response.error || 'An error occured while deleting the theme.');
//   }
// }
// module.exports = {getAll, getSingle, createTheme, updateTheme, deleteTheme};
module.exports = {createTheme, getAll}