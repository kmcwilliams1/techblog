const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');




router.post('/', async (req, res) => {
  // create a new message
  try {
    const commentData = await Comment.create({
        id: req.params.id
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});
   
router.delete('/:id', async (req, res) => {
    // delete message by its `id` value
    try{
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id
        },
      })
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;