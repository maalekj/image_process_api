import express from 'express';
import {processPicture} from '../imageProcess';

const picture = express.Router();

picture.get('/picture', async (req, res) => {
  const picture_name: string = req.query.name as unknown as string;
  const picture_high: number = parseInt(req.query.high as unknown as string);
  const picture_width: number = parseInt(req.query.width as unknown as string);

  try {
    const processed_picture_path = await processPicture(
      picture_name,
      picture_width,
      picture_high
    );
    // console.log("the path = " + processed_picture_path);
    res.sendFile(processed_picture_path);
  } catch (e) {
    // console.log("the error = " + e);

    res.status(400).send((e as Error).message);
  }
});

export default picture;
