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
// app.use(helmet());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],  // ⚠ Allows all inline scripts
        },
    }
}));

app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

app.use('/', require('./routes/pageRoutes'));
app.use('/api/hotels', require('./routes/hotelRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
