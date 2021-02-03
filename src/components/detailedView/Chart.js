import React from 'react'
import Card from './Card';
import {CanvasJS, CanvasJSChart} from 'canvasjs-react-charts'


export function Chart(props) {
    const symbol = props.symbol
    const data = props.chartdata.map(daily => ({x: new Date(daily.date), y: daily.price}))
    const minY = data ? Math.floor(Math.min(...(data.map(point => point.y)))/2) : 0

    const options = {
        animationEnabled: true,
        theme: "light2",
        height: 400,
        title:{
            text: `Stock Price of ${symbol}`,
            fontSize: 22,
            horizontalAlign: "center"
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
            minimum: minY,
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return "$" + CanvasJS.formatNumber(e.value, "##0.00");
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