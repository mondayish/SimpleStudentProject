import {MarksStorage} from "./MarksStorage";
import {Professor} from "./Professor";

export class Subject{

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public marksStorages: MarksStorage[],
        public professors: Professor[]
    ) {
    }
}
