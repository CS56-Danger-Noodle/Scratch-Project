const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

/**
 * DUMMY:
 * username: test, password: test, board_ids: [1]
 */

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  board_ids: [String],
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR)
    .then(hash => this.password = hash)
    .then(() => next()).catch(error => next({
      log: error,
      // The message is intentionally vague for security reasons
      message: { err: 'Failed to save credentials' }
    }))
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model("users", userSchema);

module.exports = User;
