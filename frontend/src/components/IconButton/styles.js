import styled from 'styled-components';

export const Button = styled.button`
    width: ${(props) => (props.size === 'medium' ? '42px' : '24px')};
    height: ${(props) => (props.size === 'medium' ? '42px' : '24px')};
    background-color: #fff;
    border: none;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    color: var(--color-primary);

    &:hover {
        filter: brightness(0.95);
    }

    &:active {
        filter: brightness(0.9);
    }
`;

export const TransparentButton = styled.div`
    width: ${(props) => (props.size === 'medium' ? '42px' : '32px')};
    height: ${(props) => (props.size === 'medium' ? '42px' : '32px')};
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-radius: 12px;
    padding: 8px;
    cursor: pointer;
    color: ${(props) => props.color} !important;

    > svg {
        width: 20px;
        height: 20px;

        > [stroke='current'] {
            stroke: ${(props) => props.color} !important;
        }
    }

    :hover {
        background: ${(props) => props.bgColor};
    }

    :active {
        filter: brightness(0.95);
    }
`;
