import { getConnection } from 'typeorm';

const transmissions = [
  {
    name: 'Automático',
  },
  {
    name: 'Manual',
  },
];

const runSeeds = async (): Promise<void> => {
  const transmissionsRepository = getConnection().getRepository(
    'transmissions',
  );

  await Promise.all(
    transmissions.map(async transmission => {
      const found = await transmissionsRepository.findOne({
        where: {
          name: transmission.name,
        },
      });

      if (!found) {
        await transmissionsRepository.save(transmission);
      }
    }),
  );
};

export default runSeeds;
