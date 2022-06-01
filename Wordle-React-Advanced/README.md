## Project
A `React` native version of the game `Wordle` using `Typescript` and functional programming paradigm. The original game can be played online at his [link](https://www.nytimes.com/games/wordle/index.html).


## Requirements
* Node.js 
* Typescript

## Installing Expo CLI
* Run `npm install --global expo-cli` to install expo as a local dependency
* Run `npm install` to install the dependencies of the project

## Starting the development server
* `cd` into the app folder
* `expo start` to run the expo CLI. Click on the link in the command line http://localhost:19002. Here you have the same options to run your app as with Expo snack, like browser, android and ios). Running on the emulators requires additional configuration (not explained here)

## How to run the tests
* `npm i -D chai mocha nyc ts-node typescript`
* `npm i -D @types/chai @types/mocha`
* `npm run test` run the tests

## How to run the application on your mobile phone
* Install the [Expo Go](https://expo.dev/client) application on your smartphone.
* Connect with your smartphone to the same network as you local machine (e.g. Wi-fi).
* Open the `Expo Go` app on your smartphone and select `Scan QR code`.
* Scan the QR code on the bottom left corner of the Expo Developer Tools webpage (on http://localhost:19002/).
* The application will open up on your smartphone
* Please note that on `iOS` you might not find the `QR Code` option, in that case you will need to manually enter the url of the expo snack demo, see [Readme](../README.md)

## Author
Samuel Dalvai