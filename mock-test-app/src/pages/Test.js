import { useState } from "react";
import Timer from "../components/Timer";

const Test = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: "What is 2+2?", options: ["3", "4", "5"], answer: "4" },
  ]);

  return (
    <div className="p-5">
      <Timer minutes={10} onTimeUp={() => alert("Time is up!")} />
      {questions.map((q) => (
        <div key={q.id} className="my-4">
          <p>{q.question}</p>
          {q.options.map((opt) => (
            <button key={opt} className="block bg-gray-200 px-4 py-2 my-1 rounded">
              {opt}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Test;
