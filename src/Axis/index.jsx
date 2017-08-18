import React, {Component} from 'react';
import * as d3Axis from 'd3-axis';
import {select as d3Select} from 'd3-selection';

import './axis.css';

export default class Axis extends Component {
    componentDidMount() {
        this.renderAxis();
    }

    componentDidUpdate() {
        this.renderAxis();
    }

    getAxisElement = (el) => {
        this.axisRootElement = el;
    }

    renderAxis() {
        const axisType = `axis${this.props.orient}`;
        const axis = d3Axis[axisType]()
            .scale(this.props.scale)
            .tickSize(this.props.tickSize)
            .tickPadding([this.props.padding])
            .ticks(this.props.ticksCount);

        axis.tickFormat(this.props.tickFormat);

        d3Select(this.axisRootElement).call(axis);
    }

    renderLegend = () => {
        const {legend} = this.props;
        const axisLabelStylesDefault = {
            fontSize: legend.fontSize,
            transform: legend.translate
        };

        return (
            <text
                  style={axisLabelStylesDefault}
                  dy={legend.dy}>
                {legend.text}
            </text>
            
        );
    }

    render() {
        const {legend, translate} = this.props;
        
        return (
            <g>
                <g
                    className={`axis axis_${this.props.orient.toLowerCase()}`}
                    ref={this.getAxisElement}
                    transform={translate} />
                {legend.text ?  this.renderLegend(): ''}
            </g>
        );
    }
}
