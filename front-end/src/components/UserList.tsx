import { User } from "../types/User";

type UserListProps = {
    users: User[];
    showPoints: boolean;
};
export default function UserList({ users, showPoints }: UserListProps) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Seals</h1>
            {users.map((user) => {
                return (
                    <div
                        key={user.sid}
                        className="flex justify-between items-center border-b border-gray-200 py-2"
                    >
                        <span className="text-lg">{user.username}</span>
                        <span className="text-sm text-gray-500">
                            {showPoints
                                ? user.points
                                : user.voted
                                ? "Voted"
                                : "Waiting"}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
