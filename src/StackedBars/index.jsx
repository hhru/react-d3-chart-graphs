import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StackedBar from 'src/StackedBar';

export default class StackedBars extends Component {
    static propTypes = {
        scales: PropTypes.shape({
            xScale: PropTypes.func,
            yScale: PropTypes.func,
        }),
        margins: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
        data: PropTypes.arrayOf(
            PropTypes.shape({
                titleBar: PropTypes.string,
                key: PropTypes.string,
                values: PropTypes.arrayOf(
                    PropTypes.shape({
                        title: PropTypes.string,
                        value: PropTypes.number,
                    })
                ),
            })
        ),
        svgDimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
        }),
        maxValue: PropTypes.number,
        stackColors: PropTypes.object,
        isClickable: PropTypes.bool,
    };
    render() {
        const { scales, margins, data, svgDimensions, maxValue, stackColors, isClickable } = this.props;
        const { xScale, yScale } = scales;

        const bars = data.map((datum) => (
            <StackedBar
                scales={{ xScale, yScale }}
                key={datum.key || datum.titleBar}
                isClickable={isClickable}
                margins={margins}
                data={datum}
                stackColors={stackColors}
                maxValue={maxValue}
                svgDimensions={svgDimensions}
            />
        ));

        return <g>{bars}</g>;
    }
}
