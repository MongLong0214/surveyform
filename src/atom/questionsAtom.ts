import {atom} from 'recoil';
import {v4 as uuidv4} from "uuid";

export interface Question {
    id: number;
    required: boolean;
    type: string;
    answerOptions: AnswerOption[];
    title?: string;
}

export interface AnswerOption {
    id: string;
    text: string;
    isChecked: boolean;
}


export const questionsAtom = atom<Question[]>({
    key: "questionsAtom",
    default:
    [
        {
            id: 0,
            required: true,
            type: "단문형 답변",
            title: "",
            answerOptions: [{ id: uuidv4(), text: '', isChecked: false }], // 기본적으로 하나의 답변 옵션을 가지도록 설정
        },
    ],
});
