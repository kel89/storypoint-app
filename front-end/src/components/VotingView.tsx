import UserList from "./UserList";
import PointSelector from "./PointSelector";
import { socket } from "../socket";
import { User } from "../types/User";

type VotingViewProps = {
    users: User[];
};

export default function VotingView({ users }: VotingViewProps) {
    const emitShowPoints = () => {
        console.log("Show Votes");
        socket.emit("showResults");
    };
    return (
        <>
            <div className="flex justify-between">
                <div className="w-1/3 p-4 flex flex-col items-center">
                    <div className="w-full mb-4">
                        <UserList users={users} showPoints={false} />
                    </div>
                    <button
                        onClick={emitShowPoints}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Show Votes
                    </button>
                </div>
                <div className="w-2/3 p-4">
                    <PointSelector />
                </div>
            </div>
        </>
    );
}
