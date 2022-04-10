export class Component {
    // toString(): string {
    //     throw Error("toString() should be defined in Component subclass");
    // };

    toString(): string {
        return this.constructor.name;
    }
}

export default Component;