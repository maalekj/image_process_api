import express from 'express';
import fs from 'fs';
import sharp from 'sharp';

const path = require('path');
const absolutePath = path.resolve('.');
const resources_path = absolutePath + '/res/origin-pictures/';
const picture = express.Router();

picture.get('/picture', async (req, res) => {
  let picture_name: string = req.query.name as unknown as string;
  let picture_high: number = parseInt(req.query.high as unknown as string);
  let picture_width: number = parseInt(req.query.width as unknown as string);
  let picturePath = resources_path + `/${picture_name}.jpg`;
  console.log(
    `the name = ${picture_name}, the width = ${picture_width}, the high ${picture_high}`
  );
  if (!picture_name) {
    console.log('No picture name provided');
    res
      .status(400)
      .send(
        'please privde a name to the picture in the url. e.g http://localhost:3000/api/picture?name=santamonica'
      );
    return;
  }
  if (!fs.existsSync(picturePath)) {
    console.log('No such picture');
    res
      .status(404)
      .send(
        'There is no such picture. The available names : santamonica, fjord, encenadaport, icelandwaterfall and palmtunnel'
      );
    return;
  }
  if (Number.isNaN(picture_high) || (picture_high < 10 && picture_high != 0)) {
    console.log(
      'The high should be a number grater 10. Set 0 to get the origin high'
    );
    res
      .status(400)
      .send(
        'The high should be a number grater 10. Set 0 to get the origin high'
      );
    return;
  }
  if (
    Number.isNaN(picture_width) ||
    (picture_width < 10 && picture_width != 0)
  ) {
    console.log(
      'The width should be a number grater 10. Set 0 to get the origin width'
    );
    res
      .status(400)
      .send(
        'The width should be a number grater 10. Set 0 to get the origin width'
      );
    return;
  }

  let processed_picture_path =
    absolutePath +
    `/res/processed-pictures/${picture_name}-${picture_width}-${picture_high}.jpeg`;
  if (!fs.existsSync(processed_picture_path)) {
    console.log('Processing the image');
    await sharp(picturePath)
      .resize(picture_width, picture_high)
      .toFile(processed_picture_path);
  }

  res.sendFile(processed_picture_path);
});

export default picture;
