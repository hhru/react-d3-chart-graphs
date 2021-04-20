import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleBand, scaleTime } from 'd3-scale';
import { extent as d3extent } from 'd3-array';
import throttle from 'lodash.throttle';
import { timeDay } from 'd3-time';

import Axes from 'src/Axes';
import StackedBarHorizontal from 'src/StackedBar/horizontal';
import ResponsiveWrapper from 'src/ResponsiveWrapper';
import BarDescription from 'src/Legends';

const defaultPaddingMultiplier = 0;
const DEFAULT_FILL_OPACITY = 0.7;

class Chart extends Component {
    static propTypes = {
        handleBarHover: PropTypes.func,
        handleBarClick: PropTypes.func,
        paddingMultiplier: PropTypes.number,
        stackColors: PropTypes.object,
        data: PropTypes.array,
        fillOpacity: PropTypes.number,
        axesProps: PropTypes.object,
        margins: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
        renderBefore: PropTypes.func,
        renderAfter: PropTypes.func,
        parentWidth: PropTypes.number,
    };

    handleBarHover = this.props.handleBarHover ? this.props.handleBarHover.bind(null) : () => {};

    handleMouseMoveThrottled = throttle((item) => {
        const datum = JSON.parse(item);

        if (datum && datum.title !== this.cacheBarHovered) {
            this.cacheBarHovered = datum.title;
            this.handleBarHover(datum);
        } else if (datum === null && this.cacheBarHovered !== null) {
            this.cacheBarHovered = datum;
            this.handleBarHover(datum);
        }
    }, 50);

    handleMouseMove = (event) => {
        this.handleMouseMoveThrottled(event.target.getAttribute('data-datum'));
    };

    handleBarClick = (event) => {
        this.props.handleBarClick(JSON.parse(event.target.getAttribute('data-datum')));
    };

    render() {
        const {
            data,
            axesProps,
            margins,
            stackColors,
            paddingMultiplier,
            fillOpacity,
            renderBefore,
            renderAfter,
        } = this.props;
        const { legend, padding, tickFormat, ticksCount } = axesProps;
        const defaultMargins = { top: 10, right: 10, bottom: 150, left: 80 };
        const canvasMargins = margins || defaultMargins;
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 200 + data.length * 30,
        };

        const datePlainList = data.reduce((array, item) => {
            item.values.forEach((item) => {
                array.push(item.dateStart);
                array.push(item.dateEnd);
            });
            return array;
        }, []);

        const yDomain = data.map((item) => item.titleBar);
        const datesDomain = d3extent(datePlainList, (d) => new Date(d));

        const AxesTicksCount = {
            xAxis: Math.min(
                Math.floor((datesDomain[1] - datesDomain[0]) / (1000 * 60 * 60 * 24)),
                (ticksCount && ticksCount.xAxis) || 30
            ),
            yAxis: (ticksCount && ticksCount.yAxis) || data.length,
        };

        const xScale = scaleTime()
            .domain(datesDomain)
            .range([canvasMargins.left, svgDimensions.width - canvasMargins.right])
            .nice(timeDay, 1);

        const yScale = scaleBand()
            .padding(paddingMultiplier || defaultPaddingMultiplier)
            .domain(yDomain)
            .range([svgDimensions.height - canvasMargins.bottom, canvasMargins.top]);

        const height = Math.max(0, yScale.bandwidth());

        return (
            <div>
                <BarDescription stackColors={stackColors} left={canvasMargins.left} />
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
                        ticksCount={AxesTicksCount}
                        tickFormat={tickFormat}
                        svgDimensions={svgDimensions}
                        legend={legend}
                    />
                    {renderBefore &&
                        renderBefore({
                            scales: { xScale, yScale },
                            isClickable: !!this.handleBarClick,
                            margins: canvasMargins,
                            height,
                            fillOpacity: fillOpacity || DEFAULT_FILL_OPACITY,
                            stackColors,
                            svgDimensions,
                        })}
                    {data.map((datum) => (
                        <StackedBarHorizontal
                            key={datum.titleBar}
                            scales={{ xScale, yScale }}
                            y={yScale(datum.titleBar)}
                            isClickable={!!this.handleBarClick}
                            margins={canvasMargins}
                            height={height}
                            data={datum}
                            fillOpacity={fillOpacity || DEFAULT_FILL_OPACITY}
                            stackColors={stackColors}
                            svgDimensions={svgDimensions}
                        />
                    ))}
                    {renderAfter &&
                        renderAfter({
                            scales: { xScale, yScale },
                            isClickable: !!this.handleBarClick,
                            margins: canvasMargins,
                            height,
                            fillOpacity: fillOpacity || DEFAULT_FILL_OPACITY,
                            stackColors,
                            svgDimensions,
                        })}
                </svg>
            </div>
        );
    }
}

const responsiveWrapper = ResponsiveWrapper(Chart);
export default responsiveWrapper;
