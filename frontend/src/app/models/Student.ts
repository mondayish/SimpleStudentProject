import {MarksStorage} from "./MarksStorage";

export class Student {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public age: number,
        public marksStorages: MarksStorage[]
        ) {
    }
}
