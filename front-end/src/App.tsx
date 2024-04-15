import { useState, useEffect } from "react";
import { socket } from "./socket";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import Connect from "./components/Connect";
import VotingView from "./components/VotingView";
import ResultsView from "./components/ResultsView";
import { User } from "./types/User";
import githubLogo from "./assets/github-mark.svg";

function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState();
    const [sid, setSid] = useState<string>();
    const [users, setUsers] = useState<User[]>([]);
    const [showPoints, setShowPoints] = useState(false);
    const [presentationMode, setPresentationMode] = useState(false);

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

        const onClear = () => {
            setUsername("");
            setRole(undefined);
            setSid(undefined);
            setUsers([]);
            setShowPoints(false);
            setPresentationMode(false);
            setIsConnected(false);
        };

        socket.on("connect", onConnect);
        socket.on("users", onUsers);
        socket.on("status", onStatus);
        socket.on("showResults", onShowResults);
        socket.on("clear", onClear);

        return () => {
            socket.off("connect", onConnect);
            socket.off("users", onUsers);
            socket.off("status", onStatus);
            socket.off("showResults", onShowResults);
            socket.off("clear", onClear);
            socket.disconnect();
        };
    }, []);

    // If not connected, force user to conenct
    return (
        <>
            {!isConnected ? (
                <Connect
                    username={username}
                    setUsername={setUsername}
                    role={role}
                    setRole={setRole}
                />
            ) : showPoints ? (
                <ResultsView users={users} />
            ) : (
                <VotingView
                    users={users}
                    presentationMode={presentationMode}
                    setPresentationMode={setPresentationMode}
                />
            )}

            <a
                href="https://github.com/kel89/storypoint-app"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4"
            >
                <img src={githubLogo} alt="GitHub logo" className="w-10 h-10" />
            </a>
            <ToastContainer />
        </>
    );
}

export default App;
