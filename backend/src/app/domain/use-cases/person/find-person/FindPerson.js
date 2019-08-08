const dependencies = {
  PersonRepository: require('../../../../infrastructure/repository/PersonRepository'),
};

const FindPersons = (data, injection) => {
  const { PersonRepository } = Object.assign({}, dependencies, injection);
  return new PersonRepository(injection).findPersons();
};

module.exports = FindPersons;