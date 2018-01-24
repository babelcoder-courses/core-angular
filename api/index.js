const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const uuid = require('uuid/v4');
const db = require('./db');
const auth = require('./auth');

const PORT = 3000;
const app = express();

app.use(auth);
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function genToken(user) {
  return jwt.sign({ sub: user.id }, 'SECRET KEY', { expiresIn: '1h' });
}

function handleUnauthorizedArticle(res, action) {
  res.status(401).json({
    article: {
      errors: [`You are not allowed to ${action} the article.`]
    }
  });
}

function paginateArticles(page = 1) {
  const startIndex = (page - 1) * 5;

  return db.articles.slice(startIndex, startIndex + 5);
}

app.get('/api/users', (_, res) => {
  res.json({ users: db.users });
});

app.post('/api/users', async (req, res) => {
  const { email, password, name } = req.body.user;
  const user = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 12, (err, hash) => {
      if (err) return reject(err);

      const user = { id: uuid(), email, name, password: hash };

      db.users.push(user);
      return resolve({ id: user.id, email: user.email, name: user.name });
    });
  });

  res
    .header('Authorization', `Bearer ${genToken(user)}`)
    .status(201)
    .json({ user });
});

app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body.user;
  const user = db.users.find(user => user.email === email);
  const isValid = await new Promise((resolve, reject) => {
    const hash = user.password;

    bcrypt.compare(password, hash, (err, isValid) => {
      if (err) return reject(err);
      return resolve(isValid);
    });
  });

  if (isValid) {
    res
      .header('Authorization', `Bearer ${genToken(user)}`)
      .status(201)
      .json({ user: { id: user.id, email: user.email, name: user.name } });
  } else {
    res.status(401).json({
      user: {
        errors: ['Invalid credentials.']
      }
    });
  }
});

app.get('/api/articles/:articleId', (req, res) => {
  const { articleId } = req.params;
  const article = db.articles.find(article => article.id === articleId);

  res.json({
    article: {
      ...article,
      authorName: db.users.find(user => user.id === article.authorId).name
    }
  });
});

app.get('/api/articles', (req, res) => {
  const articles = paginateArticles(req.query.page).map(article => ({
    ...article,
    authorName: db.users.find(user => user.id === article.authorId).name
  }));

  res.json({ articles, count: db.articles.length });
});

app.post('/api/articles', (req, res) => {
  if (req.user) {
    const article = {
      ...req.body.article,
      id: uuid(),
      authorId: req.user.id
    };

    db.articles.push(article);

    res.json({ article });
  } else {
    handleUnauthorizedArticle(res, 'create');
  }
});

app.patch('/api/articles/:articleId', (req, res) => {
  if (!req.user) return handleUnauthorizedArticle(res, 'edit');

  const articles = db.articles;
  let articleIndex = db.articles.findIndex(
    article =>
      article.id === req.params.articleId && article.authorId === req.user.id
  );

  if (articleIndex === -1) {
    return handleUnauthorizedArticle(res, 'edit');
  }

  const article = { ...articles[articleIndex], ...req.body.article };

  db.articles = [
    ...articles.slice(0, articleIndex),
    article,
    ...articles.slice(articleIndex + 1)
  ];

  res.json({ article });
});

app.listen(PORT, () =>
  console.log('App listening on http://localhost:' + PORT)
);
