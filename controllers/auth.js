

// req.isAuthenticated is provided from the auth router
const getAuth = (req, res) => {
	res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
}

// To test middleware authentication
// const getProfile = (req, res) => {
// 	res.send(JSON.stringify(req.oidc.user))
// }

module.exports = {getAuth};