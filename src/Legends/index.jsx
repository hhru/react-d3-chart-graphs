import React, {Component} from 'react';
import styled from 'styled-components';

import LegendItem from '../LegendItem';

const Legend = styled.div`
    margin-top: 25px;
    margin-left: ${props => `${props.left}px`};
`;

const DEFAULT_COLOR = '#37474F';

export default class Legends extends Component {
    render() {
        const {stackColors, left} = this.props;
        const barDescriptions = [];

        for (let item in stackColors) {
            barDescriptions.push(
                <LegendItem
                    key={stackColors[item] && stackColors[item].color || DEFAULT_COLOR}
                    color={stackColors[item] && stackColors[item].color || DEFAULT_COLOR}
                    text={stackColors[item] && stackColors[item].legend} />
            );
        }

        return (
            <Legend left={left}>
                {barDescriptions}
            </Legend>
        );
    }
}
