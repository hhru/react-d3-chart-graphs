import React, {Component} from 'react';

import StackedBar from '../StackedBar';

export default class StackedBars extends Component {
    render() {
        const {scales, margins, data, svgDimensions, maxValue, stackColors, isClickable} = this.props;
        const {xScale, yScale} = scales;

        const bars = (data.map(datum => (
            <StackedBar
                scales={{xScale, yScale}}
                key={datum.title}
                isClickable={isClickable}
                margins={margins}
                data={datum}
                stackColors={stackColors}
                maxValue={maxValue}
                svgDimensions={svgDimensions} />
        )));

        return (
            <g>{bars}</g>
        );
    }
}
