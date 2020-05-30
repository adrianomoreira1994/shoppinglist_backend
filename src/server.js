import 'dotenv/config';
import express from './index';

express.listen(process.env.PORT || 3333);
