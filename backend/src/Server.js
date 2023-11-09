import { app } from './App.js';
import { config } from "dotenv";

config();

const PORT = process.env.SERVER_PORT || 3333;

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));