import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ScatterChart from './ScatterChart';

interface ParamTypes {
    workspaceId: string;
}

const Graph = (props:any)=>{
    const {workspaceId} = useParams<ParamTypes>();
    const [lableObj,setLableObj] = useState({});
    const [graphData,setGraphdata] = useState([])
    useEffect(()=>{
        let lb:any = {};
        props.params.map((data:any)=>{
            lb[data.key] = data.value;
        });
        setLableObj(lb);
        props.workspacedata.map((data:any)=>{
            if(data.workspaceId == workspaceId){
                setGraphdata(data.graphs);
            }
        });
    },[]);
    return (
        <>
        <div className="container-fluid">
            <div className="row">
            {
                graphData.map((data:any)=>{
                    return (
                        <ScatterChart key={data._id} id={data._id} paramsData={props.params} lableData={lableObj} graphData={data} eventsData={props.events}/>
                    )
                })
            }
            </div>
        </div>
        </>
    )
}

export default Graph;