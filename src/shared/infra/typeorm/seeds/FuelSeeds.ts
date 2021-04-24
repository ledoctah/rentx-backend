import { getConnection } from 'typeorm';

const fuels = [
  {
    name: 'Gasolina',
  },
  {
    name: 'Elétrico',
  },
  {
    name: 'Álcool',
  },
];

const runSeeds = async (): Promise<void> => {
  const fuelsRepository = getConnection().getRepository('fuels');

  await Promise.all(
    fuels.map(async fuel => {
      const found = await fuelsRepository.findOne({
        where: {
          name: fuel.name,
        },
      });

      if (!found) {
        await fuelsRepository.save(fuel);
      }
    }),
  );
};

export default runSeeds;
