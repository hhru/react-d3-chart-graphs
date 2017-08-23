import React, {Component} from 'react';
import styled from 'styled-components';

import Bar from '../Bar';

const Line = styled.line`
    fill: steelblue;
    stroke: #000;
    stroke-width: 1px;
`;

const Circle = styled.circle`
    fill: white;
    fill-opacity: 0;
    stroke: #000;
    stroke-width: 1px;
`;

const CIRCLE_RADIUS = 5;

class BoxPlotItem extends Component {
    render() {
        const {scales, datum, margins, isClickable, svgDimensions, colorScale} = this.props;
        const {xScale, yScale} = scales;
        const min = datum.values.min;
        const max = datum.values.max;
        const xPosition = xScale(datum.title) + (xScale.bandwidth() / 2);
        const yMax = yScale(max);
        const yMin = yScale(min);
        const width = xScale.bandwidth();
        const x1Position = xPosition - (width / 2);
        const x2Position = xPosition + (width / 2);
        const median = datum.values.median;
        const yMedian = yScale(median);
        const {height} = svgDimensions;
        const barHeight = datum.values.quartiles.max - datum.values.quartiles.min;
        const ejectionMax = yScale(datum.values.ejection.max);
        const ejectionMin = yScale(datum.values.ejection.min);

        return (
            <g>
                { datum.values.ejection && datum.values.ejection.max ?
                    <Circle
                        data-type='ejection-max'
                        data-datum={JSON.stringify({
                            ...datum,
                            titleBar: this.props.titleBar,
                            metrics: {left: xPosition, top: ejectionMax, width: CIRCLE_RADIUS}})}
                        r={CIRCLE_RADIUS}
                        cx={xPosition}
                        cy={ejectionMax} /> : ''}

                { datum.values.ejection && datum.values.ejection.min ?
                    <Circle
                        data-type='ejection-min'
                        data-datum={JSON.stringify({
                            ...datum,
                            titleBar: this.props.titleBar,
                            metrics: {left: xPosition, top: ejectionMin, width: CIRCLE_RADIUS}})}
                        r={CIRCLE_RADIUS}
                        cx={xPosition}
                        cy={ejectionMin} /> : ''}
                <Line
                    className='center'
                    x1={xPosition}
                    x2={xPosition}
                    y1={yMax}
                    y2={yMin} />
                <Line
                    className='median'
                    x1={x1Position}
                    x2={x2Position}
                    y1={yMedian}
                    y2={yMedian} />
                <Line
                    className='whisker'
                    x1={x1Position}
                    x2={x2Position}
                    y1={yMax}
                    y2={yMax} />
                <Line
                    className='whisker'
                    x1={x1Position}
                    x2={x2Position}
                    y1={yMin}
                    y2={yMin} />
                <Bar
                    key={datum.title}
                    x={xScale(datum.title)}
                    y={yScale(datum.values.quartiles.max)}
                    datum={datum}
                    isClickable={isClickable}
                    height={height - margins.bottom - yScale(barHeight)}
                    width={xScale.bandwidth()}
                    fill={colorScale(max)}
                    fillOpacity='0.7' />
            </g>
        );
    }
}

export default BoxPlotItem;
