import { Button } from '@mui/material';
import styled from 'styled-components';

const getStatusColor = (status) => {
    switch (status) {
        case false:
            return '#2e7d32';
        case true:
            return '#DF2C0F';
        case 2:
            return '#2e7d32';
        case 3:
            return '#DF2C0F';
        case 4:
            return '#ECB900';
        default:
            return null;
    }
};

export const ButtonStyled = styled(Button)`
    font-size: 10px !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    border: none !important;
    width: 120px !important;
    border-radius: 16px !important;
    padding: 0.2rem 1rem !important;
    background-color: ${(props) => getStatusColor(props.status)} !important;
`;