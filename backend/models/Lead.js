const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      enum: ['website', 'referral', 'social-media', 'email', 'other'],
      default: 'website',
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'interested', 'converted', 'lost'],
      default: 'new',
    },
    notes: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    company: {
      type: String,
      default: '',
    },
    lastContacted: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lead', leadSchema);
