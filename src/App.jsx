import { useEffect, useState } from "react"
import { quizQuestions } from "./assets/QuizQuestions"
import Quiz from "./components/Quiz"
import QuizCollection from "./components/QuizCollection"

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
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(() => {
        return currentQuestion + 1
      })
    }
  }

  return (
    <>
      <div className=" w-[700px] relative  min-h-[300px] bg-[#ccc] bg-opacity-10 rounded-md p-4  backdrop-blur-sm my-[40px] ">
        <h1>React quiz app </h1>
        <span className=" absolute bg-purple-600 backdrop-blur-sm bg-opacity-90 p-3 rounded-md -top-3 right-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-purple-800 hover:translate-x-1 ">
          View Last attempts
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
    </>
  )
}

export default App
