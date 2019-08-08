const internalDependencies = {
  Logger: require('../../utils/Logger.js'),
}
class PersonRepository {
  
  constructor(externalDependencies) {
    this.dependencies = Object.assign({}, externalDependencies, internalDependencies);
  }

  async createPerson(params) {
    const { PersonPersistentModel, Logger } = this.dependencies;

    try {
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

  findPersons(
    where = {},
    select = null,
    skip = 0,
    limit = 1000,
    sort = { created_at: -1 },
  ) {
    const { PersonPersistentModel } = this.dependencies;
    return PersonPersistentModel
      .find(where)
      .skip(skip)
      .limit(limit)
      .select(select || {})
      .sort(sort)
      .exec();
  }
}

module.exports = PersonRepository;