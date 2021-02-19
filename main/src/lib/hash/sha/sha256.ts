import { BlockHash } from '../common';
import { HashUtils } from '../hash-utils';
import { ShaUtils } from './sha-utils';
import { Assert } from '../assert';

export class Sha256 extends BlockHash {

    // sha256_K
    private k = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
        0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
        0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
        0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
        0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
        0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
        0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
        0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    protected h = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];

    private W = new Array(64);

    constructor(blockSize?: any, outSize?: any, hmacStrength?: any, padLength?: number) {
        super(blockSize ? blockSize : 512,
            outSize ? outSize : 256,
            hmacStrength ? hmacStrength : 192,
            padLength ? padLength : 64);
    }

    protected _digest(enc) {
        if (enc === 'hex')
            return HashUtils.toHex32(this.h, 'big');
        else
            return HashUtils.split32(this.h, 'big');
    }

    protected _update(msg, start, end) {
        var W = this.W;

        for (var i = 0; i < 16; i++)
            W[i] = msg[start + i];
        for (; i < W.length; i++)
            W[i] = HashUtils.sum32_4(ShaUtils.g1_256(W[i - 2]), W[i - 7], ShaUtils.g0_256(W[i - 15]), W[i - 16]);

        var a = this.h[0];
        var b = this.h[1];
        var c = this.h[2];
        var d = this.h[3];
        var e = this.h[4];
        var f = this.h[5];
        var g = this.h[6];
        var h = this.h[7];

        Assert.assert(this.k.length === W.length);
        for (i = 0; i < W.length; i++) {
            var T1 = HashUtils.sum32_5(h, ShaUtils.s1_256(e), ShaUtils.ch32(e, f, g), this.k[i], W[i]);
            var T2 = HashUtils.sum32(ShaUtils.s0_256(a), ShaUtils.maj32(a, b, c));
            h = g;
            g = f;
            f = e;
            e = HashUtils.sum32(d, T1);
            d = c;
            c = b;
            b = a;
            a = HashUtils.sum32(T1, T2);
        }

        this.h[0] = HashUtils.sum32(this.h[0], a);
        this.h[1] = HashUtils.sum32(this.h[1], b);
        this.h[2] = HashUtils.sum32(this.h[2], c);
        this.h[3] = HashUtils.sum32(this.h[3], d);
        this.h[4] = HashUtils.sum32(this.h[4], e);
        this.h[5] = HashUtils.sum32(this.h[5], f);
        this.h[6] = HashUtils.sum32(this.h[6], g);
        this.h[7] = HashUtils.sum32(this.h[7], h);
    }

}
