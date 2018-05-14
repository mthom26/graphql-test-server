const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
}); 

const TeamMember = mongoose.model('TeamMember', memberSchema);

module.exports = TeamMember;