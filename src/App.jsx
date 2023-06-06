import { useEffect, useState } from "react"
import { quizQuestions } from "./assets/QuizQuestions"
import Quiz from "./components/Quiz"
import QuizCollection from "./components/QuizCollection"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

function App() {
  const questions = quizQuestions
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [lastAttempts, setLastAttempts] = useState(
    localStorage.getItem("last_attempts")
      ? JSON.parse(localStorage.getItem("last_attempts"))
      : []
  )
  const [attemptsShown, setAttemptsShown] = useState(false)
  const [oneAttemptshown, setOneAttemptShown] = useState(false)
  const [viewedQuestion, setViewedQuestion] = useState(null)
  const questionObject = questions.filter((question, index) => {
    if (index === currentQuestion) {
      return question
    }
  })

  const submitAnswer = (choosenAnswer) => {
    if (choosenAnswer[0] == questionObject[0].answer) {
      setScore(score + 1)
      const userInputs = {
        question: questionObject[0].question,
        trueAnswer: questionObject[0].options[questionObject[0].answer],
        userAnswer: questionObject[0].options[choosenAnswer],
        correct: true,
      }
      setUserAnswers((userAnswersU) => {
        return userAnswersU.concat(userInputs)
      })
    } else {
      const userInputs = {
        question: questionObject[0].question,
        trueAnswer: questionObject[0].options[questionObject[0].answer],
        userAnswer: questionObject[0].options[choosenAnswer],
        correct: false,
      }
      setUserAnswers((userAnswersU) => {
        return userAnswersU.concat(userInputs)
      })
    }
    console.log(userAnswers.length)
    if (userAnswers.length == 9) {
      localStorage.setItem(
        "last_attempts",
        JSON.stringify([...lastAttempts, userAnswers])
      )
      setLastAttempts((lastAttempts) => {
        return [...lastAttempts, userAnswers]
      })
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(() => {
        return currentQuestion + 1
      })
    }
  }

  return (
    <>
      <ToastContainer />

      {!attemptsShown && (
        <div className=" w-[700px] relative  min-h-[300px] bg-[#ccc] bg-opacity-10 rounded-md p-4  backdrop-blur-sm my-[40px] ">
          <h1>React quiz app </h1>
          <span
            className=" absolute bg-purple-600 backdrop-blur-sm bg-opacity-90 p-3 rounded-md -top-3 right-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-purple-800 hover:translate-x-1 "
            onClick={() => {
              setAttemptsShown(true)
            }}
          >
            View Last attempts
            {lastAttempts.length > 0 && (
              <span className=" absolute -top-2 bg-amber-900 w-[20px]  aspect-square grid place-items-center right-3 animate-bounce  text-xs rounded-full ">
                {lastAttempts.length}
              </span>
            )}
          </span>
          <hr className=" w-1/2 mt-4 " />
          {/* the parent container for the questions */}
          {userAnswers.length == 10 ? (
            <div className=" flex flex-col gap-2">
              <p className="text-[18px] my-4">
                Your score is:{" "}
                <span className="ml-4 font-bold">
                  {score}/{questions.length}
                </span>{" "}
              </p>
              <button
                className="w-fit self-end mt-2 "
                onClick={() => {
                  setCurrentQuestion(0)
                  setScore(0)
                  setUserAnswers([])
                }}
              >
                Restart quiz
              </button>
              <div className=" grid grid-cols-2 gap-3">
                {userAnswers.map((answer, index) => {
                  return (
                    <QuizCollection
                      key={index}
                      question={answer.question}
                      trueAnswer={answer.trueAnswer}
                      userAnswer={answer.userAnswer}
                      correct={answer.correct}
                    />
                  )
                })}
              </div>
            </div>
          ) : (
            <div className=" mt-2">
              {/* the heading for the questions section */}
              <div className=" flex  justify-between items-center">
                <small>Attempt all questions </small>{" "}
                <div className=" bg-white bg-opacity-10  w-fit p-2 rounded-lg tracking-[2px]   ">
                  {/* this shows the question that you are on and the total number of
              questions */}
                  <span className=" text-cyan-400  font-semibold ">
                    {currentQuestion + 1}
                  </span>
                  /10
                </div>
              </div>
              {/* end for  the heading for the questions section */}

              {/* the start form the question section */}
              <div className="w-full">
                <Quiz
                  {...questionObject[0]}
                  submitAnswer={submitAnswer}
                  questions={questions}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {attemptsShown && (
        <div className="w-[700px] relative  min-h-[300px] bg-[#ccc] bg-opacity-10 rounded-md p-4  backdrop-blur-sm my-[40px]  ">
          <span
            className=" absolute bg-purple-600 backdrop-blur-sm bg-opacity-90 p-3 rounded-md -top-6 left-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-purple-800 hover:-translate-x-1 "
            onClick={() => {
              oneAttemptshown && setOneAttemptShown(false)
              !oneAttemptshown && setAttemptsShown(false)
            }}
          >
            Back to {!oneAttemptshown ? "quiz" : "Attempts"}
          </span>
          <h1 className="text-white text-2xl mt-4 ">Your last quiz attempts</h1>
          <hr className="mt-2 border-slate-600 opacity-70 " />
          {!oneAttemptshown && (
            <div className="w-full flex flex-col items-center justify-center p-4 gap-2 ">
              {lastAttempts.map((attempt, index) => {
                return (
                  <div
                    className="bg-blue-300 w-[80%] p-4 rounded-md bg-opacity-20 flex items-center justify-between transition-all duration-300 cursor-pointer hover:bg-opacity-25 hover:translate-y-1 hover:rounded-xl"
                    key={index}
                    onClick={() => {
                      setOneAttemptShown(true)
                      setViewedQuestion(() => {
                        return index
                      })
                    }}
                  >
                    <p>Attempt number {index + 1}</p>{" "}
                    <span>
                      {
                        attempt.filter((correctAnswerIn) => {
                          return correctAnswerIn.correct == true
                        }).length
                      }
                      /10
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {oneAttemptshown && (
            <div className=" grid grid-cols-2 gap-3">
              {lastAttempts[viewedQuestion].map((answer, index) => {
                return (
                  <QuizCollection
                    key={index}
                    question={answer.question}
                    trueAnswer={answer.trueAnswer}
                    userAnswer={answer.userAnswer}
                    correct={answer.correct}
                  />
                )
              })}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default App
