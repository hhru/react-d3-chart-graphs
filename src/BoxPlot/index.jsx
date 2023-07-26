import React, { Component } from 'react';
import { interpolateLab } from 'd3-interpolate';
import { scaleBand, scaleLinear, scalePow } from 'd3-scale';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';

import Axes from 'src/Axes';
import Whisker from 'src/BoxPlotItem';
import ResponsiveWrapper from 'src/ResponsiveWrapper';

const COLOR_SCALE_MIN_DEFAULT = '#B2EBF2';
const COLOR_SCALE_MAX_DEFAULT = '#00BCD4';

class BoxPlot extends Component {
    static propTypes = {
        handleOutlierHover: PropTypes.func,
        handleOutlierClick: PropTypes.func,
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
        parentWidth: PropTypes.number,
        colorScale: PropTypes.shape({
            min: PropTypes.string,
            max: PropTypes.string,
        }),
    };
    xScale = scaleBand();
    yScale = scalePow();

    handleMouseMoveThrottled = throttle((target, event) => {
        const type = target.getAttribute('data-type');
        const datum = JSON.parse(target.getAttribute('data-datum'));

        if (target === this.prevEventTarget) {
            return;
        }
        this.prevEventTarget = target;

        if (this.props.handleOutlierHover && type === 'outlier') {
            this.props.handleOutlierHover(datum, event);
        } else if (this.props.handleBarHover) {
            this.props.handleBarHover(datum, event);
        }
    }, 50);

    handleMouseMove = (event) => {
        this.handleMouseMoveThrottled(event.target, { clientX: event.clientX, clientY: event.clientY });
    };

    handleClick = (event) => {
        const type = event.target.getAttribute('data-type');
        if (this.props.handleOutlierClick && type === 'outlier') {
            this.props.handleOutlierClick(JSON.parse(event.target.getAttribute('data-datum')));
        } else if (this.props.handleBarClick && type === 'bar') {
            this.props.handleBarClick(JSON.parse(event.target.getAttribute('data-datum')));
        }
    };

    render() {
        const {
            data,
            paddingMultiplier,
            axesProps,
            margins,
            handleBarClick,
            handleOutlierClick,
            colorScale,
        } = this.props;
        const { legend, padding, ticksCount, tickFormat, exponent } = axesProps;
        const defaultPaddingMultiplier = 0;
        const defaultExponent = 1;
        const defaultMargins = { top: 10, right: 10, bottom: 150, left: 80 };
        const canvasMargins = margins || defaultMargins;
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 500,
        };
        const isClickable = handleBarClick || handleOutlierClick;

        let maxValue = Math.max(
            ...data.reduce((result, data) => {
                if (data.outliers.length !== 0) {
                    result.push(...data.outliers.map((outlier) => outlier.value));
                }
                if (data.numbers && data.numbers.max) {
                    result.push(data.numbers.max);
                }
                return result;
            }, [])
        );

        if (!isFinite(maxValue)) {
            maxValue = 0;
        }

        const xScale = this.xScale
            .padding(paddingMultiplier || defaultPaddingMultiplier)
            .domain(data.map((d) => d.title))
            .range([canvasMargins.left, svgDimensions.width - canvasMargins.right]);

        const yScale = this.yScale
            .exponent(exponent || defaultExponent)
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

        const whiskers = data.map((datum) => {
            return (
                <Whisker
                    key={datum.title}
                    isClickable={!!handleBarClick}
                    scales={{ xScale, yScale }}
                    margins={canvasMargins}
                    datum={datum}
                    maxValue={maxValue}
                    colorScale={colorScaleInterpolate}
                    svgDimensions={svgDimensions}
                />
            );
        });

        return (
            <svg
                onMouseMove={this.props.handleBarHover ? this.handleMouseMove : undefined}
                onClick={isClickable ? this.handleClick : undefined}
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
                {whiskers}
            </svg>
        );
    }
}

export default ResponsiveWrapper(BoxPlot);
