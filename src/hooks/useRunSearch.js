import {useEffect,useState} from 'react';
import {fetchRuns} from '../api/runsApi';

function normalizedFilters(filters) {
  return {...filters, query: filters.query.trim()};
}

export function useRunSearch(filters) {
  const [state,setState] = useState({runs:[],loading:false,error:null});

  useEffect(() => {
    setState(current => ({...current,loading:true,error:null}));
    fetchRuns(normalizedFilters(filters))
      .then(runs => setState({runs,loading:false,error:null}))
      .catch(error => {
        if (error.name !== 'AbortError') {
          setState(current => ({...current,loading:false,error}));
        }
      });
  },[filters.tenant,filters.query,filters.latency]);

  return state;
}
