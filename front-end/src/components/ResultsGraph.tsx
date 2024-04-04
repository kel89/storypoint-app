import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { User } from "../types/User";

type ResultsGraphProps = {
    users: User[];
};

export default function ResultsGraph({ users }: ResultsGraphProps) {
    const colorClasses = {
        1: "#48BB78",
        2: "#48BB78",
        3: "#ECC94B",
        5: "#ECC94B",
        8: "#ED8936",
        13: "#E53E3E",
        21: "#E53E3E",
    };

    const pointsCount = users.reduce((acc, user) => {
        if (user.points === 0) return acc;
        acc[user.points] = (acc[user.points] || 0) + 1;
        return acc;
    }, {});

    const data = Object.keys(pointsCount).map((points, index) => ({
        name: points,
        value: pointsCount[points],
        fill: colorClasses[points],
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie
                    dataKey="value"
                    data={data}
                    labelLine={false}
                    label={({ name, percent }) =>
                        `${name} points: ${(percent * 100).toFixed(0)}%`
                    }
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>
                {/* <Tooltip /> */}
            </PieChart>
        </ResponsiveContainer>
    );
}
