
# Inital Setup
- npm install sequelize pg
- sequelize init
- edit config file
- createdb
- sequelize db:migrate

## Creating a Model
- sequelize model:create --name User --attributes 'username:string password:string'

```js
User.prototype.auth = function(password) {
  return bcrypt.compareSync(password, this.password)
};
```

```js
username: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
},
password: {
  type: DataTypes.STRING,
  allowNull: false,
  set(pass) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);
    this.setDataValue('password', hash);
  }
}
```

```js
router.post('/login', (req, res) => {
  models.User.find({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if(user.auth(req.body.password)){
      console.log('successful login');
      res.redirect('/home');
    } else {
      console.log('password wrong');
      res.redirect('/login')
    }
  })
  .catch(err => {
    console.log('problem logging in');
    res.redirect('/login')
  })
});
```
