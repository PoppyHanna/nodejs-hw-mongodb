import fs from 'node:fs/promises';
import path from 'node:path';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploadDir = async (file) => { 
    const tempPath = path.join(TEMP_UPLOAD_DIR, file.filename);
    const finalPath = path.join(UPLOAD_DIR, file.filename);

    await fs.rename(tempPath, finalPath);

    return `${getEnvVar('APP_DOMAIN').replace(/\/$/, '')}/uploads/${file.filename}`;
};

