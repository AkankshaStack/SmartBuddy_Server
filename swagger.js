const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Smart Buddy API',
    description: 'Description',
  },
  host: `${process.env.SERVER_URL}`,
  schemes: ['https'],
};

const outputFile = './swagger.json'
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js')
})