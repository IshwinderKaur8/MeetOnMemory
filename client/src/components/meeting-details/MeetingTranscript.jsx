import React, { useState } from "react";

const MeetingTranscript = ({ meeting }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!meeting) return null;

  const transcript = meeting.transcript || "";

  if (!transcript) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          Full Transcript
        </h2>
        <div className="text-gray-500 text-sm py-8 text-center bg-gray-50 rounded-lg">
          <p>No transcript available.</p>
          <p className="text-xs mt-1">Upload audio to generate a transcript.</p>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      alert("Transcript copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shouldShowExpandButton = transcript.length > 1000;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          Full Transcript
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
        <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
          {shouldShowExpandButton && !isExpanded ? (
            <>
              {transcript.substring(0, 1000)}...
              <button
                onClick={() => setIsExpanded(true)}
                className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Read more
              </button>
            </>
          ) : (
            <>
              {transcript}
              {shouldShowExpandButton && isExpanded && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Show less
                </button>
              )}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default MeetingTranscript;
