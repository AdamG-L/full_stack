const User = require('../models/user')

const getUsers = async () => {
    const users = await User.find({})
    return users.map(e => e.toJSON())
}

const initialUsers = [
    {
      username: "SillyKuro",
      name: "Kuro",
      password: "password"
    },
    {
      username: "SillyMiyu",
      name: "Miyu",
      password: "password"
    }
  ]

module.exports = { getUsers, initialUsers }