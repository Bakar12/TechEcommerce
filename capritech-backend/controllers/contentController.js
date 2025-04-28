const Content = require('../models/Content');

// Get Content
const getContent = async (req, res) => {
  const content = await Content.findOne();
  res.json(content);
};

// Update Content
const updateContent = async (req, res) => {
  const { bannerText, servicesText, promotionsText } = req.body;

  let content = await Content.findOne();
  if (content) {
    content.bannerText = bannerText;
    content.servicesText = servicesText;
    content.promotionsText = promotionsText;
  } else {
    content = new Content({ bannerText, servicesText, promotionsText });
  }
  const updatedContent = await content.save();
  res.json(updatedContent);
};

module.exports = { getContent, updateContent };
