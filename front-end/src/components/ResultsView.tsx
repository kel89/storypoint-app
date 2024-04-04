import UserList from "./UserList";
import { User } from "../types/User";
import { socket } from "../socket";

type ResultsViewProps = {
    users: User[];
};

export default function ResultsView({ users }: ResultsViewProps) {
    const clearPoints = () => {
        console.log("Clearing points");
        socket.emit("clearPoints");
    };

    return (
        <>
            <div className="flex justify-between">
                <div className="w-1/3 p-4 flex flex-col items-center">
                    <div className="w-full mb-4">
                        <UserList users={users} showPoints={true} />
                    </div>
                    <button
                        onClick={clearPoints}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Clear Votes
                    </button>
                </div>
                <div className="w-2/3 p-4">Results Graph</div>
            </div>
        </>
    );
}
