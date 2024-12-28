"use client"
import { useState, useEffect } from "react"

export default function Canvas({ topic, questions }) {
    const title = (topic != null) && topic.toString().replaceAll("-", " ")
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showExplanation, setShowExplanation] = useState({});
    const [showReport, setShowReport] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [selection, setselection] = useState("")
    const questionsPerPage = 10;


    // Pagination Logic
    useEffect(() => {
        const indexOfLastQuestion = currentPage * questionsPerPage;
        const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
        setCurrentQuestions(questions.slice(indexOfFirstQuestion, indexOfLastQuestion));
    }, [currentPage, questions]);


    const handleAnswerClick = (questionId, option, correctAnswer) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: option === correctAnswer ? 'Correct!' : 'Wrong!'
        }));
    };

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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function handleReport(e)
    {
        e.preventDefault()
    }

    return (
        <div>
            {
                (topic != null) &&
                <div className="px-4">
                    <div class="flex justify-between mb-1">
                        <span class="text-lg font-medium text-green-700 dark:text-white">{title[0].toUpperCase() + title.substring(1)}</span>
                        <span class="text-bases font-medium text-green-700 dark:text-white">45%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div class="bg-green-600 h-2.5 rounded-full w-[45%]"></div>
                    </div>

                </div>
            }



            {currentQuestions.map((question) => (
                <div id={question.id} key={question.id} className="lg:p-8 px-4 py-8 flex flex-col gap-4 bg-white items-start border-b-2">
                    <div className="flex flex-row gap-2 ">
                        <span className="mt-0.5">{question.id}.</span>
                        <h2 className="text-lg">{question.question}</h2>

                    </div>
                    <div>
                        {question.options.map((option, index) => (
                            <div key={index} className="flex gap-2 items-center text-lg">
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    id={`option-${question.id}-${index}`}
                                    onClick={() => {
                                        handleAnswerClick(question.id, option, question.correctAnswer)
                                        setselection(`option-${question.id}-${index}`)
                                    }}
                                />
                                <label htmlFor={`option-${question.id}-${index}`}>{option}</label>

                                {
                                    selection == `option-${question.id}-${index}` && selectedAnswers[question.id] && (
                                        <p className="text-base flex items-center" style={{ color: selectedAnswers[question.id] === 'Correct!' ? 'green' : 'red' }}>
                                            {(selectedAnswers[question.id] === 'Correct!')
                                                ? <div className="flex gap-2 items-center text-green-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                </svg></div>
                                                : <div className="flex gap-2 items-center text-red-500 "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                                </svg></div>
                                            }
                                        </p>
                                    )
                                }

                            </div>
                        ))}
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

                            <button className="bg-green-50 p-2 text-green-800 focus:ring-1 focus:ring-green-500 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                                </svg>
                            </button>

                        </div>

                    </div>
                    {showExplanation[question.id] && <div className="rounded-md bg-green-50 p-4 w-full"><p ><span className="font-semibold text-green-500">Correct Answer: </span>{question.correctAnswer}</p><br /><p><span className="font-semibold text-green-500">Explanation: </span> <br /> {question.explanation}</p></div>}
                    {showReport[question.id] && <div className="rounded-md bg-green-50 p-4 w-full">
                        <p >
                            <span className="font-semibold text-green-500">Report: </span>
                            {question.question}
                        </p>
                        <br />
                        <form onClick={(e)=>{handleReport(e)}} className="flex flex-col gap-2" >
                            <input  type="text" id="success" class="bg-green-50 border rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="your@gmail.com" required/>
                            <textarea  name="" id="" cols="30" rows="8" className="bg-green-50 border focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500 resize-none rounded-md" placeholder="Whats Wrong with this Question?"></textarea>
                            <button type="submit" className="px-4 py-2 rounded-md bg-green-800 text-white">Send</button>

                        </form>

                    </div>}


                </div>
            ))}

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {Array.from({ length: Math.ceil(questions.length / questionsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        style={{ margin: '5px', padding: '5px 10px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '5px' }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}