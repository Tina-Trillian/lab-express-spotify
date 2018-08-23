const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const app = express();
const hbs = require('hbs');

// Remember to paste here your credentials
const clientId = '52aa4b2270ce4d8585f5c2742266943b', // TO CHANGE
    clientSecret = 'e5d45c3d41b949f28e296e63f86ee7ed'; // TO CHANGE 

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});


// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log("The access token is " + data.body["access_token"])
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
}).then(() => {

spotifyApi.searchArtists('Love').then(
  function(data) {
    console.log('Artist albums', data.body);
  },
  function(err) {
    console.error(err);
  }
)})

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/', (req,res,next) => {
  res.render('layouts/index')
})

app.get("/artists", (req,res,next) => {
  console.log(req.query);
  spotifyApi.searchArtists('Love').then(
    function(data) {
      res.send(data.body);
    },
    function(err) {
      console.error(err);
    }
  )
})

app.listen(4000, () => {
  console.log("Server listening on port 4000");
})

