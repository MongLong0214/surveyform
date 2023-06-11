import React, { useState} from 'react';

import {questionsAtom} from "../../atom/questionsAtom";
import {Question} from "../../atom/questionsAtom";
import {useRecoilState} from "recoil";
import {v4 as uuidv4} from 'uuid';

interface DropDownBtnProps {
    formId: number;
}

const DropDownBtn: React.FC<DropDownBtnProps> = ({ formId }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [questions, setQuestions] = useRecoilState<Question[]>(questionsAtom);

    const toggleOpen = () => setIsOpen(!isOpen);

    const question = questions.find(q => q.id === formId);
    if (!question) {
        throw new Error(`Question with id ${formId} not found`);
    }

    const { type } = question;

    const handleOptionClick = (option: string) => {
        setIsOpen(false);
        setQuestions(oldQuestions => oldQuestions.map(q =>
            q.id === formId
                ? {
                    ...q,
                    type: option,
                    // if option is '단문형 답변' or '장문형 답변' then reset answerOptions to single initial value
                    answerOptions: option === '단문형 답변' || option === '장문형 답변'
                        ? [{ id: uuidv4(), text: '', isChecked: false }]
                        : q.answerOptions
                }
                : q
        ));
    }



    return (
        <>
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-black bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                type="button"
                onClick={toggleOpen}
            >
                {type}
                <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div
                    id="dropdown"
                    className="absolute top-10 bg-white divide-y divide-gray-100 rounded-lg p-2 shadow dark:bg-gray-700"
                >
                    <ul className="text-xs text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li onClick={() => handleOptionClick('단문형 답변')}>
                            <div className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">단문형 답변</div>
                        </li>
                        <li onClick={() => handleOptionClick('장문형 답변')}>
                            <div className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">장문형 답변</div>
                        </li>
                        <li onClick={() => handleOptionClick('객관식 답변')}>
                            <div className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">객관식 답변</div>
                        </li>
                        <li onClick={() => handleOptionClick('체크박스')}>
                            <div className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">체크박스</div>
                        </li>
                        <li onClick={() => handleOptionClick('파일 업로드')}>
                            <div className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">파일 업로드</div>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default DropDownBtn;
