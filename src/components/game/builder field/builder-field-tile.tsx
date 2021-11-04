import {useEffect, useState} from "react";
import {CropSquare, Water} from "@mui/icons-material";
import {styles} from "../shared/styles";
import {Cords} from "../shared/types";

export enum States {
  Empty,
  PlacementInProgress,
  PlacementBlocked,
  Placed
}

type AppProps = {
  size: number;
  cords: Cords;
  empty: boolean;
  state: States;
  onHover: any;
};

export default function BuilderFieldTile(props: AppProps) {
  const [state, setState] = useState(props.state);
  useEffect(() => {
    setState(props.state)
  }, [props.state])
  switch (state) {
    case States.Empty:
      return (
        <div style={{width: props.size, height: props.size}}
             onMouseEnter={() => props.onHover(props.cords)}>
          <Water
            style={{...styles.maxSize, color: "blue"}}/>
        </div>
      )
    case States.PlacementInProgress:
      return (
        <div style={{width: props.size, height: props.size}}
             onMouseEnter={() => props.onHover(props.cords)}>
          <CropSquare
            style={{...styles.maxSize, color: "green"}}/>
        </div>
      )
    case States.PlacementBlocked:
      return (
        <div style={{width: props.size, height: props.size}}
             onMouseEnter={() => props.onHover(props.cords)}>
          <CropSquare
            style={{...styles.maxSize, color: "red"}}/>
        </div>
      )
    case States.Placed:
      return (
        <div style={{width: props.size, height: props.size}}
             onMouseEnter={() => props.onHover(props.cords)}>
          <CropSquare
            style={styles.maxSize}/>
        </div>
      )
  }
}