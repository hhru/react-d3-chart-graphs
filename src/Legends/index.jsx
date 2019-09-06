import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LegendItem from 'src/LegendItem';

const Legend = styled.div`
    margin-top: 25px;
    margin-left: ${(props) => `${props.left}px`};
`;

const DEFAULT_COLOR = '#37474F';

export default class Legends extends Component {
    static propTypes = {
        left: PropTypes.number,
        stackColors: PropTypes.object,
    };

    render() {
        const { stackColors, left } = this.props;
        const barDescriptions = [];

        for (const item in stackColors) {
            barDescriptions.push(
                <LegendItem
                    key={(stackColors[item] && stackColors[item].color) || DEFAULT_COLOR}
                    color={(stackColors[item] && stackColors[item].color) || DEFAULT_COLOR}
                    text={stackColors[item] && stackColors[item].legend}
                />
            );
        }

        return <Legend left={left}>{barDescriptions}</Legend>;
    }
}
