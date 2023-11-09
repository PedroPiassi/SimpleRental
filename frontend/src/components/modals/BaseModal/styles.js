import styled from 'styled-components';

import { DialogActions } from '@mui/material';

export const CloseButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-radius: 12px;
    padding: 5px;
    cursor: pointer;
    color: #294732;
    :hover {
        background: #ebefed;
    }
    :active {
        filter: brightness(0.95);
    }
`;

export const ModalActions = styled(DialogActions)`
    padding: 0.625rem 1.5rem;
    min-height: 52px;
`;
