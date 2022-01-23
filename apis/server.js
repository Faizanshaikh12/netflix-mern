import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connection} from "./db/config.js";
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import movieRoute from './routes/movies.js';
import listRoute from './routes/lists.js';

dotenv.config();

const app = express();
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000']
}
app.use(cors(corsOptions));
app.use(express.json({limit: '120mb'}));
connection();
const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(PORT, () => {
    console.log(`Server Running ${PORT}`);
})
