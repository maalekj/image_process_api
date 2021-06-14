import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const absolutePath = path.resolve('.');
const resources_path = absolutePath + '/res/origin-pictures/';

export async function processPicture(picture_name: string,picture_width:number,picture_high:number ): Promise<string>{
    const picturePath = resources_path + `/${picture_name}.jpg`;
  console.log(
    `the name = ${picture_name}, the width = ${picture_width}, the high ${picture_high}`
  );
  if (!picture_name) {
    console.log('No picture name provided');
    throw new Error('please privde a name to the picture in the url. e.g http://localhost:3000/api/picture?name=santamonica&width=200&high=200');
  }
  if (!fs.existsSync(picturePath)) {
    console.log('No such picture');
    throw new Error('There is no such picture. The available names : santamonica, fjord, encenadaport, icelandwaterfall and palmtunnel');
  }
  if (Number.isNaN(picture_high) || (picture_high < 10 && picture_high != 0)) {
    console.log(
      'The high should be a number grater 10. Set 0 to get the origin high'
    );
    throw new Error("The high should be a number grater 10. Set 0 to get the origin high");
  }
  if (
    Number.isNaN(picture_width) ||
    (picture_width < 10 && picture_width != 0)
  ) {
    console.log(
      'The width should be a number grater 10. Set 0 to get the origin width'
    );
    throw new Error("The width should be a number grater 10. Set 0 to get the origin width");

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

  return Promise.resolve(processed_picture_path);
  }
  
