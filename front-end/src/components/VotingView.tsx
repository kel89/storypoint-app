import { useState } from "react";
import UserList from "./UserList";
import PointSelector from "./PointSelector";
import { socket } from "../socket";
import { User } from "../types/User";
import RoleFilter from "./RoleFilter";

type VotingViewProps = {
    users: User[];
    presentationMode: boolean;
    setPresentationMode: (mode: boolean) => void;
};

export default function VotingView({
    users,
    presentationMode,
    setPresentationMode,
}: VotingViewProps) {
    const [roleFilter, setRoleFilter] = useState([]);

    const emitShowPoints = () => {
        console.log("Show Votes");
        socket.emit("showResults");
    };
    return (
        <>
            <div className="flex flex-col sm:flex-row">
                <div
                    className={`w-full ${
                        presentationMode ? "sm:w-full" : "sm:w-1/3"
                    } p-4 sm:p-8 flex flex-col items-center justify-center`}
                >
                    <div className="w-full max-w-2xl mb-4">
                        <UserList
                            users={users}
                            showPoints={false}
                            roleFilter={roleFilter}
                        />
                        <div className="mt-1">
                            <RoleFilter
                                roleFilter={roleFilter}
                                setRoleFilter={setRoleFilter}
                            />
                        </div>
                    </div>
                    <button
                        onClick={emitShowPoints}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Show Votes
                    </button>
                    <button
                        className="text-blue-500 hover:bg-blue-100 px-4 py-2 rounded transition-colors duration-200"
                        onClick={() => setPresentationMode(!presentationMode)}
                    >
                        {presentationMode
                            ? "Exit Presentation Mode"
                            : "Enter Presentation Mode"}
                    </button>
                </div>
                {
                    // If in presentation mode, don't show point selector
                    presentationMode ? null : (
                        <div className="w-full sm:w-2/3 p-4">
                            <PointSelector />
                        </div>
                    )
                }
            </div>
        </>
    );
}
