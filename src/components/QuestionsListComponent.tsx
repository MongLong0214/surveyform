import React from "react";
import QuestionFormContainer from "./QuestionFormContainer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import {Question, questionsAtom} from "../atom/questionsAtom";
import { JSX } from "react/jsx-runtime";

interface QuestionsListComponentProps {
    handleAddForm: () => void;
    handleDeleteForm: (formId: number) => void;
    handleCopyForm: (formId: number) => void;
    questions: Question[];
}

const QuestionsListComponent: React.FC<QuestionsListComponentProps> = ({
        handleAddForm,
        handleDeleteForm,
        handleCopyForm,
        questions}) => {
    const [questionsState, setQuestionsState] = useRecoilState(questionsAtom);
    const handleDragEnd = (result: { destination: { index: number; }; source: { index: number; }; }) => {
        if (!result.destination) return;

        const items = Array.from(questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setQuestionsState(items);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="questions">
                {(provided: { innerRef: React.LegacyRef<HTMLDivElement> | undefined; droppableProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; placeholder: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, snapshot: any) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {questions.map((question, index) => (
                            <Draggable key={question.id} draggableId={String(question.id)} index={index}>
                                {(provided: { innerRef: React.LegacyRef<HTMLDivElement> | undefined; draggableProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; dragHandleProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; }, snapshot: any) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <QuestionFormContainer
                                            formId={question.id}
                                            handleAddForm={handleAddForm}
                                            handleDeleteForm={handleDeleteForm}
                                            handleCopyForm={handleCopyForm}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default QuestionsListComponent;