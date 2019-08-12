const dependencies = {
  PersonRepository: require('../../../../infrastructure/repository/PersonRepository'),
};

const FindPersons = (data, injection) => {
  const { PersonRepository } = Object.assign({}, dependencies, injection);
  let options = [
    undefined,
    undefined,
    undefined,
    data.limit || undefined,
    undefined
  ];

  return new PersonRepository(injection).findPersons(...options);
};

module.exports = FindPersons;