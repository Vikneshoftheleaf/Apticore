"use client"

import { useEffect, useState } from "react";

export default function MemoryTrainingComponent({ questions }) {
    const [questNo, setQuestNo] = useState(0)

    const question = questions[questNo]
    const [textInput, settextInput] = useState(false);
    const [showReport, setShowReport] = useState(false)
    const [reportModal, setReportModal] = useState(false)
    const wordsToMemorize = question.words
    const [showWords, setShowWords] = useState(false); // To show words or not
    const [timer, setTimer] = useState(30); // Timer countdown
    const [isTimerActive, setIsTimerActive] = useState(false); // To track if timer is active
    const [userInput, setUserInput] = useState(""); // User's input
    const [submitted, setSubmitted] = useState(false); // If user submitted the answers
    const [correctCount, setCorrectCount] = useState(0); // Count of correct words

    const startGame = () => {
        setShowWords(true);
        setIsTimerActive(true);
    };

    // Handle timer countdown
    useEffect(() => {
        if (isTimerActive && timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(intervalId); // Cleanup interval on component unmount
        } else if (timer === 0) {
            // When time is up, stop the timer and hide the words
            setShowWords(false);
            setIsTimerActive(false);
        }
    }, [isTimerActive, timer]);

    // Handle text input change
    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    // Check how many words are correct on submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const inputWords = userInput.split(/\s+/); // Split input by spaces
        const correctWords = inputWords.filter((word) =>
            wordsToMemorize.includes(word.toLowerCase())
        );
        setCorrectCount(correctWords.length);
        setSubmitted(true);
    };



    const toggleReport = (questionId) => {
        setShowReport((prev) => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };



    function handleReport(e) {
        e.preventDefault()
        setReportModal(true)
        setTimeout(() => {
            setReportModal(false)
        }, 5000);

    }
    return (
        <>
            <div className="relative ">

                <div id={question.id} key={question.id} className="lg:p-8 px-4 py-8 flex flex-col gap-4 bg-white items-center border-b-2">


                    {!submitted ? (
                        <>
                            <h1 className="text-xl font-semibold">Memorize the Words</h1>
                            {!showWords && !isTimerActive && timer != 0 && (
                                <div className="flex gap-4 flex-col items-center">
                                    <div className="flex gap-2 items-center ">
                                        <span className={`text-sm px-4 py-2 inline-flex rounded-full bg-${(question.difficulty.toLowerCase() == "easy") ? "green" : (question.difficulty.toLowerCase() == "medium") ? "yellow" : "red"}-100 `} >{question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}</span>
                                        <h2 className="text-sm">{question.words.length} Words</h2>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <button className="flex gap-2  items-center px-4 py-2 bg-green-500 text-white rounded-md" onClick={startGame}>
                                            <span>Start</span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                                                </svg>
                                            </span>
                                        </button>
                                        <span>30 Sec</span>
                                    </div>


                                </div>
                            )}

                            {showWords && (
                                <div className="flex flex-col gap-6">

                                    <ul className="flex flex-wrap gap-2">
                                        {wordsToMemorize.map((word, index) => (
                                            <li className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full" key={index}>{word}</li>
                                        ))}
                                    </ul>



                                    <div className="flex flex-col gap-2 w-full">

                                        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                            <div class="bg-blue-600 h-2.5 rounded-full transition-all ease-in-out" style={{ width: `${(timer / 30) * 100}%` }}></div>
                                        </div>

                                        <h3>Time remaining: {timer}s</h3>
                                    </div>
                                </div>
                            )}

                            {!showWords && timer === 0 && (
                                <div className="flex gap-2 flex-col">
                                    <h2 className="text-lg font-semibold">Time's up!</h2>
                                    <h3>Enter the words you remember:</h3>

                                    <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
                                        <textarea className="rounded-md resize-none" name="" id="" cols="30" rows="5" type="text"
                                            value={userInput}
                                            onChange={handleInputChange}
                                            placeholder="word1 word2 word3"></textarea>
                                        <button type="submit" className="flex gap-1 items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md">
                                            <span>Submit</span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                                                </svg>
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-lg font-semibold">Results</h2>
                            <p>You remembered {correctCount} out of {wordsToMemorize.length} words correctly!</p>
                            <button className="flex justify-center items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-md" onClick={() => { setSubmitted(false); setShowWords(false); setTimer(30) }}>
                                <span>Try again</span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    )}

                    {
                        !(isTimerActive) && timer !=0 &&
                        <div className="flex w-full justify-between">
                            <button onClick={() => { (questNo != 0) && setQuestNo(questNo - 1) }} className={`flex gap-2 items-center px-4 py-2 bg-${(questNo == 0 ? "gray-200" : "green-500")} text-${(questNo == 0 ? "gray-800" : "white")} rounded-md`}>

                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                    </svg>
                                </span>
                                <span>
                                    Previous
                                </span>
                            </button>
                            <button onClick={() => { (questions.length != questNo + 1) && setQuestNo(questNo + 1) }} className={`flex gap-2 items-center px-4 py-2 bg-${(questions.length == questNo + 1 ? "gray-200" : "green-500")} text-${(questions.length == questNo + 1 ? "gray-800" : "white")} rounded-md`}>
                                <span>Next</span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                    </svg>
                                </span>
                            </button>
                        </div>

                    }


                    {/*showReport[question.id] &&
                        <div className="rounded-md bg-green-50 p-4 w-full">
                            <p >
                                <span className="font-semibold text-green-500">Report: </span>
                                {question.question}
                            </p>
                            <br />
                            {!(reportModal)
                                ? <form onSubmit={(e) => { handleReport(e) }} className="flex flex-col gap-2" >
                                    <input type="email" id="success" class="bg-green-50 border rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="your@gmail.com" required />
                                    <textarea required name="" id="" cols="30" rows="8" className="bg-green-50 border focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500 resize-none rounded-md" placeholder="Whats Wrong with this Question?"></textarea>
                                    <button type="submit" className="px-4 py-2 rounded-md bg-green-800 text-white">Send</button>

                                </form>
                                : <div className="h-full w-full flex flex-col gap-2 items-center justify-center rounded-md p-4">
                                    <span className="text-green-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                        </svg>
                                    </span>
                                    <p>Submitted!</p>
                                </div>
                            }

                        </div>*/}

                </div>



            </div>
        </>
    )
}