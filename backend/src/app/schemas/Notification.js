const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    user: {
      type: Number,
      required: true
    },
    read: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    // Create the created_at updated_at
    timestamps: true
  }
);

module.exports = mongoose.model('Notification', NotificationSchema);
