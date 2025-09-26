import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelBooking, dashData, approveOfflinePayment } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "--";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!dashData) return null;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Courses", value: dashData.courses, color: "text-blue-600" },
          { label: "Total Enrollments", value: dashData.enrollments, color: "text-green-600" },
          { label: "Total Users", value: dashData.users, color: "text-purple-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white shadow-md rounded-xl p-5 text-center">
            <h2 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h2>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Latest Enrollments */}
      <div className="bg-white shadow-md rounded-xl p-5 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Latest Enrollments</h3>
        {dashData.latestEnrollments?.length > 0 ? (
          <table className="min-w-[800px] w-full text-sm border border-gray-200 table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-center">Date Of Joining</th>
                <th className="p-3 text-center">Payment</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashData.latestEnrollments.map((enroll) => (
                <tr key={enroll._id} className="border-t hover:bg-gray-50">
                  {/* User Info */}
                  <td className="p-3 flex items-center gap-2 max-w-[150px] truncate">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={enroll.userData?.image || "https://via.placeholder.com/40"}
                      alt={enroll.userData?.name}
                    />
                    <span className="truncate">{enroll.userData?.name}</span>
                  </td>

                  {/* Course */}
                  <td className="p-3 max-w-[200px] truncate">{enroll.courseData?.title}</td>

                  {/* Date + Time */}
                  <td className="p-3 text-center">
                    {formatDate(enroll.slotDate)} <br />
                    <span className="text-xs text-gray-500">{enroll.slotTime}</span>
                  </td>

                  {/* Payment Info */}
                  <td className="p-3 text-center">
                    {enroll.paymentMode} <br />
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        enroll.payment ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {enroll.payment ? "Paid" : "Pending"}
                    </span>
                  </td>

                  {/* Enrollment Status */}
                  <td className="p-3 text-center">
                    {enroll.cancelled ? (
                      <span className="px-2 py-1 rounded text-xs bg-gray-200 text-gray-600">
                        Cancelled
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-600">
                        Active
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-3 flex flex-wrap justify-center gap-2">
                    {!enroll.cancelled && (
                      <button
                        onClick={() => cancelBooking(enroll._id)}
                        className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}

                    {!enroll.payment &&
                      enroll.paymentMode === "offline" &&
                      enroll.offlinePending && (
                        <button
                          onClick={() => approveOfflinePayment(enroll._id)}
                          className="px-3 py-1 text-xs rounded cursor-pointer bg-green-500 text-white hover:bg-green-600"
                        >
                          Approve
                        </button>
                      )}

                    {!enroll.payment &&
                      enroll.paymentMode === "offline" &&
                      !enroll.offlinePending && (
                        <span className="text-xs text-yellow-600">Pending offline approval</span>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No recent enrollments.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
