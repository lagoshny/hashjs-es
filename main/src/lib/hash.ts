import { Sha1 } from './hash/sha/sha1';
import { Sha512 } from './hash/sha/sha512';
import { Sha384 } from './hash/sha/sha384';
import { Sha256 } from './hash/sha/sha256';
import { Sha224 } from './hash/sha/sha224';
import { Ripemd160 } from './hash/ripemd160';

export class Hash {

    public static sha1() {
        return new Sha1();
    }

    public static sha224() {
        return new Sha224();
    }

    public static sha256() {
        return new Sha256();
    }

    public static sha384() {
        return new Sha384();
    }

    public static sha512() {
        return new Sha512();
    }

    public static ripemd160() {
        return new Ripemd160();
    }

}

export function sha1() {
    return new Sha1();
}

export function sha224() {
    return new Sha224();
}

export function sha256() {
    return new Sha256();
}

export function sha384() {
    return new Sha384();
}

export function sha512() {
    return new Sha512();
}

export function ripemd160() {
    return new Ripemd160();
}
