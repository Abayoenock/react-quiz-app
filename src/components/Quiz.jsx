import React from "react"
import { toast } from "react-toastify"
import { Slide, Zoom, Flip, Bounce } from "react-toastify"
function Quiz({ id, question, options, answer, submitAnswer, questions }) {
  return (
    <form
      action=""
      className=" flex flex-col w-full  transition-all duration-100 "
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const choosen = [...formData.values()]
        if (choosen.length == 0) {
          //alert("Please select a choice")
          // show an alert when the user has not selected an answer
          toast.warn("Please choose your answer", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
          })
          return
        }
        submitAnswer(choosen, id)
        e.currentTarget.reset()
      }}
    >
      <h1 className=" text-[25px] text-green-400 ">{question}</h1>

      {options.map((option, index) => {
        return (
          <div
            className=" flex flex-row-reverse justify-end  w-full  gap-3 mt-3"
            key={index}
          >
            <label htmlFor={option}>{option}</label>
            <input type="radio" name="answer" id={option} value={index} />
          </div>
        )
      })}

      <div className=" flex  justify-end  w-full  gap-3 mt-3">
        <button
          type="submit"
          className={questions.length != id ? " bg-slate-600" : "bg-green-600"}
        >
          {questions.length != id ? " Next Question" : "Submit Answers"}
        </button>
      </div>
    </form>
  )
}

export default Quiz
