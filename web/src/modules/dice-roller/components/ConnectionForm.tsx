import React, { useState } from "react";

import { Button, Heading, InputText } from "components";
import { HostSettings } from "../components/HostSettings";
import { GameSettings } from "../models";

interface ConnectionFormProps {
    onCreateGame: (settings: any) => void;
    onJoinGame: (gameId: string) => void;
}

export const ConnectionForm: React.FC<ConnectionFormProps> = ({ onCreateGame, onJoinGame }) => {
    const [gameSettings, setGameSettings] = useState<Partial<GameSettings>>();
    const [gameId, setGameId] = useState<string>("");

    return (
        <div className="border p-3 w-96">
            <div className="mb-3">
                <Heading>Create a game</Heading>

                <HostSettings onChange={setGameSettings} />

                <Button fill onClick={() => onCreateGame(gameSettings)} className="mt-4">
                    Create Game
                </Button>
            </div>

            <div>
                <Heading>Join a game</Heading>

                <div className="flex items-center mb-3 mt-2">
                    <div className="w-40">
                        <label htmlFor="name-input">Game Id</label>
                    </div>

                    <div className="flex-auto">
                        <InputText
                            id="game-id-input"
                            defaultValue={gameId}
                            onChange={(e) => setGameId(e.currentTarget.value)}
                        />
                    </div>
                </div>

                <Button fill onClick={() => onJoinGame(gameId)}>
                    Join Game
                </Button>
            </div>
        </div>
    );
};

export default ConnectionForm;
