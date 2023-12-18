import { Injectable } from '@angular/core';
import *  as CryptoJS from 'crypto-js';

import { RSAHelper } from 'src/app/shared/helpers/RSA.helper';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private key: string = "SinBoCripto$AESPSP_WEB_37";
  private readonly localStorageKey = 'USER_DATA';
  constructor(private rsaHelper: RSAHelper) { }

  public saveDataStorage(key: string, value: string) {
    localStorage.setItem(key, this.encryptAES(value));
  }

  private encryptAES(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  public getDataStorage(key: string) {
    let data = localStorage.getItem(key) || "";
    return this.decryptAES(data);
  }

  private decryptAES(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

  public clearDataStorage() {
    localStorage.clear();
  }

  public removeDataStorage(key: string) {
    localStorage.removeItem(key);
  }

  public getDataFromStorage<T>(field: string): T | null {
    const storedDataString = localStorage.getItem(this.localStorageKey);

    if (storedDataString) {
      try {
        const data = this.decryptAES(storedDataString);
        const storedData = JSON.parse(data);

        // Verificar si el campo existe antes de devolverlo
        if (storedData.hasOwnProperty(field)) {
          return storedData[field];
        } else {
          console.error(`El campo '${field}' no existe en el objeto almacenado.`);
          return null;
        }
      } catch (error) {
        console.error('Error al analizar los datos almacenados.', error);
        return null;
      }
    }

    return null;
  }
}
