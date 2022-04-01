import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Socket } from "socket.io-client";

import { Button, Heading, TextField } from "@/components";
import { getRandomInt } from "@/utils/random";
import { RollOutput } from "../models";
import { RollHistory } from "../components/RollHistory";
// import { HostSettings } from "../components/HostSettings";
import { PlayerSettings, GameSettings } from "../models";

const MIN_DICES = 1;
const MAX_DICES = 16;
const sliderMarks = Array.from(Array(MAX_DICES)).reduce((acc, _, i) => {
  acc[i + 1] = { label: i + 1 };
  return acc;
}, {});

export interface GameProps {
  socket: Socket;
  playerSettings: PlayerSettings;
  gameSettings: GameSettings;
  onLeave: () => void;
}

export const Game: React.FC<GameProps> = ({ socket, playerSettings, gameSettings, onLeave }) => {
  const [history, setHistory] = useState<RollOutput[]>([]);
  const [nbDices, setNbDices] = useState<number>(6);
  const [players, setPlayers] = useState<PlayerSettings[]>([]);

  useEffect(() => {
    const handlers: Record<string, any> = {
      played_joined: (data: any) => { },
      player_left: (data: any) => {
        console.log("todo: display message about player that left");
      },
      player_roll: (data: any) => {
        console.log("todo: do the thing");
      },
      player_changed_name: (data: any) => {
        const { prevName, newName } = data;

        console.log(`${prevName} changed name to ${newName}`);
      },
      player_list: (data: any) => {
        const { players } = data;
        setPlayers(players);
      },
    };

    // Register all event handlers
    for (const evt in handlers) {
      socket.on(evt, handlers[evt]);
    }

    return () => {
      // Deregister all event handlers
      for (const evt in handlers) {
        socket.off(evt);
      }
    };
  }, [socket]);

  // const roll = (): void => {
  //     const rollOutput: RollOutput = {
  //         timestamp: new Date(),
  //         name,
  //         nbDices,
  //         diceSize,
  //         successValue,
  //         results: [],
  //         rerolls: [],
  //     };

  //     for (let i = 0; i < nbDices; i++) {
  //         const value = getRandomInt(1, diceSize);
  //         rollOutput.results.push(value);
  //     }

  //     socket.emit("roll", rollOutput);

  //     setHistory([...history, rollOutput]);
  // };

  const onClearHistory = () => setHistory([]);

  const onRemoveHistoryItem = (itemToRemove: RollOutput): void => {
    const index = history.findIndex((item) => item === itemToRemove);

    setHistory([...history.slice(0, index), ...history.slice(index + 1)]);
  };

  const onChangeName = (name: string): void => {
    socket.emit("change_name", { name: name });
  };

  const onReroll = (item: RollOutput): void => {
    const result = getRandomInt(1, item.diceSize);
    const updatedItem: RollOutput = {
      ...item,
      rerolls: [
        ...(item.rerolls || []),
        {
          ...item,
          timestamp: new Date(),
          results: [result],
          rerolls: undefined,
        },
      ],
    };

    const index = history.findIndex((i) => i === item);
    setHistory([...history.slice(0, index), updatedItem, ...history.slice(index + 1)]);
  };

  const onLeaveGame = (): void => {
    socket.emit("leave_game");
    onLeave();
  };

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex align-center">
        <b className="mr-3">Game ID:</b> <pre>{gameSettings.id}</pre>{" "}
        <Button size="xs" className="ml-3" onClick={onLeaveGame}>
          Leave Game
        </Button>
      </div>

      <div className="flex">
        <div className="flex-1 p-2 ">
          <Heading>Player Settings</Heading>

          <div className="flex items-center mb-3 mt-2">
            <div className="w-40">
              <label htmlFor="name-input">Name</label>
            </div>

            <div className="flex-auto">
              <TextField
                id="name-input"
                defaultValue={playerSettings.name}
                onChange={onChangeName}
              />
            </div>
          </div>

          <div className="mt-6 mb-10 flex">
            <div className="flex-col flex-auto p-2 pb-5 mr-3">
              <Slider
                min={MIN_DICES}
                max={MAX_DICES}
                defaultValue={nbDices}
                value={nbDices}
                onChange={setNbDices}
                dots={true}
                marks={sliderMarks}
              />
            </div>

            <div className="flex-none w-20">
              <TextField
                id="nb-dices-input"
                value={nbDices.toString()}
                onChange={value => setNbDices(parseInt(value))}
              />
            </div>
          </div>

          {/* <Button fill size="lg" onClick={roll}>
                            Roll {nbDices}d{diceSize}
                        </Button> */}

          <div>
            <Heading>Players List ({players.length})</Heading>
            {players.map((player) => {
              return <div>{player.name}</div>;
            })}
          </div>
        </div>

        <div className="flex flex-col flex-1 p-2">
          <div className="flex align-center justify-between mb-2">
            <Heading inline>Roll History</Heading>
            <Button onClick={onClearHistory}>Clear</Button>
          </div>

          <RollHistory
            items={history}
            onRemoveItem={onRemoveHistoryItem}
            onReroll={onReroll}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
