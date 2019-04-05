import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ResponsiveWrapper = (ChartComponent) =>
    class _ extends Component {
        state = {
            containerWidth: null,
        };

        propTypes = {
            toggleResize: PropTypes.any,
        };

        containerRef = React.createRef();

        componentDidMount() {
            this.fitParentContainer();
            window.addEventListener('resize', this.fitParentContainer);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.fitParentContainer);
        }

        UNSAFE_componentWillReceiveProps(nextProps) {
            if (this.props.toggleResize !== nextProps.toggleResize) {
                this.fitParentContainer();
            }
        }

        fitParentContainer = () => {
            const { containerWidth } = this.state;
            const currentContainerWidth = this.containerRef.current.getBoundingClientRect().width;
            const shouldResize = containerWidth !== currentContainerWidth;
            if (shouldResize) {
                this.setState({
                    containerWidth: currentContainerWidth,
                });
            }
        };

        renderChart() {
            const parentWidth = this.state.containerWidth;
            return <ChartComponent {...this.props} parentWidth={parentWidth} />;
        }

        render() {
            const { containerWidth } = this.state;
            const shouldRenderChart = containerWidth !== null;

            return <div ref={this.containerRef}>{shouldRenderChart && this.renderChart()}</div>;
        }
    };

export default ResponsiveWrapper;
