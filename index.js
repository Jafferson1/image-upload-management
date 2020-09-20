require('dotenv').config();
const app = require('./app');
const server = require('http').Server(app);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});