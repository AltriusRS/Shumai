class IllegalAsyncCallback extends Error {
    constructor(message: string) {
        super(message);
    }
}

export {
    IllegalAsyncCallback
}