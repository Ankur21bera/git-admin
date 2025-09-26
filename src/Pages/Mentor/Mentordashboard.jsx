import React, { useContext, useEffect } from "react";
import { MentorContext } from "../../Context/MentorContext";

const MentorDashboard = () => {
  const { enrollments, getEnrollments, approveEnrollment, approveCancel, mToken } =
    useContext(MentorContext);

  useEffect(() => {
    if (mToken) getEnrollments();
  }, [mToken]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "--";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Mentor Dashboard</h1>

      {enrollments.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No enrollments yet.</div>
      ) : (
        <div className="grid gap-4">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto shadow rounded-lg border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 text-left text-sm font-semibold">Student</th>
                  <th className="p-2 text-left text-sm font-semibold">Course</th>
                  <th className="p-2 text-left text-sm font-semibold">Date</th>
                  <th className="p-2 text-left text-sm font-semibold">Status</th>
                  <th className="p-2 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enroll) => (
                  <tr key={enroll._id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-2 font-medium text-gray-900">
                      {enroll.userId?.name}
                      <div className="text-xs text-gray-500">{enroll.userId?.email}</div>
                    </td>
                    <td className="p-2">
                      {enroll.courseId?.title}
                      <div className="text-xs text-gray-500">{enroll.courseId?.category}</div>
                    </td>
                    <td className="p-2">{formatDate(enroll.createdAt)}</td>
                    <td className="p-2">
                      {enroll.isCompleted ? (
                        <span className="text-green-600 font-semibold">Completed</span>
                      ) : enroll.cancelled ? (
                        <span className="text-red-600 font-semibold">Cancelled</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">Pending</span>
                      )}
                    </td>
                    <td className="p-2">
                      {!enroll.isCompleted && !enroll.cancelled ? (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => approveEnrollment(enroll._id)}
                            className="flex items-center gap-1 px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-md transition transform hover:scale-105"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => approveCancel(enroll._id)}
                            className="flex items-center gap-1 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 hover:shadow-md transition transform hover:scale-105"
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          {enroll.isCompleted ? "Approved" : "Cancelled"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {enrollments.map((enroll, index) => (
              <div key={enroll._id} className="border rounded-lg shadow p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">#{index + 1}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      enroll.isCompleted
                        ? "bg-green-100 text-green-700"
                        : enroll.cancelled
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {enroll.isCompleted
                      ? "Completed"
                      : enroll.cancelled
                      ? "Cancelled"
                      : "Pending"}
                  </span>
                </div>

                <p className="text-sm font-medium">{enroll.userId?.name}</p>
                <p className="text-xs text-gray-500">{enroll.userId?.email}</p>

                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Course:</span> {enroll.courseId?.title}
                </p>
                <p className="text-xs text-gray-500">{enroll.courseId?.category}</p>

                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Date:</span> {formatDate(enroll.createdAt)}
                </p>

                {!enroll.isCompleted && !enroll.cancelled && (
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => approveEnrollment(enroll._id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-md transition transform hover:scale-105 w-full sm:w-auto"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => approveCancel(enroll._id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 hover:shadow-md transition transform hover:scale-105 w-full sm:w-auto"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
