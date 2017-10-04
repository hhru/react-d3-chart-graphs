import React, {Component} from 'react';

import Bar from '../Bar';

const DEFAULT_COLOR = '#37474F';

export default class StackedBarHorizontal extends Component {
    render() {
        const { scales, data, stackColors, isClickable, fillOpacity, height, y } = this.props;
        const { xScale } = scales;

        const bars = data.values.map((datum) => {
            const dateInitial = new Date(datum.dateStart);
            const x = xScale(dateInitial);
            const width = xScale(new Date(datum.dateEnd)) - x;

            return (
                <Bar
                    key={datum.title + dateInitial.getTime()}
                    x={x}
                    y={y}
                    titleBar={data.titleBar}
                    datum={datum}
                    isClickable={isClickable}
                    height={height}
                    width={width}
                    fillOpacity={fillOpacity}
                    fill={stackColors[datum.title] && stackColors[datum.title].color || DEFAULT_COLOR} />
            );
        });

        return (
            <g>{bars}</g>
        );
    }
}
