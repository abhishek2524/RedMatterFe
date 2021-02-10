import React, { useEffect, useState } from 'react';
import {Scatter} from "react-chartjs-2";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import eventsData from "../sample_data/events";
import paramsData from "../sample_data/params";

const ScatterChart = ()=>{
    const [yaxis,setYaxis] = useState(0);
    const [xaxis,setXaxis] = useState(0);
    const [label,setLabel] = useState(['x-axis','y-axis'])
    const xstepSize = 10000;
    const ystepSize = 10000;
    const options = {
        legend:{
            display:false
        },
        responsive:true,
        scales: {
            xAxes: [{
                    scaleLabel: {
                        labelString: label[0],
                        display: true
                    },
                    ticks: {
                        stepSize:xstepSize,
                    },
                    gridLines: {
                        display: false
                    }
                    // display: false
                }],
            yAxes: [{
                    scaleLabel: {
                        labelString: label[1],
                        display: true
                    },
                    ticks: {
                        // beginAtZero: true,
                        // max: 250000,
                        // min:0,
                        stepSize:ystepSize,
                        // maxTicksLimit:250000
                    },
                    gridLines: {
                        display: false
                    }
                    // display: false
                }]
        }
    }
    let newData:any[];
    const getChartData = (x:number,y:number)=>{
        return eventsData.map((res,i)=>{
            return({x:res[x],y:res[y]})
        })
    }
    newData = getChartData(xaxis,yaxis);
    const [chartData,setChartData] = useState({
        "datasets":[{
            backgroundColor: "black",
            pointBorderColor: "black",
            pointBackgroundColor: "black","data":newData}]
        });
        const getAxisLabel = (paramsData:any[],x:number,y:number)=>{
            return(
                paramsData.filter((res,i)=>{
                    if(res.key == x){
                        return res.value
                    }else if(res.key == y){
                        return res.value
                    }
                })  
            )
        };
    useEffect(()=>{
        newData = getChartData(xaxis,yaxis);
        let lb = getAxisLabel(paramsData,xaxis,yaxis);
        let xAxisLabel:string;
        let yAxisLabel:string;
        if(lb.length > 1){
            xAxisLabel = lb[0].value;
            yAxisLabel = lb[1].value;
            setLabel([xAxisLabel,yAxisLabel]);
        }else if(lb.length == 0){
            xAxisLabel = lb[0].value;
            yAxisLabel = lb[0].value;
            setLabel([xAxisLabel,yAxisLabel]);
        }
        setChartData({
            "datasets":[{
                backgroundColor: "blue",
                pointBorderColor: "blue",
                pointBackgroundColor: "blue","data":newData}]
            })
    },[yaxis,xaxis])

    const handleXaxisChange = (event:any) => {
        setXaxis(event.target.value);
    };
    const handleYaxisChange = (event:any) => {
        setYaxis(event.target.value);
    };
    return(
        <>
            <div style={{display:"flex",flexDirection:"column",margin:"2rem",maxWidth:"500px"}}>
                <div style={{display:"flex",flexDirection:"row"}}>
                    <Select
                        value={yaxis}
                        onChange={handleYaxisChange}
                        style={{marginBottom:"auto"}}
                    >
                        {
                            paramsData.map((data,index)=>{
                                return(
                                    <MenuItem key={data.key} value={data.key}>{data.value}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    <div>
                        <Scatter data={chartData} options={options} height={400} width={400} />
                    </div>
                </div>
                <div style={{width:"100%",display:"flex"}}>
                    <Select
                        value={xaxis}
                        onChange={handleXaxisChange}
                        style={{marginLeft:"auto"}}
                    >
                        {
                            paramsData.map((data,index)=>{
                                return(
                                    <MenuItem key={data.key} value={data.key}>{data.value}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </div>
            </div>
            
        </>
    )
}
export default ScatterChart;