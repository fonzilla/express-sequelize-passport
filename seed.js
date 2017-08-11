const models = require('./models');


models.User.create({
  username:'fonzilla',
  password:'test',
  createdAt: Date.now(),
  updatedAt: Date.now()
})
.then(result => {
  console.log(result);
})
