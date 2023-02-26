const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: 'My API',
		description: 'Contacts'
	},
	host: 'three41-portfolio-project.onrender.com',
	schemes: ['https'],
	securityDefinitions: {
    oAuthSample: {
      type: 'oauth2',
      authorizationUrl: 'https://three41-portfolio-project.onrender.com/profile',
      flow: 'implicit',
      scopes: {
        read_users: 'read a user in the database',
        write_users: 'modify a uesr in the datbase'
      }
    }
  }
};

const outputfile = 'swagger.json';
const endppoointFiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endppoointFiles, doc);