import { getConnection } from 'typeorm';

const companies = [
  {
    name: 'Audi',
  },
  {
    name: 'Chevrolet',
  },
  {
    name: 'Porsche',
  },
  {
    name: 'Lamborghini',
  },
  {
    name: 'Volvo',
  },
  {
    name: 'Audi',
  },
];

const runSeeds = async (): Promise<void> => {
  const companiesRepository = getConnection().getRepository('companies');

  await Promise.all(
    companies.map(async company => {
      const found = await companiesRepository.findOne({
        where: {
          name: company.name,
        },
      });

      if (!found) {
        await companiesRepository.save(company);
      }
    }),
  );
};

export default runSeeds;
