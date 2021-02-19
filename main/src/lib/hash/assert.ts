export class Assert {

    public static assert(val, msg?) {
        if (!val)
            throw new Error(msg || 'Assertion failed');
    }

    public static assertEqual(l, r, msg?) {
        if (l != r)
            throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
    };

}
