const internalDependencies = {
  Logger: require('../../utils/Logger.js'),
}
class PersonRepository {
  
  constructor(externalDependencies) {
    this.dependencies = Object.assign({}, externalDependencies, internalDependencies);
  }

  async createPerson(params) {
    const { PersonPersistentModel, Logger } = this.dependencies;

    // Get general participation info
    let participationInfo = await PersonPersistentModel.participationInfo();
    let currentPart = participationInfo.overallParticipation;

    try {
      
      // Raises an error if the sum of all participations plus the new input is higher than 100
      if (currentPart >= 100 || currentPart + params.participation > 100) {
        let message = `Error on create Person: Current overall participation is ${currentPart}% and can't be higher than 100% [Inserted value: ${params.participation} || sum: ${currentPart+params.participation}]`;
        throw new Error(message);
      }

      const personCreated = await PersonPersistentModel.create(params);

      if (!personCreated) {
        Logger.error('Error on create Person');
        throw new Error('Error on create Person');
      }

      return personCreated;

    } catch (e) {
      Logger.error(e.message);

      if (e.code === 11000 || e.code === '11000') {
        throw new Error('Person already exists');
      }

      throw e;
    }
  }

  async findPersons(
    where = {},
    select = null,
    skip = 0,
    limit = 1000,
    sort = { created_at: -1 },
  ) {
    const { PersonPersistentModel } = this.dependencies;
    return await PersonPersistentModel
      .find(where)
      .skip(skip)
      .limit(limit)
      .select(select || {})
      .sort(sort)
      .exec();
  }

  async deletePerson(id){
    const { PersonPersistentModel } = this.dependencies;
    return await PersonPersistentModel.findByIdAndDelete(id).exec();
  }
}

module.exports = PersonRepository;