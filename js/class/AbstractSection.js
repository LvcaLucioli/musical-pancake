class AbstractSection {
    constructor() {
        this.items = [];
    }

    retrieve() {
        throw new NotImplementedError('method not implemented');
    }
}