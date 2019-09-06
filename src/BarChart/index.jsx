import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';
import throttle from 'lodash.throttle';

import Axes from 'src/Axes';
import Bars from 'src/Bars';
import ResponsiveWrapper from 'src/ResponsiveWrapper';
import PropTypes from 'prop-types';

const COLOR_SCALE_MIN_DEFAULT = '#B2EBF2';
const COLOR_SCALE_MAX_DEFAULT = '#00BCD4';

class Chart extends Component {
    static propTypes = {
        handleBarHover: PropTypes.func,
        handleBarClick: PropTypes.func,
        paddingMultiplier: PropTypes.number,
        axesProps: PropTypes.object,
        margins: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
        isClickable: PropTypes.bool,
        data: PropTypes.array,
        height: PropTypes.number,
        parentWidth: PropTypes.number,
        fillOpacity: PropTypes.number,
        colorScale: PropTypes.shape({
            min: PropTypes.string,
            max: PropTypes.string,
        }),
    };

    xScale = scaleBand();
    yScale = scaleLinear();
    handleBarHover = this.props.handleBarHover ? this.props.handleBarHover.bind(null) : () => {};

    handleMouseMoveThrottled = throttle((item, event) => {
        const datum = JSON.parse(item);

        if (datum && datum.title !== this.cacheBarHovered) {
            this.cacheBarHovered = datum.title;
            this.handleBarHover(datum, event);
        } else if (datum === null && this.cacheBarHovered !== null) {
            this.cacheBarHovered = datum;
            this.handleBarHover(datum, event);
        }
    }, 50);

    handleMouseMove = (event) => {
        this.handleMouseMoveThrottled(event.target.getAttribute('data-datum'), {
            clientX: event.clientX,
            clientY: event.clientY,
        });
    };

    handleBarClick = (event) => {
        this.props.handleBarClick(JSON.parse(event.target.getAttribute('data-datum')));
    };

    render() {
        const { data, paddingMultiplier, axesProps, margins, colorScale } = this.props;
        const { legend, padding, ticksCount, tickFormat } = axesProps;
        const defaultPaddingMultiplier = 0;
        const defaultMargins = { top: 10, right: 10, bottom: 150, left: 80 };
        const canvasMargins = margins || defaultMargins;
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 500,
        };
        let maxValue = Math.max(...data.map((d) => d.value));

        if (!isFinite(maxValue)) {
            maxValue = 0;
        }

        const xScale = this.xScale
            .padding(paddingMultiplier || defaultPaddingMultiplier)
            .domain(data.map((d) => d.title))
            .range([canvasMargins.left, svgDimensions.width - canvasMargins.right]);

        const yScale = this.yScale
            .domain([0, maxValue])
            .range([svgDimensions.height - canvasMargins.bottom, canvasMargins.top])
            .nice(4);

        const colorScaleInterpolate = scaleLinear()
            .domain([0, maxValue])
            .range([
                (colorScale && colorScale.min) || COLOR_SCALE_MIN_DEFAULT,
                (colorScale && colorScale.max) || COLOR_SCALE_MAX_DEFAULT,
            ])
            .interpolate(interpolateLab);

        return (
            <svg
                onMouseMove={this.props.handleBarHover ? this.handleMouseMove : undefined}
                onClick={this.props.handleBarClick ? this.handleBarClick : undefined}
                width={svgDimensions.width}
                height={svgDimensions.height}
            >
                <Axes
                    scales={{ xScale, yScale }}
                    padding={padding}
                    margins={canvasMargins}
                    ticksCount={ticksCount}
                    tickFormat={tickFormat}
                    svgDimensions={svgDimensions}
                    legend={legend}
                />
                <Bars
                    scales={{ xScale, yScale }}
                    margins={canvasMargins}
                    data={data}
                    isClickable={!!this.props.handleBarClick}
                    colorScale={colorScaleInterpolate}
                    svgDimensions={svgDimensions}
                />
            </svg>
        );
    }
}

const responsiveWrapper = ResponsiveWrapper(Chart);
export default responsiveWrapper;
