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

  personMongoSchema.static('participationInfo', async function(){
    let info = await this.aggregate([{ 
        $group: {
          _id: null,
          overallParticipation: {
            $sum: "$participation"            
          },
          participants: { $sum: 1 }
        }
      }]).exec();
    return info[0];
  });
  
  return connection.model('Person', personMongoSchema, 'persons');
}

module.exports = injection => GeneratePersonsMongoSchema(injection);
