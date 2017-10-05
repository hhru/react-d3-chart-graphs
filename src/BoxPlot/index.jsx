import React, {Component} from 'react';
import {scaleBand, scaleLinear, scalePow} from 'd3-scale';
import {interpolateLab} from 'd3-interpolate';
import throttle from 'lodash.throttle';

import Axes from '../Axes';
import Whisker from '../BoxPlotItem';
import ResponsiveWrapper from '../ResponsiveWrapper';

const COLOR_SCALE_MIN_DEFAULT = '#B2EBF2';
const COLOR_SCALE_MAX_DEFAULT = '#00BCD4';

class BoxPlot extends Component {
    xScale = scaleBand();
    yScale = scalePow();

    handleMouseMoveThrottled = throttle((type, data) => {
        const datum = JSON.parse(data);

        if (
            (datum && datum.title === this.prevHoverTitle || datum === null && this.prevHoverTitle === null) &&
            (type && type === this.prevHoverType) || (type === null && this.prevHoverType === null)
        ) {
            return;
        } else {
            this.prevHoverTitle = datum ? datum.title : null;
            this.prevHoverType = type;
        }

        if (this.props.handleMaxOutlierHover && type === 'outlier-max') {
            this.props.handleMaxOutlierHover(datum);
        } else if (this.props.handleMinOutlierHover && type === 'outlier-min') {
            this.props.handleMinOutlierHover(datum);
        } else if (this.props.handleBarHover) {
            this.props.handleBarHover(datum);
        }
    }, 50);

    handleMouseMove = (event) => {
        this.handleMouseMoveThrottled(
            event.target.getAttribute('data-type'),
            event.target.getAttribute('data-datum')
        );
    };

    handleClick = (event) => {
        const type = event.target.getAttribute('data-type');
        if (this.props.handleMaxOutlierClick && type === 'outlier-max') {
            this.props.handleMaxOutlierClick(JSON.parse(event.target.getAttribute('data-datum')));
        } else if (this.props.handleMinOutlierClick && type === 'outlier-min') {
            this.props.handleMinOutlierClick(JSON.parse(event.target.getAttribute('data-datum')));
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
            handleMinOutlierClick,
            handleMaxOutlierClick,
            colorScale } = this.props;
        const {legend, padding, ticksCount, tickFormat, exponent} = axesProps;
        const defaultPaddingMultiplier = 0;
        const defaultExponent = 1;
        const defaultMargins = {top: 10, right: 10, bottom: 150, left: 80};
        const canvasMargins = margins || defaultMargins;
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 500,
        };
        const isClickable = handleBarClick || handleMinOutlierClick || handleMaxOutlierClick;

        let maxValue = Math.max(...data.reduce((result, data) => {
            result.push((data.outliers && data.outliers.max) ? data.outliers.max.value : data.values.max);

            return result;
        }, []));

        if (!isFinite(maxValue)) {
            maxValue = 0;
        }

        const xScale = this.xScale
            .padding(paddingMultiplier || defaultPaddingMultiplier)
            .domain(data.map(d => d.title))
            .range([canvasMargins.left, svgDimensions.width - canvasMargins.right]);

        const yScale = this.yScale
            .exponent(exponent || defaultExponent)
            .domain([0, maxValue])
            .range([svgDimensions.height - canvasMargins.bottom, canvasMargins.top])
            .nice(4);

        const colorScaleInterpolate = scaleLinear()
            .domain([0, maxValue])
            .range([colorScale && colorScale.min || COLOR_SCALE_MIN_DEFAULT,
                colorScale && colorScale.max || COLOR_SCALE_MAX_DEFAULT])
            .interpolate(interpolateLab);

        const whiskers = data.map(datum =>
            <Whisker
                key={datum.title}
                isClickable={!!handleBarClick}
                scales={{xScale, yScale}}
                margins={canvasMargins}
                datum={datum}
                maxValue={maxValue}
                colorScale={colorScaleInterpolate}
                svgDimensions={svgDimensions} />
        );

        return (
            <svg
                onMouseMove={this.props.handleBarHover ? this.handleMouseMove : undefined}
                onClick={isClickable ? this.handleClick : undefined}
                width={svgDimensions.width}
                height={svgDimensions.height}>
                <Axes
                    scales={{xScale, yScale}}
                    padding={padding}
                    margins={canvasMargins}
                    ticksCount={ticksCount}
                    tickFormat={tickFormat}
                    svgDimensions={svgDimensions}
                    legend={legend} />
                {whiskers}
            </svg>
        );
    }
}

export default ResponsiveWrapper(BoxPlot);
