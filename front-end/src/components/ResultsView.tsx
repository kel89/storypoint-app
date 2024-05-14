import UserList from "./UserList";
import { User } from "../types/User";
import { socket } from "../socket";
import ResultsGraph from "./ResultsGraph";
import ReactionList from "./ReactionMenu";

type ResultsViewProps = {
    users: User[];
};

export default function ResultsView({ users }: ResultsViewProps) {
    const clearPoints = () => {
        console.log("Clearing points");
        socket.emit("clearPoints");
    };

    const hidePoints = () => {
        socket.emit("hidePoints");
    };

    return (
        <>
            {/* <div className="flex justify-between"> */}
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/3 p-4 flex flex-col items-center">
                    <div className="w-full mb-4">
                        <UserList
                            users={users}
                            showPoints={true}
                            roleFilter={[]}
                        />
                    </div>
                    <div className="mb-3">
                        <ReactionList />
                    </div>
                    <div className="w-full flex gap-2">
                        <button
                            onClick={clearPoints}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors w-full"
                        >
                            Clear Votes
                        </button>
                        <button
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors w-full"
                            onClick={hidePoints}
                        >
                            Hide Votes
                        </button>
                    </div>
                </div>
                <div className="w-full sm:w-2/3 min-h-[250px] p-4">
                    <ResultsGraph users={users} />
                </div>
            </div>
        </>
    );
}
