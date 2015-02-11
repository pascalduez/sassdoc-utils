import { resolve } from 'path';
import vfs from 'vinyl-fs';
import File from 'vinyl';
import through from 'through2';
import lazypipe from 'lazypipe';
import sassdoc from 'sassdoc';

export default function dump(dest = 'data.json', config = {}) {

  const transform = (data, enc, cb) => {
    let file = new File({
      contents: new Buffer(JSON.stringify(data, null, 2)),
      path: resolve(dest),
    });

    cb(null, file);
  };

  const pipeline = lazypipe()
    .pipe(sassdoc.parse, config)
    .pipe(through.obj, transform);

  return pipeline();
}
