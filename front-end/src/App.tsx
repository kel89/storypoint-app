import { useState, useEffect } from "react";
import { socket } from "./socket";

import "./App.css";
import Connect from "./components/Connect";
import VotingView from "./components/VotingView";

function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [username, setUsername] = useState("");
    const [sid, setSid] = useState();
    const [users, setUsers] = useState({});
    const [points, setPoints] = useState({});
    const [showPoints, setShowPoints] = useState(false);

    useEffect(() => {
        const onConnect = () => {
            setSid(socket.id);
            setIsConnected(true);
        };

        const onUsers = (users) => {
            console.log("Settings users", users);
            setUsers(users);
        };

        const onStatus = (status) => {
            console.log(status);
        };

        const onUpdatePoints = (points) => {
            console.log("Update points to", points);
        };

        socket.on("connect", onConnect);
        socket.on("users", onUsers);
        socket.on("status", onStatus);
        socket.on("updatePoints", onUpdatePoints);

        return () => {
            socket.off("connect", onConnect);
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
        return <>Show the results</>;
    }

    // Else, show voting page
    return (
        <VotingView
            users={users}
            points={points}
            sid={sid}
            setShowPoints={setShowPoints}
        />
    );

    return (
        <>
            <div className="text-blue-500">
                You are connected to the socket?
            </div>
            <button onClick={disconnect}>Disconnect</button>
            <br />
        </>
    );
}

export default App;
