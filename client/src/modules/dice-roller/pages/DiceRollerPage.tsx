import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { Page } from "@/components";
import { ConnectionForm } from "../components/ConnectionForm";
import { Game } from "../components/Game";
import { PlayerSettings, GameSettings } from "../models";

const SOCKET_URL = "http://localhost:4444";
const socket = io(SOCKET_URL, { autoConnect: false });

export const DiceRollerPage: React.FC = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings>();
  const [playerSettings, setPlayerSettings] = useState<PlayerSettings>();

  useEffect(() => {
    console.log("Connecting to websocket...");
    socket.connect();

    const handlers: Record<string, any> = {
      connect: () => {
        console.log("Connected. Socket id", socket.id);
      },
      game_joined: (data: any) => {
        const { gameSettings, playerSettings } = data;
        setGameSettings(gameSettings);
        setPlayerSettings(playerSettings);
      },
    };

    const logEvent = (name: string, data: any) => {
      console.log(`[${name}]`, data);
    };

    // Log all incoming events
    socket.onAny(logEvent);

    // Register all event handlers
    for (const evt in handlers) {
      socket.on(evt, handlers[evt]);
    }

    return () => {
      socket.disconnect();

      // Deregister logging handler
      socket.offAny(logEvent);

      // Deregister all event handlers
      for (const evt in handlers) {
        socket.off(evt);
      }
    };
  }, []);

  const onCreateGame = (settings: any) => {
    socket.emit("create_game", settings);
  };

  const onJoinGame = (gameId: string) => {
    socket.emit("join_game", { gameId });
  };

  const onLeaveGame = () => {
    setGameSettings(undefined);
    setPlayerSettings(undefined);
  };

  return (
    <Page title="Dice Roller" className="flex flex-col">
      <div className="flex flex-grow flex-col">
        {!gameSettings && (
          <ConnectionForm onCreateGame={onCreateGame} onJoinGame={onJoinGame} />
        )}
        {gameSettings && playerSettings && (
          <Game
            socket={socket}
            playerSettings={playerSettings}
            gameSettings={gameSettings}
            onLeave={onLeaveGame}
          />
        )}
      </div>
    </Page>
  );
};

export default DiceRollerPage;
