const admin = require('firebase-admin');


const serviceAccount = require('firebase_server_account.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  d
});


async function verifyGoogleToken(idToken) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    return { success: true, uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = { verifyGoogleToken };
