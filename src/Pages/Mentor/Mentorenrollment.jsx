import React, { useContext, useEffect } from "react";
import { MentorContext } from "../../Context/MentorContext";

const Mentorenrollment = () => {
  const { mToken, enrollments = [], getEnrollments, approveEnrollment, approveCancel } =
    useContext(MentorContext);

  useEffect(() => {
    if (mToken) getEnrollments();
  }, [mToken]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "--";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleApprove = async (id) => {
    await approveEnrollment(id);
    getEnrollments();
  };

  const handleCancel = async (id) => {
    await approveCancel(id);
    getEnrollments();
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Enrollments</h2>

      {enrollments.length > 0 ? (
        <div className="grid gap-4">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto shadow rounded-lg border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left text-sm font-semibold text-gray-600">#</th>
                  <th className="p-2 text-left text-sm font-semibold text-gray-600">Student</th>
                  <th className="p-2 text-left text-sm font-semibold text-gray-600">Payment</th>
                  <th className="p-2 text-left text-sm font-semibold text-gray-600">Age</th>
                  <th className="p-2 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="p-2 text-left text-sm font-semibold text-gray-600">Fees</th>
                  <th className="p-2 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enroll, index) => (
                  <tr
                    key={enroll._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2 flex items-center gap-2">
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={enroll.userData?.image || "https://via.placeholder.com/40"}
                        alt={enroll.userData?.name || "Student"}
                      />
                      {enroll.userData?.name || "Unknown"}
                    </td>
                    <td className="p-2">
                      {enroll.payment ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          Paid
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                          Not Paid
                        </span>
                      )}
                    </td>
                    <td className="p-2">{enroll.userData?.age || "-"}</td>
                    <td className="p-2">{formatDate(enroll.slotDate)}</td>
                    <td className="p-2">₹{enroll.amount}</td>
                    <td className="p-2 flex gap-2">
                      {enroll.isCompleted ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          Completed
                        </span>
                      ) : enroll.cancelled ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                          Cancelled
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleApprove(enroll._id)}
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleCancel(enroll._id)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col gap-4">
            {enrollments.map((enroll, index) => (
              <div
                key={enroll._id}
                className="border rounded-lg shadow p-4 bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">#{index + 1}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
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

                <div className="flex items-center gap-2 mb-2">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={enroll.userData?.image || "https://via.placeholder.com/40"}
                    alt={enroll.userData?.name || "Student"}
                  />
                  <div>
                    <p className="font-medium">{enroll.userData?.name || "Unknown"}</p>
                    <p className="text-xs text-gray-500">{enroll.userData?.email}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Payment:</span>{" "}
                  {enroll.payment ? "Paid" : "Not Paid"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Age:</span> {enroll.userData?.age || "-"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Date:</span> {formatDate(enroll.slotDate)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Fees:</span> ₹{enroll.amount}
                </p>

                {!enroll.isCompleted && !enroll.cancelled && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleApprove(enroll._id)}
                      className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleCancel(enroll._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-center py-6">No enrollments found.</div>
      )}
    </div>
  );
};

export default Mentorenrollment;
