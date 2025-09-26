import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [courses, setCourses] = useState([]);
  const [appointments, setAppointment] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dashData,setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllCourses = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-courses",
        {},
        { headers: { aToken } }
      );
      console.log(data);
      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete-course/${courseId}`,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success("course deleted Successfully");
        setCourses((prev) => prev.filter((c) => c._id !== courseId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateCourse = async (courseId, formData) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/admin/update-course/${courseId}`,
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success("Course Update Successfully");
        getAllCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Change course availability
  const changeAvailability = async (courseId) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/admin/change-availability/${courseId}`,
        {},
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });
      if (data.success) {
        setAppointment(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelBooking = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-booking`,
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success("Booking cancelled successfully");
        setAppointment((prev) =>
          prev.map((a) =>
            a._id === appointmentId ? { ...a, cancelled: true } : a
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/user/${userId}`,
        { headers: { aToken } }
      );
      if (data.success) {
        setSelectedUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const getDashData = async() => {
    try {
      const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}});
      if(data.success) {
        setDashData(data.dashData)
        console.log(data.dashData)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

const approveOfflinePayment = async (enrollmentId) => {
  try {
    const res = await axios.post(
      `${backendUrl}/api/admin/approve-offline`,
      { enrollmentId },
      {
        headers: { aToken },  
      }
    );

    if (res.data.success) {
      toast.success("Offline payment approved");
      getDashData(); 
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Error approving offline payment");
  }
};



  const value = {
    aToken,
    setAToken,
    backendUrl,
    courses,
    setCourses,
    getAllCourses,
    deleteCourse,
    updateCourse,
    changeAvailability,
    appointments,
    setAppointment,
    getAllAppointments,
    cancelBooking,
    selectedUser,
    setSelectedUser,
    fetchUserDetails,
    dashData,
    setDashData,
    getDashData,
    approveOfflinePayment
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
