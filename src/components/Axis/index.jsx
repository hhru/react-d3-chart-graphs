import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as d3Axis from 'd3-axis';
import { select as d3Select } from 'd3-selection';

import './axis.css';

class Axis extends Component {
    componentDidMount() {
        this.renderAxis();
    }

    componentDidUpdate() {
        this.renderAxis();
    }

    axisRef = React.createRef();

    renderAxis() {
        const { orient, scale, tickSize, padding, ticksCount, tickFormat } = this.props;
        const axis = d3Axis[`axis${orient}`]()
            .scale(scale)
            .tickSize(tickSize)
            .tickPadding(padding)
            .ticks(ticksCount)
            .tickFormat(tickFormat);

        d3Select(this.axisRef.current).call(axis);
    }

    renderLegend = () => {
        const { legend } = this.props;
        if (!legend.text) {
            return null;
        }

        const axisLabelStylesDefault = {
            fontSize: legend.fontSize,
            transform: legend.translate,
        };

        return (
            <text style={axisLabelStylesDefault} dy={legend.dy}>
                {legend.text}
            </text>
        );
    };

    render() {
        const { orient, translate } = this.props;
        return (
            <g>
                <g className={`axis axis_${orient.toLowerCase()}`} ref={this.axisRef} transform={translate} />
                {this.renderLegend()}
            </g>
        );
    }
}

Axis.propTypes = {
    orient: PropTypes.string,
    legend: PropTypes.string,
    scale: PropTypes.func,
    padding: PropTypes.number,
    tickSize: PropTypes.string,
    ticksCount: PropTypes.number,
    tickFormat: PropTypes.string,
    translate: PropTypes.string,
};

export default Axis;
