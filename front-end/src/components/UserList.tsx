import { User } from "../types/User";
import { Role } from "../types/Role";
import useEmojiExplosion from "../hooks/EmojiExpolsion/useEmojiExplosion";
import { createFloatingEmojis } from "../helpers/emojiAnimation";
import { rainDollarEmojis } from "../helpers/rainDollars";
import { expandCenterEmoji } from "../helpers/expandCenterEmoji";
import { playHurryUp } from "../helpers/playHurryUp";
import ReactionList from "./ReactionMenu";
type UserListProps = {
    users: User[];
    showPoints: boolean;
    roleFilter: Role[];
};
export default function UserList({
    users,
    showPoints,
    roleFilter,
}: UserListProps) {
    const isWaitingForUser = (user: User) => {
        return !showPoints && !user.voted;
    };

    const getRoleText = (role: Role) => {
        const prettyRole = role
            .split("_")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");

        let colorClass = "";
        switch (role) {
            case Role.FrontEnd:
                colorClass = "text-violet-500";
                break;
            case Role.BackEnd:
                colorClass = "text-emerald-500";
                break;
            case Role.QA:
                colorClass = "text-blue-500";
                break;
            case Role.DevOps:
                colorClass = "text-yellow-500";
                break;
            default:
                colorClass = "text-gray-500";
        }

        return <span className={`${colorClass} text-xs`}>({prettyRole})</span>;
    };

    return (
        <div className="p-4 bg-white rounded-lg border shadow-md">
            <h1 className="text-2xl font-bold mb-4">Seals</h1>
            <ReactionList />
            {/* <button onClick={useExplode}>Explode</button>
            <button onClick={() => rainDollarEmojis("💵", 3000, 100)}>
                Make it Rain
            </button>
            <button onClick={() => expandCenterEmoji("🤯", 3000)}>Wow</button>
            <br />
            <button onClick={() => playHurryUp()}>Waiting</button> */}
            {users
                .filter((user) => user.role !== Role.Presenter)
                .filter((user) => {
                    if (roleFilter && roleFilter.length === 0) {
                        return true;
                    }
                    return roleFilter.includes(user.role);
                })
                .map((user) => {
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
                                &nbsp;
                                {getRoleText(user.role)}
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
