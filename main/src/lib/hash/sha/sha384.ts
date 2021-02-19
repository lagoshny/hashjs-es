import { Sha512 } from './sha512';
import { HashUtils } from '../hash-utils';

export class Sha384 extends Sha512 {

    protected h = [
        0xcbbb9d5d, 0xc1059ed8,
        0x629a292a, 0x367cd507,
        0x9159015a, 0x3070dd17,
        0x152fecd8, 0xf70e5939,
        0x67332667, 0xffc00b31,
        0x8eb44a87, 0x68581511,
        0xdb0c2e0d, 0x64f98fa7,
        0x47b5481d, 0xbefa4fa4];

    constructor() {
        super(1024, 384, 192, 128);
    }


    protected _digest(enc) {
        if (enc === 'hex')
            return HashUtils.toHex32(this.h.slice(0, 12), 'big');
        else
            return HashUtils.split32(this.h.slice(0, 12), 'big');
    }

}
