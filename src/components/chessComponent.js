"use client"

import { useState, useEffect, useMemo } from "react";
import { FaRegChessKing } from "react-icons/fa6";
import { BsDice4 } from "react-icons/bs";
import Board from "./board";


export default function ChessComponent() {
    const [userColor, setUserColor] = useState(null);


    const handleSelectColor = (color) => {
        setUserColor(color);
        
    };
    

    const handleRandomSelect = () => {
        const colors = ["white", "black"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        handleSelectColor(randomColor);
    };

    return (
        <div>
            {userColor == null ? (
                <div>
                    <h3>Select Your Chess Piece Color</h3>
                    <div className="flex gap-2 mt-4">
                        <button
                            className="border flex gap-2 items-center px-4 py-2 rounded-md bg-white text-black"
                            onClick={() => handleSelectColor("white")}
                        >
                            <span>
                                <FaRegChessKing color="black" />
                            </span>
                            White
                        </button>
                        <button
                            className="flex gap-2 items-center px-4 py-2 rounded-md bg-black text-white"
                            onClick={() => handleSelectColor("black")}
                        >
                            <span>
                                <FaRegChessKing color="white" />
                            </span>
                            Black
                        </button>
                        <button
                            className="flex gap-2 items-center px-4 py-2 rounded-md bg-green-500 text-white"
                            onClick={handleRandomSelect}
                        >
                            <span>
                                <BsDice4 />
                            </span>
                            Random
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <Board user={userColor}/>  
                </div>
            )}
        </div>
    );
}
