import { Button, Toolbar } from '@mui/material';
import styled from 'styled-components';

export const ToolbarStyled = styled(Toolbar)`
    background-color: #000;
    padding: 1rem 3rem !important;
    justify-content: space-between;
`;

export const ButtonStyled = styled(Button)`
    color: #fff !important;

   &:hover {
    background-color: #2e7d32 !important;
  }
`;

export const ImgStyled = styled.img`
    width: 130px;
`;

export const Div = styled.div`
    > button {
        font-size: 1rem;
        padding: 0 2rem;
    }
`;
