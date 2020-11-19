import {Mark} from "./Mark";
import {Student} from "./Student";
import {Subject} from "./Subject";

export class MarksStorage{

    constructor(
        public id: number,
        public marks: Mark[],
        public student: Student,
        public subject: Subject
    ) {
    }
}
