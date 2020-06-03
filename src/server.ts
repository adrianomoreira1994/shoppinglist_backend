import 'dotenv/config';
import Index from './index';

const bootstrap = new Index();
const port = process.env.PORT?.toString() || 3333;

bootstrap
  .getServer()
  .listen(port, () => console.log(`Api running in port ${port}`));
