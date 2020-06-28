const handleRegister = (req,res,knex,bcrypt) => {
    const {email, name, password} = req.body;
    if(!email || !password || !name){
        return res.status(400).send('Please complete the form');
    }
    const hash = bcrypt.hashSync(password)
    knex.transaction(trx =>{
      trx.insert({
        hash:hash,
        email:email
      })
      .into('login')
      .returning('email')
      .then(loginEmail =>{
        return trx('users').returning('*')
        .insert({
          email:loginEmail[0],
          name:name,
          joined:new Date()
          })
          .then(response => {
              res.json(response[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(error=>res.status(400).json("error I never give DB info to client"))
}

module.exports = {
    handleRegister: handleRegister
};