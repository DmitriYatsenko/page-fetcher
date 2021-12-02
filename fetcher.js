/*
> node fetcher.js http://www.example.edu/ ./index.html
Downloaded and saved 3261 bytes to ./index.html
*/
const website = process.argv[2];
const filePath = process.argv[3];
const request = require('request');
const fs = require('fs');

const pageFetcher = function (website, filePath) {
    request(website, (error, response, body) => {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
        }
        else if (response && response.statusCode === 200) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            fileWrite(filePath, body);
        }
    });
}

const fileWrite = function (filePath, body) {
    fs.writeFile(filePath, body, err => {
        if (err) {
            console.error(err);
        }
        else {
            console.log(`Downloaded & saved ${fs.statSync(filePath).size} to ${filePath}`);
        }
    })
}

pageFetcher(website, filePath);