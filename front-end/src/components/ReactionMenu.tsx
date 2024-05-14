import { socket } from "../socket";

export default function ReactionList() {
    const sendReaction = (reaction: string) => {
        console.log("About to send");
        socket.emit("sendReaction", {
            reaction: reaction,
            sentBy: "user",
        });
    };

    return (
        <div>
            <button onClick={() => sendReaction("happyFaces")}>
                <span>😊</span>
            </button>
            <button onClick={() => sendReaction("makeItRain")}>
                <span>💰</span>
            </button>
            <button onClick={() => sendReaction("mindBlown")}>
                <span>🤯</span>
            </button>
            <button onClick={() => sendReaction("hurryUp")}>
                We're Waiting
            </button>
        </div>
    );
}
