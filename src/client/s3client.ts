import { HttpClient } from '../utils/http-client';
import { SPRITE_BASE_URL } from '../config/constants';

export const s3Client = new HttpClient(SPRITE_BASE_URL);

export const fetchSpriteMap = () => {
  return s3Client.get('map.json');
};
