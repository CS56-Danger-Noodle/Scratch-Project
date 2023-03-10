const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const boardSchema = new Schema({
  boardName: { type: String, required: true, unique: true },
  columns: [
    {
      columnName: { type: String },
      cards: [
        {
          cardText: { type: String }
        }
      ]
    }
  ]
});

module.exports = mongoose.model('boards', boardSchema);