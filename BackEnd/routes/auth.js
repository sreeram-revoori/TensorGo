const express = require('express');
const router = express.Router();
const { verifyGoogleToken } = require('./googleAuth'); 

router.post('/google-auth', async (req, res) => {
  const { idToken } = req.body; 

  if (!idToken) {
    return res.status(400).json({ error: 'No ID token provided' });
  }

  const verificationResult = await verifyGoogleToken(idToken);

  if (verificationResult.success) {
    
    return res.status(200).json({ message: 'User authenticated', uid: verificationResult.uid });
  } else {
    return res.status(401).json({ error: verificationResult.error });
  }
});

module.exports = router;
