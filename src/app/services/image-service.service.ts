import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor() { }
  async convertToBase64(imageUrls: string[]): Promise<string[]> {
    console.log(imageUrls)
    const base64Images: string[] = [];
    const imagePromises: Promise<string>[] = [];

    for (const url of imageUrls) {
      const base64ImagePromise = this.getBase64Image(url);
      imagePromises.push(base64ImagePromise);
    }

    await Promise.all(imagePromises).then((base64Array: string[]) => {
      base64Images.push(...base64Array);
    });

    return base64Images;
  }

  private getBase64Image(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/jpeg'); // Altere para o formato desejado, se necessário
        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
}
