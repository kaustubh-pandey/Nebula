# Nebula
A real time search engine to search tweets using Twitter API.

### Nebula UI 

![NebulaUI](https://github.com/kaustubh-pandey/Nebula/blob/master/NebulaUIScreenshot.png)

Supports pagination with 10 results per page

![NebulaPagination](https://github.com/kaustubh-pandey/Nebula/blob/master/NebulaPagination.png)

## About

### NebulaUI

NebulaUI uses Angular 9 to show tweets as search results similar to google search user interface

### NebulaAPI

NebulaAPI consumes the TwitterAPI and performs the OAuth1.0 authentication with Twitter Standard API. Since the number of 

requests on Standard API is limited, please check the limits on twitter website. NebulaAPI uses ExpressJS

## Requirements
```
Node >= 10.21.0
npm >= 6.14.4
Angular >= 9
```
### NOTE : Before build and run, create the token file in NebulaAPI as mentioned here https://github.com/kaustubh-pandey/Nebula/blob/master/NebulaAPI/README.md
## To Build and run
```
git clone https://github.com/kaustubh-pandey/Nebula.git
cd Nebula/NebulaUI
npm install
ng build --prod
cd ../NebulaAPI
npm install
npm start
```
Open localhost:3000 in browser




