"use client"

import { useEffect, useState } from "react";

export default function QA({ questions }) {
    const [questNo, setQuestNo] = useState(0)
    const [showExplanation, setShowExplanation] = useState({});
    const [showReport, setShowReport] = useState(false)
    const [reportModal, setReportModal] = useState(false)
    const question = questions[questNo]



    const toggleExplanation = (questionId) => {
        setShowExplanation((prev) => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
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
            <div className="relative w-full">

                <div id={question.id} key={question.id} className="w-full lg:p-8 px-4 py-8 flex flex-col gap-4 bg-white items-start border-b-2">
                    <div className="flex flex-col items-start gap-4 w-full">
                        <div className="w-full flex justify-between">
                            <span className={`text-sm px-4 py-2 inline-flex rounded-full bg-${(question.difficulty.toLowerCase() == "easy") ? "green" : (question.difficulty.toLowerCase() == "medium") ? "yellow" : "red"}-100 `} >{question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}</span>
                            <span>{question.id}/{questions.length}</span>
                        </div>
                        <h2 className="text-lg">{question.question}</h2>
                    </div>



                    <div className="flex gap-2 items-center justify-between w-full">
                        <div>
                            <button onClick={() => toggleExplanation(question.id)} className="bg-green-50 p-2 text-green-800 focus:ring-1 focus:ring-green-500 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex gap-2 items-center">

                            <button onClick={() => toggleReport(question.id)} className="bg-green-50 p-2 text-green-800 focus:ring-1 focus:ring-green-500 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-diamond" viewBox="0 0 16 16">
                                    <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                </svg>
                            </button>


                        </div>

                    </div>
                    {showExplanation[question.id] && <div className="rounded-md bg-green-50 p-4 w-full"><div><h3 className="font-semibold text-green-500">Explanation: </h3> <p className="mt-2">{question.explanation}</p> </div></div>}
                    {showReport[question.id] &&
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

                        </div>}

                    <div className="flex w-full justify-between mt-8">
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

                </div>



            </div>
        </>
    )
}