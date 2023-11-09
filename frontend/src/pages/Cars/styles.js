import { Button } from '@mui/material';
import styled from 'styled-components';

export const Main = styled.div`
    padding: 3rem;
`;

export const DivHeader = styled.div`
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    

    h1 {
        font-size: 28px;
        color: #2e7d32;
        font-weight: 900;
    }
`;

export const ButtonStyled = styled(Button)`
    margin-right: 1rem !important;
    text-transform: none;
`;
