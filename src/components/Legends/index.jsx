import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LegendItem from 'components/LegendItem';

const Legend = styled.div`
    margin-top: 25px;
    margin-left: ${(props) => `${props.left}px`};
`;

const DEFAULT_COLOR = '#37474F';

const Legends = ({ stackColors, left }) => (
    <Legend left={left}>
        {stackColors.map(({ legend, color }, i) => (
            <LegendItem key={i} color={color || DEFAULT_COLOR} text={legend} />
        ))}
    </Legend>
);

Legends.propTypes = {
    stackColors: PropTypes.array,
    left: PropTypes.number,
};

export default Legends;
