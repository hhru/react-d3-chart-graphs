import React, {Component} from 'react';
import styled from 'styled-components';

import LegendItem from '../LegendItem';

const Legend = styled.div`
    margin-top: 25px;
    margin-left: ${props => `${props.left}px`};
`;

export default class Legends extends Component {
    render() {
        const {stackColors, left} = this.props;
        const barDescriptions = [];

        for (let item in stackColors) {
            barDescriptions.push(
                <LegendItem
                    key={stackColors[item].color}
                    color={stackColors[item].color}
                    text={stackColors[item].legend} />
            );
        }

        return (
            <Legend left={left}>
                {barDescriptions}
            </Legend>
        );
    }
}
