import React,{useEffect, useState} from 'react';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Components/Home';
import { Route, Switch } from 'react-router-dom';
import Graph from './charts/Graph';

function App() {

    const [error,setError] = useState(false);
    const [workspacedata,setWorkspace] = useState([]);
    const [isLoading,setIsLoad] = useState(true);
    const [events,setEvents] = useState([]);
    const [params,setParams] = useState([]);

    const fetchdata = async ()=>{
        try{
            const res = await fetch("http://localhost:5000/graphs")
            res.json()
            .then((res)=>{
                setWorkspace(res);                                
                setIsLoad(false);
            })
            .catch((err)=>{
                setError(true);
                setIsLoad(false);
            })
        }catch(e){
            setError(true);
            setIsLoad(false);
        } 
    }

    const fetchEvents = async ()=>{
        try{
            const res = await fetch("http://localhost:5000/events")
            res.json()
            .then((res)=>{
                setEvents(res);
                setIsLoad(false);
            })
            .catch((err)=>{
                setError(true);
                setIsLoad(false);
            })
        }catch(e){
            setError(true);
            setIsLoad(false);
        }
    }
    const fetchParams = async ()=>{
        try{
            const res = await fetch("http://localhost:5000/params")
            res.json()
            .then((res)=>{
                setParams(res);                          
                setIsLoad(false);
            })
            .catch((err)=>{
                setError(true);
                setIsLoad(false);
            })
        }catch(e){
            setError(true);
            setIsLoad(false);
        }
    }

    useEffect(()=>{
        fetchdata();
        fetchEvents();
        fetchParams();
    },[])
    


  return (
    <>
    <Switch>
      <Route exact path="/" render={()=><Home events={events} params={params} error={error} workspacedata={workspacedata} isLoading={isLoading} /> }/>
      <Route exact path="/plot/:workspaceId" render={()=><Graph events={events} params={params} workspacedata={workspacedata}/>}/>
    </Switch>
    </>
  );
}

export default App;
