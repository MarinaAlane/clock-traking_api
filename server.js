import express from 'express';
import cors from 'cors';
import routes from './src/Routes/routes.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
