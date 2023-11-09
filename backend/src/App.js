import express from 'express';
import cors from 'cors';
import { router } from './router.js';

const app = express();

app.use(cors()); // Adicione esta linha antes de adicionar as outras middlewares
app.use(express.json());
app.use(router);

export { app };
