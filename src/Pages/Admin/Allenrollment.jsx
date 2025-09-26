import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Context/AdminContext";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";

const Allenrollment = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelBooking,
    fetchUserDetails,
    selectedUser,
    setSelectedUser,
  } = useContext(AdminContext);

  const [showModal, setShowModal] = useState(false);

  const handleViewUser = async (userId) => {
    await fetchUserDetails(userId);
    setShowModal(true);
  };

  useEffect(() => {
    if (aToken) getAllAppointments();
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Enrollments</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
  <table className="min-w-[900px] w-full text-sm text-left border-collapse">
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
      <tr>
        <th className="px-4 py-3">#</th>
        <th className="px-4 py-3">Student</th>
        <th className="px-4 py-3">Age</th>
        <th className="px-4 py-3">Date & Time</th>
        <th className="px-4 py-3">Mentor</th>
        <th className="px-4 py-3">Course</th>
        <th className="px-4 py-3">Fees</th>
        <th className="px-4 py-3">Payment</th>
        <th className="px-4 py-3">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {appointments?.length > 0 ? (
        appointments.map((item, index) => (
          <tr key={item._id} className="hover:bg-gray-50">
            <td className="px-4 py-3">{index + 1}</td>
            <td className="px-4 py-3 flex items-center gap-2 max-w-[150px] truncate">
              <img
                src={item.userData?.image || "https://via.placeholder.com/40"}
                alt={item.userData?.name || "Student"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="truncate">{item.userData?.name || "Unknown"}</span>
            </td>
            <td className="px-4 py-3">{item.userData?.age || "--"}</td>
            <td className="px-4 py-3 whitespace-nowrap">
              {formatDate(item.slotDate)} <br />
              <span className="text-gray-500">{item.slotTime}</span>
            </td>
            <td className="px-4 py-3 flex items-center gap-2 max-w-[150px] truncate">
              <img
                src={item.courseData?.mentor?.image || "https://via.placeholder.com/40"}
                alt={item.courseData?.mentor?.name || "Mentor"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="truncate">{item.courseData?.mentor?.name || "Unknown"}</span>
            </td>
            <td className="px-4 py-3 max-w-[200px] truncate">{item.courseData?.title || "--"}</td>
            <td className="px-4 py-3">₹{item.amount || "0"}</td>
            <td className="px-4 py-3">
              {item.payment ? (
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                  {item.paymentMode}
                </span>
              ) : (
                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                  Pending
                </span>
              )}
            </td>
            <td className="px-4 py-3 flex flex-wrap gap-2">
              <button
                onClick={() => cancelBooking(item._id)}
                disabled={item.cancelled}
                className={`w-full sm:w-auto px-3 py-1 text-sm rounded-lg transition ${
                  item.cancelled
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {item.cancelled ? "Cancelled" : "Cancel Booking"}
              </button>
              <button
                onClick={() => handleViewUser(item.userId)}
                className="w-full sm:w-auto px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                View User
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td className="px-4 py-3 text-center text-gray-500" colSpan="9">
            No Enrollments Found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  {index + 1}. {item.userData?.name || "Unknown"}
                </h3>
                <span className="text-sm text-gray-500">
                  {item.userData?.age || "--"} yrs
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={item.userData?.image || "https://via.placeholder.com/40"}
                  alt="Student"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs text-gray-500">
                    {formatDate(item.slotDate)}
                  </p>
                  <p className="text-xs text-gray-500">{item.slotTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={
                    item.courseData?.mentor?.image ||
                    "https://via.placeholder.com/40"
                  }
                  alt="Mentor"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">
                    {item.courseData?.mentor?.name || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.courseData?.title || "--"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">
                  ₹{item.amount || "0"}
                </span>
                {item.payment ? (
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    {item.paymentMode}
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                    Pending
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => cancelBooking(item._id)}
                  disabled={item.cancelled}
                  className={`w-full px-3 py-2 rounded-lg transition text-sm ${
                    item.cancelled
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                  }`}
                >
                  {item.cancelled ? "Cancelled" : "Cancel Booking"}
                </button>

                <button
                  onClick={() => handleViewUser(item.userId)}
                  className="w-full px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer transition"
                >
                  View User
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No Enrollments Found</p>
        )}
      </div>

      {/* User Details Modal */}
      <Modal show={showModal} size="md" onClose={() => setShowModal(false)}>
        <ModalHeader>User Details</ModalHeader>
        <ModalBody>
          {selectedUser ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium w-36">
                      Profile Image
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={
                          selectedUser.image || "https://via.placeholder.com/80"
                        }
                        alt={selectedUser.name || "User"}
                        className="w-20 h-20 rounded-full object-cover border border-gray-200"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Name</td>
                    <td className="px-4 py-3">{selectedUser.name || "--"}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">Email</td>
                    <td className="px-4 py-3">{selectedUser.email || "--"}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Phone</td>
                    <td className="px-4 py-3">{selectedUser.phone || "--"}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">Address</td>
                    <td className="px-4 py-3">
                      {selectedUser.address || "--"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Qualification</td>
                    <td className="px-4 py-3">
                      {selectedUser.qualification || "--"}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">Age</td>
                    <td className="px-4 py-3">{selectedUser.age || "--"}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Gender</td>
                    <td className="px-4 py-3">{selectedUser.gender || "--"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading...</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            className="cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Allenrollment;
