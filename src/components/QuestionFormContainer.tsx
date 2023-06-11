import React from "react";
import QuestionFormComponent from "./QuestionFormComponent";
import Swal from "sweetalert2";
import {useRecoilState} from "recoil";
import {Question, questionsAtom} from "../atom/questionsAtom";
import { v4 as uuidv4 } from 'uuid';

interface QuestionFormContainerProps {
    handleAddForm: () => void;
    handleDeleteForm: (formId: number) => void;
    handleCopyForm: (formId: number) => void;
    formId: number;
}

const QuestionFormContainer: React.FC<QuestionFormContainerProps> = ({ handleAddForm, handleDeleteForm, handleCopyForm, formId}) => {

    const [questions, setQuestions] = useRecoilState<Question[]>(questionsAtom);

    const addAnswerField = () => {
        setQuestions(oldQuestions => oldQuestions.map(q => {
            if (q.id === formId) {
                const otherOptionIndex = q.answerOptions.findIndex(option => option.text === '기타');
                if (otherOptionIndex !== -1) {
                    // If the 'Other' option exists, insert new answer option just before it
                    let newOptions = [...q.answerOptions];
                    newOptions.splice(otherOptionIndex, 0, { id: uuidv4(), text: "", isChecked: false });
                    return { ...q, answerOptions: newOptions };
                } else {
                    // If there's no 'Other' option, just add the new option to the end of the list
                    return { ...q, answerOptions: [...q.answerOptions, { id: uuidv4(), text: "", isChecked: false }] };
                }
            }
            return q;
        }));
    };


    const addOtherAnswerField = () => {
        // Check if "other" answer option already exists
        const question = questions.find(q => q.id === formId);
        if (question) {
            const otherExists = question.answerOptions.some(option => option.text === '기타');

            if (!otherExists) {
                setQuestions(oldQuestions => oldQuestions.map(q =>
                    q.id === formId ? {...q, answerOptions: [...(q.answerOptions.filter(option => option.text !== '기타')), { id: uuidv4(), text:'기타',  isChecked: false }]} : q
                ));
            } else {
                window.alert('이미 기타 옵션이 존재합니다.');
            }
        }
    };

    const deleteAnswerField = (answerId : string) => {
        Swal.fire({
            html: `<h2 style="font-size: 1.5rem;">해당 답변항목을 정말 삭제하시겠습니까?</h2>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요",
        }).then((result) => {
            if (result.isConfirmed) {
                setQuestions(oldQuestions => oldQuestions.map(question =>
                    question.id === formId ? {
                        ...question,
                        answerOptions: question.answerOptions?.filter((option) => option.id !== answerId)
                    } : question
                ));
            }
        });
    };


    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestions(oldQuestions => oldQuestions.map(question =>
            question.id === formId ? {...question, title: e.target.value} : question
        ));
    }

    const handleAnswerText = (e: React.ChangeEvent<HTMLInputElement>, answerId: string) => {
        const { type } = questions.find(q => q.id === formId) || {};

        if (type === '단문형 답변' && e.target.value.length > 100) {
            e.preventDefault();
            window.alert('답변은 100자 이내로 입력해주세요.');
            return;
        }
        
        if (type === '장문형 답변' && e.target.value.length > 250) {
            e.preventDefault();
            window.alert('답변은 250자 이내로 입력해주세요.');
            return;
        }

        setQuestions(oldQuestions => oldQuestions.map(question =>
            question.id === formId ? {...question, answerOptions: question.answerOptions?.map(answer => answer.id === answerId ? {...answer, text: e.target.value} : answer)} : question
        ));
    }


    const handleRequired = () => {
        setQuestions(oldQuestions => oldQuestions.map(question =>
            question.id === formId ? {...question, required: !question.required} : question
        ));
    }


    return (
        <>
            <QuestionFormComponent
                handleAddForm={handleAddForm}
                handleDeleteForm={handleDeleteForm}
                handleCopyForm={handleCopyForm}

                addAnswerField={addAnswerField}
                addOtherAnswerField={addOtherAnswerField}
                deleteAnswerField={deleteAnswerField}
                formId={formId}

                handleTitle={handleTitle}
                handleAnswerText={handleAnswerText}
                handleRequired={handleRequired}

            />

        </>
    );
}

export default QuestionFormContainer;
