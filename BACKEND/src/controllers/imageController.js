const fs = require('fs');
const path = require('path');

exports.listImages = (req, res) => {
  const directoryPath = path.join(__dirname, '../uploads');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory', details: err.message });
    }

    const images = files.map(file => ({
      filename: file,
      url: `http://localhost:3000/images/${file}`
    }));

    res.json(images);
  });
};
