import React from "react";
import styled from "styled-components";
import CheckBox from "./common/CheckBox";
import IconAdd from "../uiLibrary/icons/IconAdd";
import IconCopy from "../uiLibrary/icons/IconCopy";
import IconTrash from "../uiLibrary/icons/IconTrash";
import Input from "./common/Input";
import DropDownBtn from "./common/DropDownBtn";
import IconClose from "../uiLibrary/icons/IconClose";
import {Question, questionsAtom} from "../atom/questionsAtom";
import {useRecoilValue} from "recoil";
import FileUpload from "./common/FileUpload";

interface QuestionFormComponentProps {
    handleAddForm: () => void;
    handleDeleteForm: (formId: number) => void;
    addAnswerField: () => void;
    addOtherAnswerField: () => void;
    deleteAnswerField: (answerId: string) => void;
    handleCopyForm: (formId: number) => void;
    formId: number;
    handleTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAnswerText: (e: React.ChangeEvent<HTMLInputElement>, answerId: string) => void;
    handleRequired: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuestionFormComponent: React.FC<QuestionFormComponentProps> = ({
    handleAddForm,
    handleDeleteForm,
    handleCopyForm,
    addAnswerField,
    addOtherAnswerField,
    deleteAnswerField,
    formId,
    handleTitle,
    handleAnswerText,
    handleRequired,
}) => {

    const questions = useRecoilValue<Question[]>(questionsAtom);
    const question = questions.find(q => q.id === formId)


    return (
        <DefaultQuestionContainer>
            <Header>
                <CheckBoxContainer>
                    <CheckBox label="필수항목"
                                checked={question?.required}
                                onChange={handleRequired}
                    />
                </CheckBoxContainer>

                {/*질문 추가, 복사, 삭제 버튼 영역*/}
                <HeaderMenuContainer>
                    <div onClick={() => handleAddForm()}>
                        <IconAdd />
                    </div>
                    <div onClick={()=> handleCopyForm(formId)}>
                        <IconCopy/>
                    </div>
                    <div onClick={() => handleDeleteForm(formId)}>
                        <IconTrash/>
                    </div>
                </HeaderMenuContainer>
            </Header>

            <QuestionContainer>
                <InputContainer>
                    <Input
                        type="question"
                        label=""
                        placeholder="질문 내용을 200자 이내로 입력해 주세요."
                        questionId={formId}
                        answer={false}
                        onChange={handleTitle}
                        value={question?.title || ""}
                    />
                </InputContainer>

                <DropDownContainer>
                    <DropDownBtn
                        formId={formId}
                    />
                </DropDownContainer>
            </QuestionContainer>

            {question?.type === "체크박스" && (
                <AnswerTitle>체크 항목</AnswerTitle>
            )}

            {question?.type === "객관식 답변" && (
                <AnswerTitle>선택 항목</AnswerTitle>
            )}

            {question?.type === "파일 업로드" && (
               <FileUpload
                    label={question?.type}
               />
            )}



            {question?.type !== "파일 업로드" && questions?.find(question => question.id === formId)?.answerOptions?.map((option, index) => (
                <AnswerContainer key={index}>
                    <Input
                        type="subAddress"
                        label=""
                        placeholder={question?.type === "단문형 답변" ? "100자 이내의 답변을 작성해 주세요." : question?.type === "장문형 답변" ? "250자 이내의 답변을 작성해 주세요." : "선택 항목을 입력해 주세요."}
                        questionId={formId}
                        answer={true}
                        onChange={(e) => handleAnswerText(e, option.id)}
                        index={index}
                        value={option.text}
                    />

                    {question?.type !== "단문형 답변" && question?.type !== "장문형 답변" &&
                        (
                            <div
                                className='cursor-pointer'
                                onClick={() => deleteAnswerField(option.id)}
                            >
                                <IconClose/>
                            </div>
                        )
                    }
                </AnswerContainer>
            ))}


            {(question?.type === "체크박스" || question?.type === "객관식 답변") && (
                <AddAnswerContainer>
                    <div
                        className='border-b-2 border-gray-300 text-gray-500 hover:text-gray-800 cursor-pointer font-bold'
                        onClick={addAnswerField}
                    >
                        항목 추가
                    </div>
                    &nbsp;또는&nbsp;
                    <div
                        className='border-b-2 border-gray-300 text-gray-500 hover:text-gray-800 cursor-pointer font-bold'
                        onClick={addOtherAnswerField}
                    >
                        기타 항목 추가
                    </div>
                </AddAnswerContainer>
            )}


        </DefaultQuestionContainer>
    );
}

export default QuestionFormComponent;

const DefaultQuestionContainer = styled.div`

  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
  height: auto;
  border-radius: 5px;
  padding: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
`
const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: auto;
`

const HeaderMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: auto;
`

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: auto;
  margin-top: 50px;
  margin-left: 20px;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    height: auto;
`

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const AnswerTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    height: auto;
    margin-top: 50px;
    margin-left: 10px;
    font-size: 15px;
    font-weight: bold;
`

const AnswerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    height: auto;
    margin-top: 50px;
    margin-left: 20px;
`

const AddAnswerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    height: auto;
    margin-top: 50px;
    margin-left: 30px;
`

