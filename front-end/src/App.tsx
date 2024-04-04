import { useState, useEffect } from "react";
import { socket } from "./socket";

import "./App.css";
import Connect from "./components/Connect";

function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);
    const [points, setPoints] = useState({});

    useEffect(() => {
        const onConnect = () => {
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

    const test = () => {
        console.log("testing");
        socket.emit("testEmit", { a: 1, b: 2 });
    };

    if (!isConnected) {
        return <Connect username={username} setUsername={setUsername} />;
    }

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
