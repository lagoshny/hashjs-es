import { HashUtils } from '../hash-utils';

export class ShaUtils {

    public static ft_1(s, x, y, z) {
        if (s === 0)
            return this.ch32(x, y, z);
        if (s === 1 || s === 3)
            return this.p32(x, y, z);
        if (s === 2)
            return this.maj32(x, y, z);
    }

    public static ch32(x, y, z) {
        return (x & y) ^ ((~x) & z);
    }

    public static maj32(x, y, z) {
        return (x & y) ^ (x & z) ^ (y & z);
    }

    public static p32(x, y, z) {
        return x ^ y ^ z;
    }

    public static s0_256(x) {
        return HashUtils.rotr32(x, 2) ^ HashUtils.rotr32(x, 13) ^ HashUtils.rotr32(x, 22);
    }

    public static s1_256(x) {
        return HashUtils.rotr32(x, 6) ^ HashUtils.rotr32(x, 11) ^ HashUtils.rotr32(x, 25);
    }

    public static g0_256(x) {
        return HashUtils.rotr32(x, 7) ^ HashUtils.rotr32(x, 18) ^ (x >>> 3);
    }

    public static g1_256(x) {
        return HashUtils.rotr32(x, 17) ^ HashUtils.rotr32(x, 19) ^ (x >>> 10);
    }


}
