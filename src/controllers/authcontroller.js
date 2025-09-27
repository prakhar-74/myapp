const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const store = require('../models/memorystore');
const SECRET = process.env.JWT_SECRET || 'devsecret';

exports.login = (req, res) => {
    const { username, password } = req.body || {};
    const user = store.users.find(u => u.username === username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = bcrypt.compareSync(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ sub: user.id, username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
};
