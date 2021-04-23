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

  companies.forEach(async company => {
    const found = await companiesRepository.findOne({
      where: {
        name: company.name,
      },
    });

    if (!found) {
      companiesRepository.save(company);
    }
  });
};

export default runSeeds;
