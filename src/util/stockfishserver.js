let stockfish = new Worker('/stockfish.js')

// Initialize Stockfish
stockfish.postMessage('uci');
stockfish.postMessage('isready');

// This event listener listens to messages from the main thread
onmessage = function(e) {
    const { action, fen, movetime } = e.data;

    if (action === 'setPosition') {
        // Set the position with FEN
        stockfish.postMessage(`position fen ${fen}`);
    }

    if (action === 'getBestMove') {
        // Ask Stockfish to find the best move
        stockfish.postMessage(`go movetime ${movetime}`);
    }

    // Listen for Stockfish's best move
    stockfish.onmessage = function(message) {
        if (message.type === 'bestmove') {
            postMessage({ type: 'bestmove', move: message.bestmove });
        }
    };
};
