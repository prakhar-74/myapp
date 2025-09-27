const bcrypt = require('bcryptjs');

// Store password hash for "admin:password"
const passwordHash = bcrypt.hashSync('password', 10);

module.exports = {
    users: [{ id: 1, username: 'admin', passwordHash }],
    posts: [{ id: 1, title: 'Hello', body: 'World', authorId: 1 }]
};
