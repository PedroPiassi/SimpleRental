import styled from 'styled-components';

import { InputAdornment, TextField } from '@mui/material';

export const Container = styled(TextField)`
    width: 100%;
    background: ${({ bgcolor }) => bgcolor || 'transparent'};
    border-radius: 10px;

    &.MuiInputBase-input {
        height: 40px;
    }

    &.MuiInputAdornment-root {
        margin-right: 0 !important;
    }
`;

export const CInputAdornment = styled(InputAdornment)`
    width: 20px;
    color: #9ba1a9;
    margin-right: 0 !important;
`;
