# HashJs-ES
<a href="https://www.npmjs.com/package/hashjs-es">
  <img src="https://img.shields.io/npm/v/hashjs-es" alt="Last released npm version" />
</a>&nbsp;

<a href="https://github.com/lagoshny/hashjs-es/actions?query=workflow%3ABuild">
  <img src="https://img.shields.io/github/workflow/status/lagoshny/hashjs-es/Build/master" alt="Pipeline info" />
</a>&nbsp;

<a href="https://github.com/lagoshny/hashjs-es/issues">
  <img src="https://img.shields.io/github/issues/lagoshny/hashjs-es" alt="Total open issues" />
</a>&nbsp;

<a href="https://www.npmjs.com/package/hashjs-es">
  <img src="https://img.shields.io/npm/dt/hashjs-es" alt="Total downloads by npm" />
</a>&nbsp;

<a href="https://mit-license.org/">
  <img src="https://img.shields.io/npm/l/hashjs-es" alt="License info" />
</a>&nbsp;

<br />
<br />

This is a ported library version built to support `es2015 module standard`.

Can find **original** library [here](https://github.com/indutny/hash.js).

## Usages

Install library using the next command:

```sh
npm i hashjs-es --save
```

## Usage

The library supports the next hash algorithms:

``
Sha1, Sha224, Sha256, Sha384, Sha512, Ripemd160
``

## Common usage

````ts
import { Hash } from 'hashjs-es';

Hash.sha1().update('abc').digest('hex');

Hash.sha224().update('abc').digest('hex');

Hash.sha224().update('abc').digest('hex');

Hash.sha384().update('abc').digest('hex');

Hash.sha512().update('abc').digest('hex');

Hash.ripemd160().update('abc').digest('hex');
````

## Selective hash usage

````ts
import { sha1, sha224, sha256, sha384, sha512, ripemd160 } from 'hashjs-es';

sha1().update('abc').digest('hex');

sha224().update('abc').digest('hex');

sha224().update('abc').digest('hex');

sha384().update('abc').digest('hex');

sha512().update('abc').digest('hex');

ripemd160().update('abc').digest('hex');

````
