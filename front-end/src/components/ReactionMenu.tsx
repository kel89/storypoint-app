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
        <div className="border rounded border-gray-100 shadow-lg p-2">
            <h2>Reactions</h2>
            <div className="flex flex-wrap justify-between gap-1 p-2">
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => sendReaction("happyFaces")}
                >
                    <span>😊</span>
                </button>
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => sendReaction("makeItRain")}
                >
                    <span>💰</span>
                </button>
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => sendReaction("mindBlown")}
                >
                    <span>🤯</span>
                </button>
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => sendReaction("hurryUp")}
                >
                    <span>🕒</span>
                </button>
            </div>
        </div>
    );
}
