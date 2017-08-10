import React, {Component} from 'react';

export default class Bar extends Component {
    render() {
        const {fill, height, width, x, y, datum} = this.props;

        return (
            <rect
                style={this.props.isClickable ? {cursor: 'pointer'} : {}}
                x={x}
                y={y}
                data-datum={
                    JSON.stringify({...datum, titleBar: this.props.titleBar, metrics: {left: x, top: y, width}})
                }
                height={height}
                width={width}
                fill={fill} />
        );
    }
}
