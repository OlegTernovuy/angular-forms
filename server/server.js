const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

const postsData = require('./data/posts.json');

server.use(middleware);
server.use(jsonServer.bodyParser);

server.get('/posts', (req, res) => {
  res.status(200).send(postsData.posts);
});

server.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = postsData.posts.find(post => post.id === postId);
  if (post) {
    res.status(200).send(post);
  } else {
    res.status(404).send({ message: 'Post no found' })
  }
});

server.post('/posts', (req, res) => {
  const newPost = req.body;
  newPost.id = postsData.posts.length ? postsData.posts[postsData.posts.length - 1].id + 1 : 1;
  postsData.posts.push(newPost);
  res.status(200).send(newPost);
});

server.patch('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  let post = postsData.posts.find(post => post.id === postId);
  if (post) {
    const updatedPost = { ...post, ...req.body };
    post = updatedPost;
    res.status(200).send(post);
  } else {
    res.status(404).send({ message: 'Post no found' })
  }
});

server.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  let post = postsData.posts.find(post => post.id === postId);
  if (post) {
    postsData.posts = postsData.posts.filter(post => post.id !== postId)
    res.status(200).send(post);
  } else {
    res.status(404).send({ message: 'Post no found' })
  }
});

server.listen(3001, () => {
  console.log('Server is running');
});
