import { User } from "../types/User";

type UserListProps = {
    users: User[];
    showPoints: boolean;
};
export default function UserList({ users, showPoints }: UserListProps) {
    const isWaitingForUser = (user: User) => {
        return !showPoints && !user.voted;
    };

    return (
        <div className="p-4 bg-white rounded-lg border shadow-md">
            <h1 className="text-2xl font-bold mb-4">Seals</h1>
            {users.map((user) => {
                return (
                    <div
                        key={user.sid}
                        className="flex justify-between items-center border-b border-gray-200 py-2"
                    >
                        <span
                            className={`text-lg ${
                                isWaitingForUser(user) ? "text-red-500" : ""
                            }`}
                        >
                            {user.username}
                        </span>
                        <span className="text-sm text-gray-500">
                            {showPoints ? (
                                user.points
                            ) : user.voted ? (
                                <span>&#x2705;</span>
                            ) : (
                                <span>&#8987;</span>
                            )}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
