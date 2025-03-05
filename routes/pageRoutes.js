const express = require('express');
const path = require('path');
const router = express.Router();

const routes = [
    { path: '/', file: 'index.html' },
    { path: '/auth', file: 'auth.html' },
    { path: '/book', file: 'book.html' },
    { path: '/events', file: 'events.html' },
    { path: '/dining', file: 'dining.html' },
    { path: '/contact', file: 'contact.html' },
    { path: '/about', file: 'about.html' },
];

routes.forEach(route => {
    router.get(route.path, (req, res) => {
        res.sendFile(path.join(__dirname, '../public', route.file));
    });
});

// Additional specific routes
router.get('/new-york', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'newyork.html'));
});

router.get('/paris', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'paris.html'));
});

router.get('/japan', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'osaka.html'));
});

module.exports = router;
