import {atom} from 'recoil';
import {Question} from "./questionsAtom";

export type Questionnaire = {
    id: string; // UUID string
    title?: string;
    date?: string;
    questions: Question[];
}

export const questionnaireAtom = atom<Questionnaire[]>({
    key: 'questionnaireState',
    default: [],
});
