function GeneratePersonsMongoSchema(injection) {

  const {
    connection,
    Schema,
  } = Object.assign({}, injection);

  const personMongoSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    participation: { type: Number, min: 0, max: 100 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  });
  
  return connection.model('person', personMongoSchema);
}

module.exports = injection => GeneratePersonsMongoSchema(injection);
