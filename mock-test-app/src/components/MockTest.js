import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MockTest() {
  const location = useLocation();
  const navigate = useNavigate();
  const { extractedText, timer } = location.state || {}; // Extracted text and timer value passed from FileUploader
  const [timeRemaining, setTimeRemaining] = useState(timer); // Remaining time
  const [isTimeUp, setIsTimeUp] = useState(false);
  
  // Initialize answers state to store user answers
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (timeRemaining > 0 && !isTimeUp) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            setIsTimeUp(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup the interval when the component is unmounted
    }
  }, [timeRemaining, isTimeUp]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    // Pass the answers to the result page
    navigate("/result", { state: { submittedAnswers: answers } });
  };

  // Split the questions based on numbers (before the first number followed by a period)
  const questions = extractedText
    ? extractedText.split(/\d+\./).filter(Boolean) // Split at each occurrence of a number (one or more digits) followed by a period
    : []; 

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Mock Test</h1>

        {/* Timer Section */}
        <div className="text-center mb-6">
          <p className="text-xl font-semibold">Time Remaining: {timeRemaining} seconds</p>
          {isTimeUp && <p className="text-red-600 mt-2 text-lg">Time's up! Please submit your test.</p>}
        </div>

        {/* Questions with Editable Text Areas */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg font-medium">{question}</p>
              <textarea
                value={answers[index] || ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full h-24 p-4 border rounded-md bg-gray-100 text-gray-800 text-lg mt-2"
                placeholder="Type your answer here..."
              />
            </div>
          ))}
        </div>

        {/* Submit Test Button */}
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
            onClick={handleSubmit}
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}
