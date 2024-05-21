import { useState, useEffect, useRef } from "react";
import { socket } from "./socket";
import { ToastContainer, toast, Bounce } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import Connect from "./components/Connect";
import VotingView from "./components/VotingView";
import ResultsView from "./components/ResultsView";
import { User } from "./types/User";
import githubLogo from "./assets/github-mark.svg";
import { rainDollarEmojis } from "./helpers/rainDollars";
import { playHurryUp } from "./helpers/playHurryUp";
import { createFloatingEmojis } from "./helpers/emojiAnimation";
import { expandCenterEmoji } from "./helpers/expandCenterEmoji";
import { UserContext } from "./context/UserContex";

function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState();
    const [sid, setSid] = useState<string>();
    const [users, setUsers] = useState<User[]>([]);
    const [showPoints, setShowPoints] = useState(false);
    const [presentationMode, setPresentationMode] = useState(false);
    const sidRef = useRef<string>();

    useEffect(() => {
        const onConnect = () => {
            sidRef.current = socket.id;
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
            socket.disconnect();

            toast("The room has been cleared!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        };

        const onReaction = (data: { reaction: string; sender: string }) => {
            const { reaction, sender } = data;
            let reactionName: string;
            if (reaction === "makeItRain") {
                rainDollarEmojis("💵", 3000, 100);
                reactionName = "make it rain";
            }
            if (reaction === "hurryUp") {
                playHurryUp();
                reactionName = "we're waiting";
            }
            if (reaction === "happyFaces") {
                createFloatingEmojis("😊", 3000, 100);
                reactionName = "happy faces";
            }
            if (reaction === "mindBlown") {
                expandCenterEmoji("🤯", 3000);
                reactionName = "mind blown";
            }
            toast(`${sender} reacted with ${reactionName}`, {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        };

        const onCallout = (data: { sid: string }) => {
            if (data.sid == sidRef.current) {
                playHurryUp();
                toast("You have been called out!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        };

        socket.on("connect", onConnect);
        socket.on("users", onUsers);
        socket.on("status", onStatus);
        socket.on("showResults", onShowResults);
        socket.on("reaction", onReaction);
        socket.on("callout", onCallout);
        socket.on("clear", onClear);

        return () => {
            socket.off("connect", onConnect);
            socket.off("users", onUsers);
            socket.off("status", onStatus);
            socket.off("showResults", onShowResults);
            socket.off("reaction", onReaction);
            socket.off("callout", onCallout);
            socket.off("clear", onClear);
            socket.disconnect();
        };
    }, []);

    // Update sidRef whenever sid changes
    useEffect(() => {
        sidRef.current = sid;
    }, [sid]);

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
                <UserContext.Provider value={username}>
                    <ResultsView users={users} />
                </UserContext.Provider>
            ) : (
                <UserContext.Provider value={username}>
                    <VotingView
                        users={users}
                        presentationMode={presentationMode}
                        setPresentationMode={setPresentationMode}
                    />
                </UserContext.Provider>
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
