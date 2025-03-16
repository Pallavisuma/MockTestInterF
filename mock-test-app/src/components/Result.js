import { useLocation } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const { submittedAnswers } = location.state || {}; // Get submitted answers passed from the MockTest component

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Test Results</h1>

        {/* Submitted Answers */}
        <div className="space-y-4">
          {submittedAnswers &&
            Object.keys(submittedAnswers).map((questionIndex) => (
              <div key={questionIndex} className="mb-4">
                <p className="text-lg font-semibold">Question {parseInt(questionIndex) + 1}:</p>
                <p className="text-gray-800 text-lg">{submittedAnswers[questionIndex]}</p>
              </div>
            ))}
        </div>

        {/* Go Back Button */}
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
