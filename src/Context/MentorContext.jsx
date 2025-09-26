import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";


export const MentorContext = createContext();

const MentorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [mToken,setMToken] =  useState(
    localStorage.getItem("mToken") ? localStorage.getItem("mToken") : "");

    const [enrollments,setEnrollments] = useState([]);
    const [mentorProfile, setMentorProfile] = useState(null);


    const getEnrollments = async()=> {
        try {
            const {data} = await axios.get('http://localhost:4000/api/course/enrollments',{headers:{mToken}});
            if(data.success) {
                setEnrollments(data.enrollments.reverse());
                console.log(data.enrollments.reverse())
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const approveCancel = async (enrollmentId) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/course/enrollment/cancel/${enrollmentId}`,
        {},
        { headers: { mToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getEnrollments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const approveEnrollment = async (enrollmentId) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/course/enrollment/approve/${enrollmentId}`,
        {},
        { headers: { mToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getEnrollments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

   const getMentorProfile = async() => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/course/profile`,{
        headers:{mToken},
      })      
       if (data.success) {
        setMentorProfile(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message)
    }
  }

  const updateMentorCourse = async (updates) => {
  try {
    const { data } = await axios.put(
      `${backendUrl}/api/course/profile/update`,
      updates,
      { headers: { mtoken: mToken } } 
    );
    if (data.success) {
      toast.success(data.message);
      setMentorProfile({ mentor: mentorProfile.mentor, course: data.course }); 
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};




    const value = {
      mToken,
      setMToken,
      backendUrl,
      enrollments,
      setEnrollments,
      getEnrollments,
      approveEnrollment,
      approveCancel,
      mentorProfile,
      setMentorProfile,
      getMentorProfile,
      updateMentorCourse
    }

    return (
        <MentorContext.Provider value={value}>
            {props.children}
        </MentorContext.Provider>
    )
}

export default MentorContextProvider;