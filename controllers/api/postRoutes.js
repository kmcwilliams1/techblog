const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const body = req.body;
  console.log("hello")
  console.log(body)
  try {
    const newPost = await Post.create({ ...body, user_id: req.session.user_id });
    res.json(newPost);
  } catch (err) {
    console.log(err) 
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    console.log('hello')
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      post: post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});




router.delete('/:id', withAuth, async (req, res) => {
  try {
    const affectedRows = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
