import { HashUtils } from '../hash-utils';
import { Sha256 } from './sha256';

export class Sha224 extends Sha256 {

    protected h = [
        0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
        0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4];


    constructor() {
        super(512, 224, 192, 64);
    }

    protected _digest(enc) {
        if (enc === 'hex')
            return HashUtils.toHex32(this.h.slice(0, 7), 'big');
        else
            return HashUtils.split32(this.h.slice(0, 7), 'big');
    }

}
