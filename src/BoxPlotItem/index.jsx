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
        const maxOutlier = (datum.outliers && datum.outliers.max) ? yScale(datum.outliers.max.value) : null;
        const minOutlier = (datum.outliers && datum.outliers.min) ? yScale(datum.outliers.min.value) : null;

        return (
            <g>
                { maxOutlier ?
                    <Circle
                        data-type='outlier-max'
                        data-datum={JSON.stringify({
                            ...datum,
                            titleBar: this.props.titleBar,
                            metrics: {left: xPosition, top: maxOutlier, width: CIRCLE_RADIUS}})}
                        r={CIRCLE_RADIUS}
                        cx={xPosition}
                        cy={maxOutlier} /> : ''}

                { minOutlier ?
                    <Circle
                        data-type='outlier-min'
                        data-datum={JSON.stringify({
                            ...datum,
                            titleBar: this.props.titleBar,
                            metrics: {left: xPosition, top: minOutlier, width: CIRCLE_RADIUS}})}
                        r={CIRCLE_RADIUS}
                        cx={xPosition}
                        cy={minOutlier} /> : ''}
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
