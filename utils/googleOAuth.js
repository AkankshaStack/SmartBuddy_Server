const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID);
const verify = async (token) => {
  const ticket = await client.verifyIdToken({
      idToken: token.tokenId,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  return ticket;
};
module.exports = verify;