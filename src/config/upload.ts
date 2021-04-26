import path from 'path';
import { randomBytes } from 'crypto';
import multer, { StorageEngine } from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tempFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {
      [key: string]: string;
    };
    aws: {
      bucket: string;
      region: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  uploadsFolder: path.resolve(__dirname, '..', '..', 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(_request, file, cb) {
        const hash = randomBytes(10).toString('hex');
        const filename = `${hash}-${file.originalname}`;

        return cb(null, filename);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET_NAME,
      region: process.env.REGION,
    },
  },
} as IUploadConfig;
