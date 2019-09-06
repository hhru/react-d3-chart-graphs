import React, { Component } from 'react';
import styled from 'styled-components';

import Bar from 'src/Bar';
import PropTypes from 'prop-types';

const Line = styled.line`
    fill: steelblue;
    stroke: #000;
    stroke-width: 1px;
`;

const Circle = styled.circle`
    fill: white;
    fill-opacity: 1;
    stroke: #000;
    stroke-width: 1px;
    &:hover {
        cursor: pointer;
    }
`;

const CIRCLE_RADIUS = 5;
const QUARTILIES_ARRAY_LENGTH = 2;

class BoxPlotItem extends Component {
    static propTypes = {
        scales: PropTypes.shape({
            xScale: PropTypes.func,
            yScale: PropTypes.func,
        }),
        datum: PropTypes.object,
        colorScale: PropTypes.func,
        isClickable: PropTypes.bool,
    };

    render() {
        const { scales, datum, isClickable, colorScale } = this.props;
        const { xScale, yScale } = scales;
        const min = datum.numbers.min;
        const max = datum.numbers.max;
        const xPosition = xScale(datum.title) + xScale.bandwidth() / 2;
        const yMax = yScale(max);
        const yMin = yScale(min);
        const width = xScale.bandwidth();
        const x1Position = xPosition - width / 2;
        const x2Position = xPosition + width / 2;
        const median = datum.numbers.median;
        const yMedian = yScale(median);
        let barHeight = 0;

        if (datum.numbers.quartiles && datum.numbers.quartiles.length === QUARTILIES_ARRAY_LENGTH) {
            barHeight = yScale(datum.numbers.quartiles[0]) - yScale(datum.numbers.quartiles[1]);
        }

        const outliers =
            datum.outliers &&
            datum.outliers.map((outlier) => {
                return outlier.value ? (
                    <Circle
                        key={outlier.value}
                        data-type="outlier"
                        data-datum={JSON.stringify({
                            outlier,
                            metrics: { left: xPosition, top: yScale(outlier.value), width: CIRCLE_RADIUS },
                        })}
                        r={CIRCLE_RADIUS}
                        cx={xPosition}
                        cy={yScale(outlier.value)}
                    />
                ) : null;
            });

        if (!datum.numbers || datum.quartiles || !datum.numbers.max || !datum.numbers.min) {
            return <g>{outliers}</g>;
        }

        return (
            <g>
                <Line className="center" x1={xPosition} x2={xPosition} y1={yMax} y2={yMin} />
                <Line className="median" x1={x1Position} x2={x2Position} y1={yMedian} y2={yMedian} />
                <Line className="whisker" x1={x1Position} x2={x2Position} y1={yMax} y2={yMax} />
                <Line className="whisker" x1={x1Position} x2={x2Position} y1={yMin} y2={yMin} />
                <Bar
                    key={datum.title}
                    x={xScale(datum.title)}
                    y={yScale(datum.numbers.quartiles[1])}
                    datum={datum}
                    isClickable={isClickable}
                    height={barHeight}
                    width={xScale.bandwidth()}
                    fill={colorScale(max)}
                    fillOpacity={0.7}
                />
                {outliers}
            </g>
        );
    }
}

export default BoxPlotItem;
