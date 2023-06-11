import React, {HTMLAttributes, useCallback} from 'react';
import CheckBox from "./CheckBox";
import RadioBtn from "./RadioBtn";
import { Question, questionsAtom} from "../../atom/questionsAtom";
import { useRecoilState } from 'recoil';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
    label: string;
    type: string;
    questionId: number;
    answer: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    index?: number;
    value?: string;
}
function Input({label, questionId, answer, index,value, ...props}: InputProps) {
    const [questions, setQuestions] = useRecoilState<Question[]>(questionsAtom);
    const question = questions.find(q => q.id === questionId);

    const handleCheckboxChange = useCallback((questionId: number, index: number | undefined, isChecked: boolean) => {
        setQuestions(
            questions.map(q =>
                q.id === questionId
                    ? {...q, answerOptions: q.answerOptions.map((a, i) => i === index ?
                            {...a, isChecked: isChecked} : a)} : q)
        );
    }, [questions, setQuestions]);

    const handleRadioChange = useCallback((questionId: number, index: number | undefined, isChecked: boolean) => {
        setQuestions(
            questions.map(q =>
                q.id === questionId ?
                    {...q, answerOptions: q.answerOptions.map((a, i) => i === index ?
                            {...a, isChecked: isChecked} : {...a, isChecked: false})} : q)
        );
    }, [questions, setQuestions]);

    return (
        <>
            {question?.type === '체크박스' && answer && (
                <CheckBox
                    label={label}
                    checked={question?.answerOptions[index!].isChecked}
                    onChange={(e) => handleCheckboxChange(questionId, index, e.target.checked)}
                />
            )}

            {question?.type === '객관식 답변' && answer && (
                <RadioBtn
                    label={label}
                    name={`group-${questionId}`}
                    value={label}
                    checked={question?.answerOptions[index!].isChecked}
                    onChange={(e) => handleRadioChange(questionId, index, e.target.checked)}
                />
            )}

            <input
                className={`w-full border-b focus:border-black focus:border-b-5 outline-none`}
                placeholder={props.placeholder}
                value={value}
                {...props}
            />

        </>
    );
}

export default Input;
