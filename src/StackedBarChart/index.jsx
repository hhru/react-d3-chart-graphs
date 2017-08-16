import React, {PureComponent} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import throttle from 'lodash.throttle';

import Axes from '../Axes';
import StackedBars from '../StackedBars';
import BarDescription from '../Legends';
import ResponsiveWrapper from '../ResponsiveWrapper';

class Chart extends PureComponent {
    xScale = scaleBand();
    yScale = scaleLinear();
    handleBarHover = this.props.handleBarHover ? this.props.handleBarHover.bind(null) : () => {};

    handleMouseMoveThrottled = throttle((item) => {
        const datum = JSON.parse(item);

        if (datum && datum.title !== this.casheBarHovered) {
            this.casheBarHovered = datum.title;
            this.handleBarHover(datum);
        } else if (datum === null && this.casheBarHovered !== null) {
            this.casheBarHovered = datum;
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
        const { data, paddingMultiplier, axesProps, stackColors, margins } = this.props;
        const { legend, padding, ticksCount, tickFormat } = axesProps;
        const defaultPaddingMultiplier = 0;
        const defaultMargins = { top: 10, right: 10, bottom: 150, left: 80 };
        const canvasMargins = margins || defaultMargins;
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 500,
        };

        let maxValue = Math.max(...this.props.data.reduce((stack, datum) => {
            stack.push(datum.values.reduce((result, item) => {
                return result + item.value;
            }, 0));

            return stack;
        }, []));

        if (!isFinite(maxValue)) {
            maxValue = 0;
        }

        const xScale = this.xScale
            .padding(paddingMultiplier || defaultPaddingMultiplier)
            .domain(data.map(d => d.titleBar))
            .range([canvasMargins.left, svgDimensions.width - canvasMargins.right]);

        const yScale = this.yScale
            .domain([0, maxValue])
            .range([svgDimensions.height - canvasMargins.bottom, canvasMargins.top])
            .nice(4);

        return (
            <div>
                <BarDescription stackColors={stackColors} left={canvasMargins.left}/>
                <svg
                    onMouseMove={this.props.handleBarHover ? this.handleMouseMove : undefined}
                    onClick={this.props.handleBarClick ? this.handleBarClick : undefined}
                    width={svgDimensions.width}
                    height={svgDimensions.height}
                    style={{overflow: 'overlay'}}>
                    <Axes
                        scales={{xScale, yScale}}
                        padding={padding}
                        margins={canvasMargins}
                        ticksCount={ticksCount}
                        tickFormat={tickFormat}
                        svgDimensions={svgDimensions}
                        legend={legend} />
                    <StackedBars
                        scales={{xScale, yScale}}
                        isClickable={!!this.handleBarClick}
                        margins={canvasMargins}
                        data={this.props.data}
                        maxValue={maxValue}
                        stackColors={stackColors}
                        svgDimensions={svgDimensions} />
                </svg>
            </div>
        );
    }
}

const responsiveWrapper = ResponsiveWrapper(Chart);
export default responsiveWrapper;
