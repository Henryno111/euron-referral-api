const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  ref_code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  is_manager_code: {
    type: Boolean,
    default: false
  },
  referral_count: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});


referralSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;