const store = require('../models/memorystore');

exports.list = (_req, res) => {
    res.json(store.posts);
};

exports.create = (req, res) => {
    const nextId = Math.max(...store.posts.map(p => p.id), 0) + 1;
    const post = {
        id: nextId,
        title: req.body.title,
        body: req.body.body,
        authorId: req.user.sub
    };
    store.posts.push(post);
    res.status(201).json(post);
};
