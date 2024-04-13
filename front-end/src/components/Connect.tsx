import React, { useState, FormEvent } from "react";
import { socket } from "../socket";
import { Role } from "../types/Role";

export default function Connect({ username, setUsername, role, setRole }) {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(username);
        console.log(role);
        if (username.trim() === "" || role === "") {
            alert("Please enter a username and select a role");
            return;
        }
        return;
        console.log("About to connect");
        socket.connect();
        socket.emit("username", {
            username: username,
            role: role,
        });
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
                        <h2 className="text-2xl">Select your Role</h2>
                        <div className="flex flex-col items-start mb-4">
                            {Object.values(Role).map((roleValue) => (
                                <label
                                    key={roleValue}
                                    className="inline-flex items-center mt-3"
                                >
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-blue-600"
                                        checked={role === roleValue}
                                        onChange={() => setRole(roleValue)}
                                    />
                                    <span className="ml-2 text-gray-700">
                                        {roleValue}
                                    </span>
                                </label>
                            ))}
                        </div>

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
