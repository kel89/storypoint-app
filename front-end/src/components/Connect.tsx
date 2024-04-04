import React, { useState, FormEvent } from "react";
import { socket } from "../socket";

export default function Connect({ username, setUsername }) {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // You can emit the username to the server here
        // socket.emit('username', username);
        // socket.emit("connect", username);
        console.log("About to connect");
        socket.connect();
        socket.emit("username", username);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-2">
                    Connect to Storypointer
                </h1>
                <h2 className="text-2xl mb-4">Enter your username</h2>
                <div>
                    <form
                        className="flex flex-col items-center"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Connect
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
