import React, {useState} from "react";
import ServerConnector from "./ServerConnector";
import BuilderField from "../components/game/builder field/builder-field";
import Menu from "../components/ui/menu";
import {TileState, TileType} from "../components/game/shared/types";
import GamePage from "./gamePage";

enum Phases {
  BuilderPhase,
  ConnectionPhase,
  GamePhase
}

type State = {
  yourField?: TileState[][],
  enemyField?: TileState[][],
  phase: Phases,
  username?: string,
  socket?: any
}

export default function GameManager() {
  const [state, setState] = useState<State>({phase: Phases.BuilderPhase})

  const handleBuilderPhaseFinished = (field: TileState[][]) => {
    setState({phase: Phases.ConnectionPhase, yourField: field})
  }

  const handleConnect = (username: string, socket: any) => {
    if (state.yourField == undefined) throw "field is undefined";
    // socket.emit('field', ToBoolField(state.yourField));
    socket.emit('field', state.yourField);
    // socket.on("field", (field: boolean[][]) => {
    //   setState({...state, enemyField: field, phase: Phases.GamePhase, socket: socket})
    // });
    socket.on("field", (field: TileState[][]) => {
      setState({...state, enemyField: field, phase: Phases.GamePhase, socket: socket})
    });
    setState({...state, username: username, socket: socket})
  }

  if (state.phase === Phases.BuilderPhase) {
    return (
      <Menu>
        <BuilderField finished={handleBuilderPhaseFinished}/>
      </Menu>)
  } else if (state.phase === Phases.ConnectionPhase) {
    return <ServerConnector connected={handleConnect}/>
  } else {
    if (!state.yourField || !state.enemyField) throw "field is undefined";
    return <GamePage socket={state.socket} yourField={state.yourField} enemyField={state.enemyField}/>
  }
}