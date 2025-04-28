const mongoose = require('mongoose');

const contentSchema = mongoose.Schema(
  {
    bannerText: { type: String, required: true },
    servicesText: { type: String, required: true },
    promotionsText: { type: String, required: true },
  },
  { timestamps: true }
);

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
