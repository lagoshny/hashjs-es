import { HashUtils } from './hash-utils';
import { Assert } from './assert';

export abstract class BlockHash {

    public pending = null;
    public pendingTotal = 0;
    public endian = 'big';

    public _delta8 = this.blockSize / 8;
    public _delta32 = this.blockSize / 32;


    protected constructor(public blockSize: any, public  outSize: any, private  hmacStrength: any, private  padLength: number) {
        this.blockSize = blockSize;
        this.outSize = outSize;
        this.hmacStrength = hmacStrength;
        this.padLength = padLength / 8;
    }

    public update(msg, enc?) {
        // this.pending = null;
        // this.pendingTotal = 0;
        // this.endian = 'big';
        // this._delta8 = this.blockSize / 8;
        // this._delta32 = this.blockSize / 32;

        // Convert message to array, pad it, and join into 32bit blocks
        msg = HashUtils.toArray(msg, enc);
        if (!this.pending)
            this.pending = msg;
        else
            this.pending = this.pending.concat(msg);
        this.pendingTotal += msg.length;

        // Enough data, try updating
        if (this.pending.length >= this._delta8) {
            msg = this.pending;

            // Process pending data in blocks
            var r = msg.length % this._delta8;
            this.pending = msg.slice(msg.length - r, msg.length);
            if (this.pending.length === 0)
                this.pending = null;

            msg = HashUtils.join32(msg, 0, msg.length - r, this.endian);
            for (var i = 0; i < msg.length; i += this._delta32)
                this._update(msg, i, i + this._delta32);
        }

        return this;
    };

    protected abstract _update(msg, start, end);

    protected abstract _digest(enc);

    public digest(enc?) {
        this.update(this._pad());
        Assert.assert(this.pending === null);

        return this._digest(enc);
    };


    private _pad() {
        var len = this.pendingTotal;
        var bytes = this._delta8;
        var k = bytes - ((len + this.padLength) % bytes);
        var res = new Array(k + this.padLength);
        res[0] = 0x80;
        for (var i = 1; i < k; i++)
            res[i] = 0;

        // Append length
        len <<= 3;
        if (this.endian === 'big') {
            for (var t = 8; t < this.padLength; t++)
                res[i++] = 0;

            res[i++] = 0;
            res[i++] = 0;
            res[i++] = 0;
            res[i++] = 0;
            res[i++] = (len >>> 24) & 0xff;
            res[i++] = (len >>> 16) & 0xff;
            res[i++] = (len >>> 8) & 0xff;
            res[i++] = len & 0xff;
        } else {
            res[i++] = len & 0xff;
            res[i++] = (len >>> 8) & 0xff;
            res[i++] = (len >>> 16) & 0xff;
            res[i++] = (len >>> 24) & 0xff;
            res[i++] = 0;
            res[i++] = 0;
            res[i++] = 0;
            res[i++] = 0;

            for (t = 8; t < this.padLength; t++)
                res[i++] = 0;
        }

        return res;
    }

}
