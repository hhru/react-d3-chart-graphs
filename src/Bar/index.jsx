import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Bar extends Component {
    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
        datum: PropTypes.object,
        fillOpacity: PropTypes.number,
        fill: PropTypes.string,
        translate: PropTypes.string,
        isClickable: PropTypes.bool,
        titleBar: PropTypes.string,
    };

    render() {
        const { fill, height, width, x, y, datum, fillOpacity } = this.props;

        return (
            <rect
                data-type="bar"
                style={this.props.isClickable ? { cursor: 'pointer' } : {}}
                x={x}
                y={y}
                data-datum={JSON.stringify({
                    ...datum,
                    titleBar: this.props.titleBar,
                    metrics: { left: x, top: y, width },
                })}
                height={height}
                width={width}
                fillOpacity={fillOpacity}
                fill={fill}
            />
        );
    }
}
