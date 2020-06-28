const Clarifai = require('clarifai');

// use the api key ko
  const app = new Clarifai.App({
  apiKey: '52935f0a5f3044228ffd7c2cc658169a'
});

const handleAPICall = (req, res) =>{
app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
.then( data => {
    res.json(data)
})
.catch(err=>res.status(400).json('Unable to work with API'))
}

const rankIncrement = (req,res,knex) =>{
    const{id} = req.body;
    knex('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    })
    .catch(err => res.status(400).json("unable to get entries"))
  }

  module.exports = {
      rankIncrement:rankIncrement,
      handleAPICall:handleAPICall
  }