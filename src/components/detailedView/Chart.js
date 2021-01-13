import React from 'react'
import Card from './Card';
import {CanvasJS, CanvasJSChart} from 'canvasjs-react-charts'


export default function Chart(props) {
    const symbol = props.chartdata.symbol
    const data = props.chartdata.timeseries

    const options = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: `Stock Price of ${symbol}`
        },
        axisX:{
            valueFormatString: "YYYY.MM.DD",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Closing Price (USD)",
            valueFormatString: "$##0.00",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return "€" + CanvasJS.formatNumber(e.value, "##0.00");
                }
            }
        },
        data: [{
            type: "area",
            xValueFormatString: "YYYY.MM.DD",
            yValueFormatString: "$##0.00",
            dataPoints: data
        }]
    }

    return (
        <Card>
            <CanvasJSChart options={options}/>
        </Card>
    )
}