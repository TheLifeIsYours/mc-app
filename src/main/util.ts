/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { nativeImage, NativeImage } from 'electron';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

//NodeJs based function
export async function imageUrlToNativeImage(
  url: string,
  size: number = 16,
): Promise<NativeImage | undefined> {
  try {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    const imageStr = Buffer.from(buffer).toString('base64');
    const imageBase64 = `data:image/png;base64,${imageStr}`;

    return nativeImage
      .createFromDataURL(imageBase64)
      .resize({ width: size, height: size });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
}
