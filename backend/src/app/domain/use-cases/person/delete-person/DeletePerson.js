const dependencies = {
  PersonRepository: require('../../../../infrastructure/repository/PersonRepository'),
};

const FindPersons = (data, injection) => {
  const { PersonRepository } = Object.assign({}, dependencies, injection);

  return new PersonRepository(injection).deletePerson(data.id);
};

module.exports = FindPersons;