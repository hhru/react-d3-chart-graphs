import React from 'react';
import styled from 'styled-components';

const LegendItem = styled.div`
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
`;

const LegendItemColor = styled.div`
    display: inline-block;
    margin-right: 10px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: ${props => props.color}
`;

const LegendItemText = styled.div`
    display: inline;
    font-size: 12px;
`;

const LegendItemComponent = props => (
    <LegendItem>
        <LegendItemColor color={props.color} />
        <LegendItemText>- {props.text}</LegendItemText>
    </LegendItem>
);

export default LegendItemComponent
