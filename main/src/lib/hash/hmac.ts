import { HashUtils } from './hash-utils';
import { Assert } from './assert';
import { BlockHash } from './common';

export class Hmac {

    private blockSize: number;
    private outSize: number;
    private inner: any;
    private outer: any;

    constructor(private hash: new () => BlockHash, private key, private enc) {
        let hashAlgorithm = new this.hash();
        this.blockSize = hashAlgorithm.blockSize / 8;
        this.outSize = hashAlgorithm.outSize / 8;
        this.inner = null;
        this.outer = null;

        this._init(HashUtils.toArray(key, enc));
    }

    private _init(key) {
        // Shorten key, if needed
        if (key.length > this.blockSize)
            key = new this.hash().update(key).digest();
        Assert.assert(key.length <= this.blockSize);

        // Add padding to key
        for (var i = key.length; i < this.blockSize; i++)
            key.push(0);

        for (i = 0; i < key.length; i++)
            key[i] ^= 0x36;
        this.inner = new this.hash().update(key);

        // 0x36 ^ 0x5c = 0x6a
        for (i = 0; i < key.length; i++)
            key[i] ^= 0x6a;
        this.outer = new this.hash().update(key);
    };

    public update(msg, enc) {
        this.inner.update(msg, enc);
        return this;
    };

    public digest(enc) {
        this.outer.update(this.inner.digest());
        return this.outer.digest(enc);
    };

}
