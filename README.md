## React-d3-chart-graphs
A javascript library for building charts based on d3.js@4.10.0
Allows you to easily build the following graph:

- [Bar Chart](#BarChart)
- [Stacked Bar Chart](#StackedBarChart)

<img src="https://user-images.githubusercontent.com/3080207/29157010-7cab30de-7dad-11e7-984b-10ae187bdc5d.png">
 
<a name="BarChart"></a>
## Bar Chart
A bar chart or bar graph is a chart or graph that presents grouped data with rectangular bars with lengths proportional 
to the values that they represent. Only vertical bars are supported.

Consists of the following properties:

- [axesProps.padding](#AxesProps)
- data - type: array of object. 

    Fields:
     ```
    {
        title: "title chart",
        value: 7
    }
     ```
- paddingMultiplier -type: Number (from 0 to 1). Default value = 0. Specifies an indent between bars.
- margins - type: object. Set canvas margins.
    Fields (default values):
     ```
        {
            top: 10,
            right: 10,
            bottom: 150,
            left: 80
        }
     ```
- colorScale - type Object. Sets the color of the bar, depending on the value on the y-axis with the help of the function
 d3-interpolate.
    Fields (default values):
     ```
        {
            min: '#B2EBF2'
            max: '#00BCD4',
        }
     ```  
- handleBarClick - The click event is raised when the user clicks on the canvas. If user clicked on bar
argument - item of data and metrics current bar.
    Fields :
    ```
    {
        metrics: {
            left: 548
            top: 129
            width: 52
        },
        title: "title chart",
        value: 7
    }
    ```
    If user click on canvas without bar, argument is `null`

- handleBarHover - The mouseenter and mouseleave events. If user moved mouse in bar, argument - item of data and 
metrics current bar.
    ```
    {
        metrics: {
            left: 548
            top: 129
            width: 52
        },
        title: "title chart",
        value: 7
    }
    ```
    If user mouseleave bar or if user mouseenter on canvas without bar, arguments is `null`
- toggleResize -type Boolean. Forced resizing by the parent, changing the current state to the opposite will resize.

<a name="StackedBarChart"></a>
## Stacked Bar Chart
Bar graphs can also be used for more complex comparisons of data with grouped bar charts and stacked bar charts.
In a grouped bar chart, for each categorical group there are two or more bars.
 
 Consists of the following properties:
 
 - [axesProps.padding](#AxesProps)
 - data - type: array of object. 
 
     Fields:
      ```
     {
        "title": "first bar",
         "values": [
             {
                 "title": "BAR_1",
                 "value": 5
             },
             {
                 "title": "BAR_2",
                 "value": 7
             },
             {
                 "title": "BAR_3",
                 "value": 5
             },
             {
                 "title": "BAR_4",
                 "value": 10
             },
             {
                 "title": "BAR_5",
                 "value": 20
             },
             {
                 "title": "BAR_6",
                 "value": 5
             },
             {
                 "title": "BAR_7",
                 "value": 9
             },
             {
                 "title": "BAR_8",
                 "value": 12
             },
             {
                 "title": "BAR_9",
                 "value": 4
             }
         ]
     }
      ```
- stackColors -type: object. It is map colors to title data.
    Example:
    ```
    {
        'BAR_1': '#607D8B',
        'BAR_2': '#4CAF50',
        'BAR_3': '#009688',
        'BAR_4': '#00BCD4',
        'BAR_5': '#2196F3',
        'BAR_6': '#3F51B5',
        'BAR_7': '#FFCCBC',
        'BAR_8': '#FF9800',
        'BAR_9': '#FFEB3B',
    }
    ```
- paddingMultiplier -type: Number (from 0 to 1). Default value = 0. Specifies an indent between bars.
- margins - type: object. Set canvas margins.
    Fields (default values):
     ```
        {
            top: 10,
            right: 10,
            bottom: 150,
            left: 80
        }
     ```
- handleBarClick - The click event is raised when the user clicks on the canvas. If user clicked on bar
argument - item of data and metrics current bar and titleBar is a title of stack bars.
    Fields :
    ```
    {
        metrics: {
            left: 548
            top: 129
            width: 52
        },
        title: "title chart",
        value: 7,
        titleBar: "first bar"
    }
    ```
    If user click on canvas without bar, argument is `null`

- handleBarHover - The mouseenter and mouseleave events. If user moved mouse in bar, argument - item of data and 
metrics current bar.
    ```
    {
        metrics: {
            left: 548
            top: 129
            width: 52
        },
        title: "title chart",
        value: 7,
        titleBar: "first bar"
    }
    ```
    If user mouseleave bar or if user mouseenter on canvas without bar, arguments is `null`

- toggleResize -type Boolean. Forced resizing by the parent, changing the current state to the opposite will resize.
 
<a name="AxesProps"></a>
## Axes props

- axesProps.legend.xAxis || yAxis - Text on legend
- axesProps.padding.xAxis || yAxis - If padding is specified, sets the padding to the specified value in pixels and
  returns the axis. Default value = 5px. [d3-axis tickPadding](#https://github.com/d3/d3-axis#axis_tickPadding)
- axesProps.ticksCount - [d3-axis tickArguments](https://github.com/d3/d3-axis#axis_tickArguments).
  Default value = 4.
- axesProps.tickFormat.xAxis || yAxis - If format is specified, sets the tick format function and returns the axis.
  [d3-axis axis_tickFormat.](https://github.com/d3/d3-axis#axis_tickFormat)

    Example params:

    ```
    axesProps = {
        label: { //Label text on legend
            xAxis: 'Label bottom axis',
            yAxis: 'Label left axis'
        },
        padding: {
            xAxis: 20,
            yAxis: 20
        },
        ticksCount: 6,
        tickFormat: {
            xAxis: function(value) {
                return value + 'mm';
            }
        }
    }
    ```

## Examples
    Show /examples/src/Components. This is create-react-app kit. CLI: cd examples && yarn start


