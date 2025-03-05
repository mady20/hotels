const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

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
    app.get(route.path, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', route.file));
    });
});

app.get('/new-york', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newyork.html'));
});
app.get('/paris', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'paris.html'));
});

app.get('/japan', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'osaka.html'));
});


app.use('/api/hotels', require('./routes/hotelRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
