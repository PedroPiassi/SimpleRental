import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import { Button, TransparentButton } from './styles';

const IconButton = ({ icon, variant = 'default', color = 'default', size = 'medium', ...props }) => {
    const iconButtonRef = useRef(null);

    switch (variant) {
        case 'transparent':
            const FontColors = {
                default: '#294732',
                error: '#CB1E1E'
            };
            const BgColors = {
                default: '#ebefed',
                error: '#F8EAEA'
            };
            return (
                <TransparentButton color={FontColors[color]} bgColor={BgColors[color]} size={size} {...props}>
                    {React.isValidElement(icon) ? <>{icon}</> : <img src={icon} alt={''} />}
                </TransparentButton>
            );
        default:
            return (
                <Button ref={iconButtonRef} {...props} size={size}>
                    {React.isValidElement(icon) ? <>{icon}</> : <img src={icon} alt={''} />}
                </Button>
            );
    }
};

export default IconButton;

IconButton.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    variant: PropTypes.oneOf(['default', 'transparent']),
    color: PropTypes.oneOf(['default', 'error']),
    size: PropTypes.oneOf(['small', 'medium'])
};
