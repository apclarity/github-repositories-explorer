import React, { useState } from "react";
import { UserAccordionProps } from "../../types";
import Loader from "../atoms/Loader";

const UserAccordion: React.FC<UserAccordionProps> = ({ users, selectedUser, repos, reposLoading, onSelect }) => {
    const [openUser, setOpenUser] = useState<string>('');

    const toogleAccordion = (username: string) => {
        if(openUser === username) {
            setOpenUser('')
        } else {
            setOpenUser(username)
            onSelect(username)
        }
    }

    return (
        <div className="space-y-3 justify-items-center">
            {users.map((user) => {
                const isOpen = openUser === user.login && selectedUser === user.login

                return (
                <div
                key={user.id}
                className="w-full border rounded shadow-sm transition-all duration-300 ease-in-out"
                >
                    <button
                    className="w-full flex justify-between items-center text-left p-3 bg-gray-100 hover:bg-gray-200 font-semibold"
                    onClick={() => toogleAccordion(user.login)}
                    >
                        <span>{user.login}</span>
                        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
                    </button>
                    {isOpen && (
                    <div className="p-3 space-y-2 w-full">
                        {reposLoading[user.login] ? (
                        <Loader />
                        ) : repos.length === 0 ? (
                        <p className="text-gray-500">No repositories found</p>
                        ) : (
                        repos.map((repo) => (
                            <div key={repo.id} className="border p-2 rounded">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium">{repo.name}</h3>
                                    <span className="font-medium">{repo.stargazers_count}⭐</span>
                                </div>
                                <p className="text-sm text-gray-600">{repo.description || 'No description'}</p>
                            </div>
                        ))
                        )}
                    </div>
                    )}
                </div>
            )})}
        </div>
    )
}

export default UserAccordion