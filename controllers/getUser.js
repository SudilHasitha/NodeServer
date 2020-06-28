const getUserByID = (req,res,knex) =>{
    const {id } = req.params;
    knex.select('*').from('users').where({id: id})
    .then(user => {
      if(user.length){
      res.json(user[0])
      }
      else if(!user.length){
        res.json("Not found")
      }
    })
      .catch(err=>res.status(400).json('Error getting user'))
  }

  module.exports = {
      getUserByID:getUserByID
  }