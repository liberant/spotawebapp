const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const glob = require('glob')
const camelCase = require('camelcase')
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.


const files = glob.sync('./**/*.f.js', { cwd: __dirname, ignore: './node_modules/**' })
for (let f = 0, fl = files.length; f < fl; f++) {
  const file = files[f]
  const functionName = camelCase(file.slice(0, -5).split('/').join('_')) // Strip off '.f.js'
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    exports[functionName] = require(file)
  }
}
