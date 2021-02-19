import { BlockHash } from '../common';
import { HashUtils } from '../hash-utils';
import { ShaUtils } from './sha-utils';

export class Sha1 extends BlockHash {

    private init_sha1_K = [
        0x5A827999, 0x6ED9EBA1,
        0x8F1BBCDC, 0xCA62C1D6
    ];

    private init_h = [
        0x67452301, 0xefcdab89, 0x98badcfe,
        0x10325476, 0xc3d2e1f0];

    private sha1_K = [
        0x5A827999, 0x6ED9EBA1,
        0x8F1BBCDC, 0xCA62C1D6
    ];

    private h = [
        0x67452301, 0xefcdab89, 0x98badcfe,
        0x10325476, 0xc3d2e1f0];

    constructor() {
        super(512, 160, 80, 64);
    }

    protected _digest(enc) {
        this.h = this.init_h;
        if (enc === 'hex')
            return HashUtils.toHex32(this.h, 'big');
        else
            return HashUtils.split32(this.h, 'big');
    }

    protected _update(msg, start, end) {
        this.h = this.init_h;
        this.sha1_K = this.init_sha1_K;

        var W = new Array(80);

        for (var i = 0; i < 16; i++)
            W[i] = msg[start + i];

        for(; i < W.length; i++)
            W[i] = HashUtils.rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

        var a = this.h[0];
        var b = this.h[1];
        var c = this.h[2];
        var d = this.h[3];
        var e = this.h[4];

        for (i = 0; i < W.length; i++) {
            var s = ~~(i / 20);
            var t = HashUtils.sum32_5(HashUtils.rotl32(a, 5), ShaUtils.ft_1(s, b, c, d), e, W[i], this.sha1_K[s]);
            e = d;
            d = c;
            c = HashUtils.rotl32(b, 30);
            b = a;
            a = t;
        }

        this.h[0] = HashUtils.sum32(this.h[0], a);
        this.h[1] = HashUtils.sum32(this.h[1], b);
        this.h[2] = HashUtils.sum32(this.h[2], c);
        this.h[3] = HashUtils.sum32(this.h[3], d);
        this.h[4] = HashUtils.sum32(this.h[4], e);
    }

}
