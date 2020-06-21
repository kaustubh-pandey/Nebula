# Nebula API
## Instructions 
* Create a file token.json like this :
```
{
    "oauth_consumer_key" :"",
    "oauth_token" : "",
    "oauth_consumer_secret" : "",
    "oauth_token_secret" : ""
}
```
You can generate all the above values at twitter api website
* To run server :
```
npm start
```
* Default port is 3000
### Api endpoint
```
/api/search
```
is the endpoint to search. Make a post request with query = search_string in body of request
* Number of requests are limited as twitter standard api is used