const dependencies = {
  PersonRepository: require('../../../../infrastructure/repository/PersonRepository'),
};

const CreatePerson = (data, injection) => {
  const {
    PersonRepository,
    // CheckParticipationLimit,
    Logger,
  } = Object.assign({}, dependencies, injection);

  personData = Object.assign({}, data);
  try {
    person = new PersonRepository(injection).createPerson(personData);
  } catch (e) {
    Logger.warn(e.message);
    throw new Error('Error to create User');
  }

  return person;
};

module.exports = CreatePerson;