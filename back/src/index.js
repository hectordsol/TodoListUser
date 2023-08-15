import app from './server.js';
import {connectDB} from './db.js'

connectDB();
const PORT=4001;
app.listen(PORT);
console.log("Server in port: ",PORT);