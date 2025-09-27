const router = require('express').Router();
const guard = require('../middleware/authGuard');
const { list, create } = require('../controllers/postscontroller');

router.get('/', list);
router.post('/', guard, create);

module.exports = router;
