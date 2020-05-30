import 'dotenv/config';
import express from './index';

const port = process.env.PORT || 3333;
express.listen(port, () => console.log('Api rodando na porta : ' + port));
