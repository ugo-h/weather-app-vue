export class Coordinates {
    constructor(...args) {
        if (args.length === 2) {
            this.lat = args[0];
            this.lng = args[1];
        } else if (args.length === 1 && typeof args[0] === 'string') {
            [this.lat, this.lng] = args[0].split(',');
            if (!this.lat || !this.lng) throw new Error('Invalid arguments!');
        } else {
            throw new Error('Invalid arguments!');
        }
    }

    toString() {
        return `${this.lat},${this.lng}`;
    }
}
