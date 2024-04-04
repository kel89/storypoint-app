import React from "react";
import UserList from "./UserList";
import PointSelector from "./PointSelector";

export default function VotingView({ users, points, sid, setShowPoints }) {
    return (
        <>
            <div>
                <div>
                    <UserList
                        users={users}
                        points={points}
                        showPoints={false}
                    />
                </div>
                <div>
                    <PointSelector />
                </div>
            </div>
        </>
    );
}
