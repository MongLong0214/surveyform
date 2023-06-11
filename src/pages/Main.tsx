import React, { useEffect, useState, useCallback } from "react"
import styled from "styled-components";
import IconAdd, {IconWrapper} from "../uiLibrary/icons/IconAdd";
import { useNavigate } from 'react-router-dom';
import Thumbnail from "../components/Thumbnail";
import * as API from "../api";
import {useRecoilState} from 'recoil';
import { questionnaireAtom } from '../atom/questionnaireAtom';
import LoadingOverlay from "../components/common/LoadingOverlay";
function Main() {

    const navigate = useNavigate();
    const [questionnaire, setQuestionnaire] = useRecoilState(questionnaireAtom);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await API.get('questionnaires');
            setQuestionnaire(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [setQuestionnaire, setLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {loading && <LoadingOverlay />}
            <MainContainer>
                <button onClick={() => navigate('/addQuestion')}>
                    <IconWrapper>
                        <IconAdd/>
                    </IconWrapper>
                </button>
                {questionnaire && questionnaire.map((item: any, index: React.Key | null | undefined) => (
                    <Thumbnail key={index} data={item} refreshData={fetchData} />
                ))}
            </MainContainer>
        </>

    );
}

export default Main;

const MainContainer = styled.div`
  display: flex;
  flex-direction: wrap;
  align-items: center;
  justify-content: center;
  height: 80vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

