const { faker } = require("@faker-js/faker");
const User = require("../models/User");
faker.locale = "es";

module.exports = async () => {
  const users = [];

  for (let i = 1; i <= 100; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: "username" + i,
      avatar: faker.image.avatar(),
      email: "usermail" + i + "@gmail.com",
      password: "1234",
      description: faker.hacker.phrase(),
    });
  }

  users.unshift({
    firstname: "admin",
    lastname: "admin",
    username: "admin.admin",
    avatar: faker.image.avatar(),
    email: "admin@gmail.com",
    password: "1234",
    description: faker.hacker.phrase(),
  });

  const createdUsers = await User.create(users);
  console.log("[Database] Se corrió el seeder de Users.");

  for (const user of createdUsers) {
    const randomFollower = faker.datatype.number({ min: 0, max: 99 });
    const randomFollow = faker.datatype.number({ min: 0, max: 99 });
    const follower = await User.findOne().skip(randomFollower);
    const follow = await User.findOne().skip(randomFollow);
    user.followers.push(follower);
    user.following.push(follow);
    user.save();
  }

};
