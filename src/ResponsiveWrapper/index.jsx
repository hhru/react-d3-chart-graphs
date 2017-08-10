import React, {Component} from 'react';

export default ChartComponent => (
    class ResponsiveChart extends Component {
        state = {
            containerWidth: null,
        }

        componentDidMount() {
            this.fitParentContainer();
            window.addEventListener('resize', this.fitParentContainer);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.fitParentContainer)
        }

        componentWillReceiveProps(nextProps) {
            if (this.props.toggleDrawerAnimationEndState !== nextProps.toggleDrawerAnimationEndState) {
                this.fitParentContainer();
            }
        }

        fitParentContainer = () => {
            const {containerWidth} = this.state;
            const currentContainerWidth = this.chartContainer.getBoundingClientRect().width;
            const shouldResize = containerWidth !== currentContainerWidth;
            if (shouldResize) {
                this.setState({
                    containerWidth: currentContainerWidth,
                });
            }
        }

        renderChart() {
            const parentWidth = this.state.containerWidth;

            return (
                <ChartComponent {...this.props} parentWidth={parentWidth} />
            );
        }

        getChartContainer = (el) => {
            this.chartContainer = el;
        }

        render() {
            const {containerWidth} = this.state;
            const shouldRenderChart = containerWidth !== null;

            return (
                <div ref={this.getChartContainer}>
                    {shouldRenderChart && this.renderChart()}
                </div>
            );
        }
    }
);
