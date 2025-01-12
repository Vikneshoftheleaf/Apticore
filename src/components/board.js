"use client";
import React, { useState, useEffect } from "react";  // Import React and hooks for state and effect management
import { Chessboard } from "react-chessboard";       // Import the Chessboard component for displaying the board
import { Chess } from "chess.js";                    // Import Chess logic from chess.js to handle moves and rule
const Board = ({ user }) => {
    // Initialize game state with a new Chess instance from chess.js
    const [game, setGame] = useState(new Chess());
    // Initialize state for the Stockfish Web Worker instance
    const [stockfish, setStockfish] = useState(null);
    // Initialize state for storing Stockfish's suggested best move
    const [bestMove, setBestMove] = useState("");
    const [bestUseMove, setBestuserMove] = useState("")
    const [msg, setmsg] = useState("");
    // useEffect to set up Stockfish as a Web Worker when the component first loads (mounts)

    useEffect(() => {
        const gameCopy = new Chess(game.fen());
        if (user[0].toLowerCase() != 'w') {
            console.log("opponent is white")
            if (stockfish != null) {
                stockfish.postMessage(`position fen ${gameCopy.fen()}`); // Send the board position in FEN format
                stockfish.postMessage("go depth 15"); // Instruct Stockfish to analyze the position up to a depth of 15 moves
            }
            else {
                console.log("stockfish not mounted")
            }
        }
    }, [stockfish])
    useEffect(() => {
        // Create a new Web Worker for Stockfish from the JavaScript file we downloaded
        const stockfishWorker = new Worker("/stockfish.js");
        setStockfish(stockfishWorker); // Save this worker instance in state for access elsewhere in the component
        // Listen for messages sent back from Stockfish
        stockfishWorker.onmessage = (event) => {
            const message = event.data; // Capture the message data from Stockfish
            // Check if Stockfish has sent a "bestmove" response
            if (message.startsWith("bestmove")) {
                const move = message.split(" ")[1]; // Extract the best move from the message
                if (game.turn() === user[0].toLowerCase()) {
                    setBestuserMove(move)
                }
                else {
                    setBestMove(move); // Save the best move in state to display on the screen
                }
            }
        };
        // Clean up the worker when the component is removed from the screen (unmounted)
        return () => {
            stockfishWorker.terminate(); // Terminates the worker to free up resources
        };
    }, []); // Empty dependency array means this runs only once when the component mounts
    useEffect(() => {
        if (bestMove) {
            const gameCopy = new Chess(game.fen());
            try {
                // Attempt to make the move on the game copy
                const move = gameCopy.move({
                    from: bestMove.slice(0, 2), // Source square
                    to: bestMove.slice(2, 4),  // Target square
                    promotion: "q",           // Promote to Queen if needed
                })

                stockfish.postMessage(`position fen ${game.fen()}`); // Send the board position in FEN format
                stockfish.postMessage("go depth 15"); // Instruct Stockfish to analyze the position up to a depth of 15 moves




                if (move) {
                    setGame(gameCopy); // Update the game state with the new position
                    if (gameCopy.isCheck()) {
                        setmsg("Check!")
                    }
                    else {
                        setmsg('')
                    }
                    if (gameCopy.isCheckmate()) {
                        (game.turn() == 'w') ? setmsg("White win by Check Mate!") : setmsg("Black win by Check Mate!")

                    }
                    if (gameCopy.isDraw()) {
                        setmsg("Draw!")
                    }
                    if (gameCopy.isStalemate()) {
                        setmsg("Stale Mate!")
                    }
                }
            } catch (error) {
                console.error("Error applying AI move:", error.message);
            }
        }
    }, [bestMove]);
    // onDrop function is triggered when a piece is moved on the Chessboard
    const onDrop = (sourceSquare, targetSquare) => {
        // Create a copy of the current game state using FEN (Forsyth-Edwards Notation)
        const gameCopy = new Chess(game.fen());
        try {
            // Attempt to make the move on the game copy
            const move = gameCopy.move({
                from: sourceSquare,   // Source square of the piece being moved
                to: targetSquare,     // Target square of the move
                promotion: "q",       // Always promote to a queen for simplicity
            });
            // If the move is invalid, return false to prevent it from being applied
            if (move === null) {
                return false; // Invalid move, ignore it
            }
            if (gameCopy.isCheck()) {
                setmsg("Check!")
            }
            else {
                setmsg('')
            }
            if (gameCopy.isCheckmate()) {
                (game.turn() == 'w') ? setmsg("White win by Check Mate!") : setmsg("Black win by Check Mate!")
            }
            if (gameCopy.isDraw()) {
                setmsg("Draw!")
            }
            if (gameCopy.isStalemate()) {
                setmsg("Stale Mate!")
            }


            // If the move is valid, update the main game state with the new position
            setGame(gameCopy);

            // Send the new position to Stockfish for analysis
            if (stockfish) {
                stockfish.postMessage(`position fen ${gameCopy.fen()}`); // Send the board position in FEN format
                stockfish.postMessage("go depth 15"); // Instruct Stockfish to analyze the position up to a depth of 15 moves
            }
            return true; // Move was valid and applied, so return true
        } catch (error) {
            console.error(error.message); // Log any errors
            return false; // Return false to ignore the move if there was an error
        }
    };
    // Render the component
    return (
        <div className="h-full w-full flex justify-center items-center flex-col gap-2">

            <div className="w-[400px] aspect-square">
                <Chessboard
                    boardOrientation={user}
                    position={game.fen()}         // Set the board position based on the current game state
                    onPieceDrop={onDrop}          // Attach the onDrop function to handle piece moves

                />
            </div>
            <h4 className="text-xl font-semibold text-center ">{msg}</h4>

        </div>
    );
};

export default Board; // Export the App component for use in other parts of the application