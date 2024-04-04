import React, { useState } from "react";
import { socket } from "../socket";

export default function PointSelector() {
    const POINT_OPTIONS = [1, 2, 3, 5, 8, 13, 21];
    const [selectedPoint, setSelectedPoint] = useState<number>();

    const handlePointSelect = (point: number) => {
        setSelectedPoint(point);
        socket.emit("point", point);
    };

    const colorClasses = {
        1: "bg-green-500 hover:bg-green-700",
        2: "bg-green-500 hover:bg-green-700",
        3: "bg-yellow-500 hover:bg-yellow-700",
        5: "bg-yellow-500 hover:bg-yellow-700",
        8: "bg-orange-500 hover:bg-orange-700",
        13: "bg-red-500 hover:bg-red-700",
        21: "bg-red-500 hover:bg-red-700",
    };

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {POINT_OPTIONS.map((point) => (
                <button
                    key={point}
                    onClick={() => handlePointSelect(point)}
                    className={`w-full h-32 text-white rounded flex items-center justify-center text-2xl 
                                ${colorClasses[point]} transition-colors
                                ${
                                    point === selectedPoint
                                        ? "ring-4 ring-blue-500"
                                        : ""
                                }`}
                >
                    {point}
                </button>
            ))}
        </div>
    );
}
