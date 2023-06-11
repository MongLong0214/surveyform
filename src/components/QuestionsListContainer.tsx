import React, {useCallback, useEffect, useState} from "react";
import QuestionsListComponent from "./QuestionsListComponent";
import styled from "styled-components";
import {questionsAtom} from "../atom/questionsAtom";
import {Question} from "../atom/questionsAtom";
import {useRecoilState} from "recoil";
import {v4 as uuidv4} from 'uuid';
import Swal from "sweetalert2";
import {questionnaireAtom} from "../atom/questionnaireAtom";
import { useNavigate, useParams, useLocation  } from 'react-router-dom';
import * as API from "../api";
import LoadingOverlay from "./common/LoadingOverlay";

const QuestionsListContainer: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);

    const [questionnaire, setQuestionnaire] = useRecoilState(questionnaireAtom);
    const [questions, setQuestions] = useRecoilState<Question[]>(questionsAtom);

    useEffect(() => {
        setQuestions([{
                id: 0,
                title: '',
                required: true,
                type: '단문형 답변',
                answerOptions: [{id: uuidv4(), text: '', isChecked: false}]
        }])}, []);

    useEffect(() => {
        console.log('questions', questions);
    },[questions])

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await API.get('questionnaires');
            setQuestionnaire(result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [ setQuestionnaire]);

    useEffect(() => {
        fetchData();
    }, [ fetchData]);

    useEffect(() => {
        if (id && location.pathname !== '/addQuestion') {
            const questionnaireToEdit = questionnaire.find(q => q.id == id);
            if (questionnaireToEdit) {
                setQuestions(questionnaireToEdit.questions);
            }
        }
    }, [id, questionnaire, fetchData, setQuestions, location.pathname]);

    const handleAddForm = () => {
        Swal.fire({
            html: `<h2 style="font-size: 1.5rem;">새 기본 설문 문항을 추가하시겠습니까?</h2>`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요",
        }).then((result) => {
            if (result.isConfirmed) {
                const newId = Math.max(...questions.map(question => question.id)) + 1;
                setQuestions(prevQuestions => [...prevQuestions, {
                    id: newId,
                    title: '',
                    required: true,
                    type: '단문형 답변',
                    checkBoxCount: 0,
                    answerOptions: [{id: uuidv4(), text: '', isChecked: false}]
                }]);
            }
        });
    };

    const handleCopyForm = (formId: number) => {
        Swal.fire({
            html: `<h2 style="font-size: 1.5rem;">현재 설문 문항을 복사하시겠습니까?</h2>`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요",
        }).then((result) => {
            if (result.isConfirmed) {
                const copiedQuestion = questions.find(question => question.id === formId);
                if (copiedQuestion) {
                    const newId = Math.max(...questions.map(question => question.id)) + 1;
                    setQuestions(prevQuestions => [...prevQuestions, {
                        ...copiedQuestion,
                        id: newId,
                        type: copiedQuestion.type,
                        answerOptions: copiedQuestion.answerOptions ? copiedQuestion.answerOptions.map((option) => ({...option})) : [],
                    }]);
                } else {
                    console.error(`Question 비었음`);
                }
            }
        });
    };


    const handleDeleteForm = (formId: number) => {
        Swal.fire({
            html: `<h2 style="font-size: 1.5rem;">해당 설문지를 정말 삭제하시겠습니까?</h2>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요",
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== formId));
            }
        });
    };

    const handleSave = () => {
        Swal.fire({
            title: '설문지 제목을 입력하세요.',
            input: 'text',
            inputValue: id ? questionnaire.find(q => q.id === id)?.title : '',
            inputAttributes: {
                autocapitalize: 'off'
            },
            inputValidator: (inputValue) => {
                if (!inputValue) {
                    return '설문지 제목을 입력해주세요.';
                }
                return null;
            },
            showCancelButton: true,
            confirmButtonText: '저장',
            cancelButtonText: '취소',
            showLoaderOnConfirm: true,
            preConfirm: async (title) => {
                if (title) {
                    const hasEmptyQuestionTitle = questions.some(question => question.title?.trim() === '');

                    if (hasEmptyQuestionTitle) {
                        Swal.showValidationMessage('모든 질문에 내용을 입력해주세요.');
                        return;
                    }

                    if (id) { // if an id exists, it means we're updating an existing questionnaire
                        const questionnaireToUpdate = questionnaire.find(q => q.id === id);
                        if (questionnaireToUpdate) {
                            const updatedQuestionnaire = {
                                ...questionnaireToUpdate,
                                title: title,
                                date: new Date().toLocaleDateString(),
                                questions: questions
                            };
                            await API.put('questionnaires', id, updatedQuestionnaire);
                            setQuestionnaire(questionnaire.map(q => q.id === id ? updatedQuestionnaire : q));
                        }
                    } else { // if no id, it means we're creating a new questionnaire
                        const newQuestionnaire = {
                            id: uuidv4(), // Generate UUID for new questionnaire
                            title: title,
                            date: new Date().toLocaleDateString(),
                            questions: questions
                        };
                        await API.post('questionnaires', newQuestionnaire);
                        setQuestionnaire([...questionnaire, newQuestionnaire]);
                    }
                    navigate('/');
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    };



    const handleReset = () => {
        Swal.fire({
            html: `<h2 style="font-size: 1.5rem;">모든 설문지를 초기화하시겠습니까?</h2>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요",
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                setQuestions([
                    {
                        id: 0,
                        title: '',
                        required: true,
                        type: '단문형 답변',
                        answerOptions: [{id: uuidv4(), text: '', isChecked: false}]
                    }
                ]);
            }
        });
    };



    return (
        <>
            {isLoading ? <LoadingOverlay /> : null}
            <Header>
                <ButtonContainer>
                    <Button
                        onClick={handleSave}
                    >설문지 저장</Button>
                    <Button
                        onClick={handleReset}
                    >설문지 초기화</Button>
                </ButtonContainer>
            </Header>

            <QuestionsListComponent
                handleAddForm={handleAddForm}
                handleDeleteForm={handleDeleteForm}
                handleCopyForm={handleCopyForm}
                questions={questions}
            />
        </>
    );
};

export default QuestionsListContainer;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 0.375rem;
`;

const Button = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a202c;
  background-color: #fff;
  border: 1px solid #edf2f7;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background-color: #f7fafc;
    color: #4299e1;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    color: #4299e1;
  }
`;
