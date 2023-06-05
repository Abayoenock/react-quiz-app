import React from "react"

function QuizCollection({ question, correct, trueAnswer, userAnswer }) {
  return (
    <div className=" flex flex-col   w-full  gap-3 mt-3 bg-red-300 p-4 bg-opacity-30 rounded-md ">
      <h1 className={`text-[18px] font-bold      `}>Qsn: {question}</h1>
      <div className="w-full flex justify-between items-center ">
        <div className=" text-[14px] ">
          <p>
            your answer: <q>{userAnswer}</q>
          </p>
          {correct == true ? (
            "Your answer is correct"
          ) : (
            <p className="text-green-600 font-bold">
              True answer : {trueAnswer}
            </p>
          )}
        </div>
        {correct == true ? (
          <b className="text-[50px]   ">😊</b>
        ) : (
          <b className="text-[50px]   ">😥 </b>
        )}
      </div>
    </div>
  )
}

export default QuizCollection
