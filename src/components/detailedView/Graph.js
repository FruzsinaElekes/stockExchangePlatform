import React from 'react'
import styled, { css } from 'styled-components';
import Card from './Card';
import {CanvasJS, CanvasJSChart} from 'canvasjs-react-charts'


export default function Graph(props) {
    const data = props.timeseries
    console.log(data)

    const options = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Stock Price of BMW - March 2018"
        },
        axisX:{
            valueFormatString: "DD MMM",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Closing Price (in EUR)",
            valueFormatString: "€##0.00",
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
            xValueFormatString: "DD MMM",
            yValueFormatString: "€##0.00",
            dataPoints: data
        }]
    }

    return (
        <Card>
            <CanvasJSChart options = {options}/>
        </Card>
    )
}