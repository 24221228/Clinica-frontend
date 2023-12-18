import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';

@Injectable({
    providedIn: 'root',
})

export class RSAHelper {
    publicKey: string = `-----BEGIN PUBLIC KEY-----
    MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBgQX1n9n/0fH9u+oF+tHXo
    vLE3Nl/wPY9+8hTUy9DfEbnZxkrY++woOnQumfrROA8mUjqtKBmDHZE1SJVblmR5
    K9Uqsz+Uy7EiO5gYW1qEmoIGtVidcuLOR7qzpXzLP7Jgx1i9JYzLB5mjlGLcNsuk
    LD7jxSDHYVfkCDFeJFqP7w08iMCoiazESpTwttOYwWZGTRKBb95OJXSOxepRr2DC
    icdH+0Zdnm0n5gTirfWHPr23u5IjMI6GoZL8226/iF8owxf1CSg1zdtp/LHkgR0Q
    i/r1ngLbBVor4+LgGip7YLgnnwxaaLAdDyumf/womxYTOk10Lwo4ifzldOPewFLp
    AgMBAAE=
    -----END PUBLIC KEY-----`;


    constructor() {}

    encryptWithPublicKey(valueToEncrypt: string): string {
        const rsa = Forge.pki.publicKeyFromPem(this.publicKey);
        return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
    }
}