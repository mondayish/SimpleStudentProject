import {Subject} from "./Subject";

export class Professor {

    constructor(
        public id: number,
        public name: string,
        public age: number,
        public subjects: Subject[]
    ) {
    }
}
