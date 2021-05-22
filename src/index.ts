import { getTable } from './services/api';
const dotenv = require('dotenv').config();
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/database', async (req, res) => {
    const logs = await getTable();
    res.json(logs);
});

app.listen(PORT, () => {
    console.log('🚀 Server launched on port 3000');
});

(async () => {
    const nTable = await getTable();
    console.log('client table: ', nTable);
})();
