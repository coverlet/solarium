import { fetchSpriteMap } from '../../../client/s3client';
import { cache } from '../../../utils/cache';

export const getSpriteMap = (): Promise<any> => {
  return new Promise((resolve) => {
    const spriteMap = cache.get('sprite_map');

    if (!spriteMap) {
      fetchSpriteMap().then((data) => {
        cache.set('sprite_map', data, 43000);
        resolve(data);
      });
    } else {
      resolve(spriteMap);
    }
  });
};
