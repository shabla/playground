import http from "http";
import { Server, Socket } from "socket.io";

interface PlayerSettings {
    id: string;
    name: string;
    currentGameId?: string;
}

export const initWebSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    // Global stores
    const games: Record<string, any> = {};
    const players: Record<string, PlayerSettings> = {};

    // Whenever someone connects this gets executed
    io.on("connection", function (socket) {
        console.log("A user connected", socket.id);

        const emitGameJoined = (
            socket: Socket,
            playerSettings: PlayerSettings,
            gameSettings: any
        ): void => {
            socket.emit("game_joined", {
                playerSettings,
                gameSettings,
            });
        };

        const emitPlayerList = (socket: Socket, gameId: string): void => {
            console.log(`sending player list to players in room ${gameId}`);
            socket.to(gameId).emit("player_list", { players: getPlayersList(gameId) });
        };

        const getPlayer = (id: string): PlayerSettings => {
            if (!players[id]) {
                players[id] = {
                    id,
                    name: `Player ${id}`,
                };
            }

            return players[id];
        };

        const getPlayersList = (gameId: string) => {
            const output: any = Object.keys(players)
                .map((playerId) => players[playerId])
                .filter((player) => player.currentGameId === gameId);
            console.log(gameId, output);

            return output;
        };

        socket.on("create_game", (data: any) => {
            const gameId = `Game_${socket.id}`;

            const gameSettings = { ...data, id: gameId, hostId: socket.id };
            const playerSettings = getPlayer(socket.id);
            playerSettings.currentGameId = gameSettings.id;

            // Save player
            players[playerSettings.id] = playerSettings;

            // Save game
            games[gameSettings.id] = gameSettings;

            console.log(
                `Player ${playerSettings.name} now hosts a game with id ${gameSettings.id}`,
                data
            );

            emitGameJoined(socket, playerSettings, gameSettings);
            emitPlayerList(socket, gameSettings.id);
        });

        socket.on("join_game", (data: any) => {
            const { gameId } = data;
            const gameSettings = games[gameId];

            if (!gameSettings) {
                console.log(`Game ${gameId} doesn't exist`);
                socket.emit("invalid_game_id");
                return;
            }

            const player = getPlayer(socket.id);
            player.currentGameId = gameId;
            players[player.id] = player;

            socket.join(gameId);

            console.log(`Player "${player.name}" joined game "${gameId}"`);

            emitGameJoined(socket, player, gameSettings);
            emitPlayerList(socket, gameSettings.id);

            console.log("trying tyo broadcat player joined to", gameId);

            socket.to(gameId).emit("player_joined", { playedId: player.id });
        });

        socket.on("leave_game", () => {
            const player = players[socket.id];

            if (!player || !player.currentGameId) {
                console.log("player is not currently in a game");
                return;
            }

            console.log(`Player "${player.name}" left game`, player.currentGameId);

            // Emit to other players in the room
            socket.to(player.currentGameId).emit("player_left", { playerId: player.id });

            // remove from game room
            socket.leave(player.currentGameId);

            // update player
            players[player.id] = { ...player, currentGameId: undefined };

            // TODO: wat do if host leaves the game
        });

        socket.on("change_name", (data: any) => {
            const player = players[socket.id];
            if (!player || !player.currentGameId) {
                console.log("player is not currently in a game");
                return;
            }

            const newName = data.name;

            player.name = newName;
            players[player.id] = player;

            emitPlayerList(socket, player.currentGameId);
        });

        // socket.on("roll", (data: any) => {
        //     console.log("roll", data);

        //     socket.emit("user_rolled", {
        //         message: `${data.name} rolled ${data.results.join(", ")}}`,
        //     });
        // });

        // Whenever someone disconnects this piece of code executed
        socket.on("disconnect", function () {
            console.log("A user disconnected");
        });
    });
};
