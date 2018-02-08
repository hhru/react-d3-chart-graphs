import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import BarChart from './Components/BarChart';
import StackedBarChart from './Components/StackedBarChart';
import BoxPlot from './Components/BoxPlot';
import GanttChart from './Components/GanttChart';
import LineChart from './Components/LineChart';

import '@hh.ru/react-d3-chart-graphs/styles.css';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <div className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h2>React-d3-chart-graphs examples</h2>
                </div>
                <h1>Example Bar chart</h1>
                <BarChart />
                <h1>Example Stacked bar chart</h1>
                <StackedBarChart />
                <h1>Example Box plots</h1>
                <BoxPlot />
                <h1>Example Gantt chart</h1>
                <GanttChart />
                <h1>Example Line chart time</h1>
                <LineChart />
            </div>
        );
    }
}

export default App;
