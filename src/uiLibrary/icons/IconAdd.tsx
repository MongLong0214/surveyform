import React, { memo } from 'react';
import styled from 'styled-components';

export const IconWrapper = styled.div`
    display: inline-flex; 
    justify-content: center; 
    align-items: center; 
    border: 2px dashed;
    border-radius: 10px;
    width: 50px;
    height: 50px;
    padding: 5px; 
    margin: 20px; 
`;

const IconAdd = () => {
    return (
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                 className="cursor-pointer bi bi-file-earmark-pdf-fill" viewBox="0 0 16 16">
                <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>

    );
}

export default memo(IconAdd);
