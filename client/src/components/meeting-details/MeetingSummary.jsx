import React, { useState } from "react";

const MeetingSummary = ({ meeting }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!meeting) return null;

  const summary = meeting.summary || meeting.structuredMoM || null;

  if (!summary) {
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          AI Summary
        </h2>
        <div className="text-gray-500 text-sm py-8 text-center bg-gray-50 rounded-lg">
          <p>No summary available yet.</p>
          <p className="text-xs mt-1">
            Generate a summary to view AI insights.
          </p>
        </div>
      </div>
    );
  }

  const renderStructuredSummary = (structured) => {
    if (!structured) return null;

    return (
      <div className="space-y-4">
        {structured.summary && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Overview</h3>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {structured.summary}
            </p>
          </div>
        )}

        {structured.agenda && structured.agenda.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Agenda</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {structured.agenda.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {structured.key_discussions &&
          structured.key_discussions.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Key Discussion Points
              </h3>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {structured.key_discussions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

        {structured.decisions && structured.decisions.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Major Outcomes</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {structured.decisions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {structured.action_items && structured.action_items.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Action Items</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {structured.action_items.map((item, index) => (
                <li key={index}>
                  {typeof item === "string"
                    ? item
                    : `${item.task}${item.owner ? ` - ${item.owner}` : ""}${item.due_date ? ` (Due: ${item.due_date})` : ""}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {structured.attendees && structured.attendees.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Attendees</h3>
            <p className="text-gray-700 text-sm">
              {structured.attendees.join(", ")}
            </p>
          </div>
        )}

        {structured.notes && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {structured.notes}
            </p>
          </div>
        )}
      </div>
    );
  };

  const summaryText = typeof summary === "string" ? summary : null;
  const shouldShowExpandButton = summaryText && summaryText.length > 500;

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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        AI Summary
      </h2>

      <div className="text-gray-700 text-sm">
        {typeof summary === "object" ? (
          renderStructuredSummary(summary)
        ) : (
          <div className="whitespace-pre-wrap">
            {shouldShowExpandButton && !isExpanded ? (
              <>
                {summaryText.substring(0, 500)}...
                <button
                  onClick={() => setIsExpanded(true)}
                  className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more
                </button>
              </>
            ) : (
              <>
                {summaryText}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingSummary;
