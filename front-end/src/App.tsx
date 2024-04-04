import { useState, useEffect } from "react";
import { socket } from "./socket";

import "./App.css";
import Connect from "./components/Connect";
import VotingView from "./components/VotingView";
import ResultsView from "./components/ResultsView";
import { User } from "./types/User";

function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [username, setUsername] = useState("");
    const [sid, setSid] = useState<string>();
    const [users, setUsers] = useState<User[]>([]);
    const [showPoints, setShowPoints] = useState(false);

    useEffect(() => {
        const onConnect = () => {
            setSid(socket.id);
            setIsConnected(true);
        };

        const onUsers = (users: User[]) => {
            console.log("Settings users", users);
            setUsers(users);
        };

        const onShowResults = (show: boolean) => {
            setShowPoints(show);
        };

        const onStatus = (status: string) => {
            console.log(status);
        };

        socket.on("connect", onConnect);
        socket.on("users", onUsers);
        socket.on("status", onStatus);
        socket.on("showResults", onShowResults);

        return () => {
            socket.off("connect", onConnect);
            socket.off("users", onUsers);
            socket.off("status", onStatus);
            socket.off("showResults", onShowResults);
            socket.disconnect();
        };
    }, []);

    const disconnect = () => {
        socket.disconnect();
    };

    // If not connected, force user to conenct
    if (!isConnected) {
        return <Connect username={username} setUsername={setUsername} />;
    }

    if (showPoints) {
        return <ResultsView users={users} />;
    }

    // Else, show voting page
    return <VotingView users={users} />;
}

export default App;
