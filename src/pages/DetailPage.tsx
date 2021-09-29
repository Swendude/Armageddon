import "../App.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingState } from './ListPage'
import axios from "axios";

function DetailPage() {
    
    const params = useParams<{neo_id:string}>()
    const [loadingState, setLoadingState] = useState<LoadingState>({state:'loading'});
    
    useEffect(() => {
        async function getDetail() {
            setLoadingState({state: "loading"});
            try {
                const resp = await axios.get(
                    `https://api.nasa.gov/neo/rest/v1/neo/${params.neo_id}?api_key=bWDvLGKXMlRV8tdvZryex7PEcjRVFcqScLihCE1b`
                )
                console.log(resp.data);
                setLoadingState({state: "loaded", data:resp.data});
            } catch (error) {
                setLoadingState({state: "error"})
            }
        }
        getDetail();
    }, [params.neo_id]);

    return (
        <div className="App-content">
        <div className="Obj-block">
        {loadingState.state === "loading" && <p>Loading</p>}
        {loadingState.state === "error" && <p>Error</p>}
        {loadingState.state === "loaded" && 
            <div>
                <p>Name: {loadingState.data.name}</p>
                {loadingState.data.close_approach_data.slice(0,10).map((approach: any, i : number) => {
                  return <p key={i}>Seen before on {approach.close_approach_date_full}</p>
                })}
            </div>}
        </div>
        <Link className="App-link" to="/list">
            All close objects
        </Link>
        </div>
  );
}

export default DetailPage;
