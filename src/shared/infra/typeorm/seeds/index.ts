import { createConnection } from 'typeorm';

import companiesSeeds from './CompanySeeds';
import fuelsSeeds from './FuelSeeds';
import transmissionsSeeds from './TransmissionSeeds';

createConnection().then(async () => {
  await companiesSeeds();
  await fuelsSeeds();
  await transmissionsSeeds();

  process.exit();
});
