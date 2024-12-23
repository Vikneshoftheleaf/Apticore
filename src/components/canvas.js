"use client"
import { useState, useEffect } from "react"

export default function Canvas({ questions }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showExplanation, setShowExplanation] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentQuestions, setCurrentQuestions] = useState([]);
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {currentQuestions.map((question) => (
                <div key={question.id} className="lg:p-8 p-4 flex flex-col gap-4 bg-white items-start border-b-2">
                    <h2 className="text-lg">{question.id}. {question.question}</h2>
                    <div>
                        {question.options.map((option, index) => (
                            <div key={index} className="flex gap-2 items-center text-medium">
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    id={`option-${question.id}-${index}`}
                                    onClick={() => handleAnswerClick(question.id, option, question.correctAnswer)}
                                />
                                <label htmlFor={`option-${question.id}-${index}`}>{option}</label>
                            </div>
                        ))}
                    </div>
                    {selectedAnswers[question.id] && (
                        <p className="text-base mb-2" style={{ color: selectedAnswers[question.id] === 'Correct!' ? 'green' : 'red' }}>
                            {(selectedAnswers[question.id] === 'Correct!')
                                ? <div className="flex gap-2 items-center text-green-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg> Correct!</div>
                                : <div className="flex gap-2 items-center text-red-500 "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                </svg> Wrong!</div>
                            }
                        </p>
                    )}
                    <button onClick={() => toggleExplanation(question.id)} className="bg-green-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                        </svg>
                    </button>
                    {showExplanation[question.id] && <div className="rounded-md bg-green-50 p-4 w-full"><p ><span className="font-semibold text-green-500">Correct Answer: </span>{question.correctAnswer}</p><br /><p><span className="font-semibold text-green-500">Explanation: </span> <br /> {question.explanation}</p></div>}
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