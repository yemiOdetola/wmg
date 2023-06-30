import firebase from '@react-native-firebase/app';
var serviceAccount = require('path/to/serviceAccountKey.json');
// Add your Firebase configuration details here
const firebaseConfig = {
  apiKey: '<YOUR_API_KEY>',
  authDomain: '<YOUR_AUTH_DOMAIN>',
  projectId: '<YOUR_PROJECT_ID>',
  appId: '<YOUR_APP_ID>',
};

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
