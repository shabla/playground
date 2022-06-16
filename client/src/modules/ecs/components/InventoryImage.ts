import { Component } from "./Component";

export class InventoryImage extends Component {
    image = "";

    Position(image: string): void {
        this.image = image ;
    }
}

export default InventoryImage;