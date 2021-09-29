import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export type LoadingState =
  | { state: "loading" }
  | { state: "loaded"; data: any }
  | { state: "error" };

type DayListProps = {
  date: Date;
  objects: any[];
};

type ListProps = {
  date: Date;
  size: number;
  identifier: string;
  neo_id: string;
};

function ListElement(props: ListProps) {
  return (
    <div className="Obj-block">
      <p>Name : {props.identifier}</p>
      <p>Size: {Math.round(props.size)} meters</p>
      <p>Approacing on {props.date}</p>
      <Link className="App-link" to={`details/${props.neo_id}`}>See more info</Link>
    </div>
  );
}

function DayList(props: DayListProps) {
  return (
    <div>
      {props.objects.map((obj, i) => (
        <ListElement
          key={i}
          date={props.date}
          size={obj.estimated_diameter.meters.estimated_diameter_max}
          identifier={obj.name}
          neo_id ={obj.neo_reference_id}
        ></ListElement>
      ))}
    </div>
  );
}

function ListPage() {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    state: "loading",
  });

  useEffect(() => {
    async function getList() {
      setLoadingState({ state: "loading" });
      try {
        const data = await axios.get(
          `https://api.nasa.gov/neo/rest/v1/feed?api_key=bWDvLGKXMlRV8tdvZryex7PEcjRVFcqScLihCE1b`
        );
        setLoadingState({
          state: "loaded",
          data: Object.entries(data.data.near_earth_objects).sort((a, b) =>
            a > b ? 1 : -1
          ),
        });
      } catch (error) {
        setLoadingState({ state: "error" });
      }
    }
    getList();
  }, []);

  return (
    <div className="App-content">
      {loadingState.state === "loading" && <p>Loading..</p>}
      {loadingState.state === "error" && <p>Error..</p>}
      {loadingState.state === "loaded" &&
        loadingState.data
          .slice(0, 1)
          .map((d: any, i: number) => (
            <DayList key={i} date={d[0]} objects={d[1]}></DayList>
          ))}
    </div>
  );
}

export default ListPage;
