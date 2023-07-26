import React, { Component } from 'react';
import { extent as d3extent } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line as d3line, curveCatmullRom as d3curveCatmullRom } from 'd3-shape';
import { timeDay } from 'd3-time';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Axes from 'src/Axes';
import BarDescription from 'src/Legends';
import ResponsiveWrapper from 'src/ResponsiveWrapper';

const Circle = styled.circle`
    fill: ${(props) => (props.fill ? props.fill : '#fff')};
    fill-opacity: 1;
    stroke: #000;
    stroke-width: 1px;
    &:hover {
        cursor: pointer;
    }
`;

const CIRCLE_RADIUS = 5;

class LineChartTime extends Component {
    static propTypes = {
        handleCircleHover: PropTypes.func,
        handleBarClick: PropTypes.func,
        hideCircles: PropTypes.bool,
        stackColors: PropTypes.object,
        data: PropTypes.array,
        axesProps: PropTypes.object,
        margins: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
        parentWidth: PropTypes.number,
    };
    handleCircleHover = this.props.handleCircleHover ? this.props.handleCircleHover : () => {};

    handleMouseMoveThrottled = throttle((item, event) => {
        const datum = JSON.parse(item);

        if (datum && datum.title !== this.cacheBarHovered) {
            this.cacheBarHovered = datum.title;
            this.handleCircleHover(datum, event);
        } else if (datum === null && this.cacheBarHovered !== null) {
            this.cacheBarHovered = datum;
            this.handleCircleHover(datum, event);
        }
    }, 50);

    handleMouseMove = (event) => {
        this.handleMouseMoveThrottled(event.target.getAttribute('data-datum'), {
            clientX: event.clientX,
            clientY: event.clientY,
        });
    };

    renderCircles = (datum) => {
        const { hideCircles, stackColors } = this.props;

        if (hideCircles) {
            return null;
        }

        return datum.values.map((item) => {
            const yPosition = this.yScale(item.value);
            const xPosition = this.xScale(new Date(item.date));
            return (
                <Circle
                    key={`circle-${datum.title}-${xPosition}`}
                    data-type="outlier"
                    fill={stackColors[datum.title] && stackColors[datum.title].color}
                    data-datum={JSON.stringify({
                        item,
                        title: datum.title,
                        metrics: { left: xPosition, top: yPosition, width: CIRCLE_RADIUS },
                    })}
                    r={CIRCLE_RADIUS}
                    cx={xPosition}
                    cy={yPosition}
                />
            );
        });
    };

    renderChart = (datum) => {
        const { stackColors } = this.props;
        const line = d3line(datum.values)
            .x((d) => this.xScale(new Date(d.date)))
            .y((d) => this.yScale(d.value))
            .curve(d3curveCatmullRom.alpha(1));

        return [
            <path
                key={datum.title}
                fill="none"
                stroke={
                    stackColors[datum.title] && stackColors[datum.title].color ? stackColors[datum.title].color : 'ccc'
                }
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="4.5"
                d={line(datum.values)}
            />,
            this.renderCircles(datum),
        ];
    };

    render() {
        const { data, axesProps, margins, stackColors } = this.props;
        const { legend, padding, ticksCount, tickFormat } = axesProps;
        const defaultMargins = { top: 10, right: 10, bottom: 150, left: 80 };
        const canvasMargins = margins || defaultMargins;
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 500,
        };

        let maxValue = Math.max(
            ...data.reduce((array, item) => {
                item.values.forEach((item) => {
                    array.push(item.value);
                });

                return array;
            }, [])
        );

        if (!isFinite(maxValue)) {
            maxValue = 0;
        }

        const datePlainList = data.reduce((array, item) => {
            item.values.forEach((item) => {
                array.push(item.date);
            });
            return array;
        }, []);

        const datesDomain = d3extent(datePlainList, (d) => new Date(d));

        const AxesTicksCount = {
            xAxis:
                (ticksCount && ticksCount.xAxis) ||
                Math.min(Math.floor((datesDomain[1] - datesDomain[0]) / (1000 * 60 * 60 * 24)), 30),
            yAxis: (ticksCount && ticksCount.yAxis) || data.length,
        };

        this.xScale = scaleTime()
            .domain(datesDomain)
            .range([canvasMargins.left, svgDimensions.width - canvasMargins.right])
            .nice(timeDay, 1);

        this.yScale = scaleLinear()
            .domain([0, maxValue])
            .range([svgDimensions.height - canvasMargins.bottom, canvasMargins.top])
            .nice();

        return (
            <div>
                <BarDescription stackColors={stackColors} left={canvasMargins.left} />
                <svg
                    onMouseMove={this.props.handleCircleHover ? this.handleMouseMove : undefined}
                    onClick={this.props.handleBarClick ? this.handleBarClick : undefined}
                    width={svgDimensions.width}
                    height={svgDimensions.height}
                >
                    <Axes
                        scales={{ xScale: this.xScale, yScale: this.yScale }}
                        padding={padding}
                        margins={canvasMargins}
                        ticksCount={AxesTicksCount}
                        tickFormat={tickFormat}
                        svgDimensions={svgDimensions}
                        legend={legend}
                    />
                    {data.map(this.renderChart)}
                </svg>
            </div>
        );
    }
}

const responsiveWrapper = ResponsiveWrapper(LineChartTime);
export default responsiveWrapper;
