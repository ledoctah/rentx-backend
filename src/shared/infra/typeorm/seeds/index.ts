import { createConnection } from 'typeorm';

import companiesSeeds from './CompanySeeds';

createConnection().then(async () => {
  await companiesSeeds();

  process.exit();
});
