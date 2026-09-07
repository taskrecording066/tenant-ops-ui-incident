import {useEffect,useState} from 'react'; import {fetchRuns} from '../api/runsApi';
// Investigation target: requests are not associated with a generation/request id.
export function useRunSearch(filters){const [state,setState]=useState({runs:[],loading:false,error:null}); useEffect(()=>{setState(s=>({...s,loading:true,error:null})); fetchRuns(filters).then(r=>setState({runs:r,loading:false,error:null})).catch(error=>{if(error.name!=='AbortError')setState(s=>({...s,loading:false,error}))});},[filters.tenant,filters.query,filters.latency]); return state;}
