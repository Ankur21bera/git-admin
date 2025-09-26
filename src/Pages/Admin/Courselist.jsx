import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { assets } from '../../assets/assets';
import {Button,Modal,ModalBody,Spinner,Textarea,TextInput} from "flowbite-react";

const Courselist = () => {
  const {courses = [], aToken,getAllCourses,deleteCourse,updateCourse,changeAvailability} = useContext(AdminContext);
  const [showEditModal,setShowEditModal] = useState(false);
  const [selectedCourse,setSelectedCourse] = useState(null);
  const [form,setForm] = useState({
    title:"",
    category:"",
    duration:"",
    level:"",
    about:"",
    price:"",
    mentorName:"",
    mentorEmail:"",
    module:"",
  });
  const [courseImg,setCourseImg] = useState(null);
  const [mentorImg,setMentorImg] = useState(null);
  const [loading,setLoading] = useState(false);

  const openEditModal = (course) => {
    if(!course) return;
    setSelectedCourse(course);
    setForm({
      title: course.title || "",
      category: course.category || "",
      duration:course.duration || "",
      level:course.level || "",
      about: course.about || "",
      price: course.price || "",
      mentorName: course.mentor?.name || "",
      mentorEmail: course.mentor?.email || "",
      module: course.module || ""
    });
    setCourseImg(null);
    setMentorImg(null);
    setShowEditModal(true);
  };

  const handleEditSubmit = async(e) => {
    e.preventDefault();
    if(!selectedCourse) return;
    setLoading(true);

    const formData = new FormData();
     if (courseImg) {
      formData.append("courseImage", courseImg);
    } else {
      formData.append("existingCourseImage", selectedCourse.image || "");
    }
     if (mentorImg) {
      formData.append("mentorImage", mentorImg);
    } else {
      formData.append("existingMentorImage", selectedCourse.mentor?.image || "");
    }
    
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("duration", form.duration);
    formData.append("level", form.level);
    formData.append("about", form.about);
    formData.append("price", form.price);
    formData.append("mentorName", form.mentorName);
    formData.append("mentorEmail", form.mentorEmail);
    formData.append("module", form.module);

     await updateCourse(selectedCourse._id, formData);

     setTimeout(() => {
      setShowEditModal(false);
      setLoading(false);
     },1500)
  }

  useEffect(() => {
    if(aToken) {
      getAllCourses();
    }
  },[aToken])

  return (
    <div className='m-5 max-h-[90vh]'>
     <h1 className='text-lg font-medium'>All Courses</h1>
     <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
      {Array.isArray(courses)&& courses.length > 0 ? (
        courses.map((course)=>(
          <div key={course._id} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'>
           <img className='bg-indigo-50 group-hover:bg-primary-500 transition-all duration-500 w-full h-40 object-cover' src={course.image || assets?.defaultCourseImg || "https://via.placeholder.com/150"} alt="Course" />
           <div className='p-4'>
           <p className='text-neutral-800 text-lg font-medium'>{course.title}</p>
           <p className="text-zinc-600 text-sm">{course.category}</p>
           <p className="text-zinc-700 text-sm">₹{course.price}</p>
            <div className="flex items-center gap-2 mt-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={
                      course.mentor?.image ||
                      assets?.defaultMentorImg ||
                      "https://via.placeholder.com/50"
                    }
                    alt="Mentor"
                  />
                  <p className="text-sm">{course.mentor?.name}</p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={course.available}
                      onChange={() => changeAvailability(course._id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative transition">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </div>
                  </label>
                  <span className="text-xs text-gray-600">
                    {course.available ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className='mt-4 flex gap-2'>
                  <button onClick={()=>{if(window.confirm("Are you sure you want to delete this course?")){deleteCourse(course._id)}}} className='px-3 py-1 cursor-pointer text-sm bg-red-100 text-red-700 rounded hover:bg-red-20'>Delete</button>
                  <button onClick={()=>openEditModal(course)} className="px-3 py-1 text-sm cursor-pointer bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Edit</button>
                </div>
           </div>
          </div>
        ))
      ):(
         <p className="text-gray-500 mt-4">No courses found.</p>
      )}
     </div>
     {showEditModal && selectedCourse && (
      <Modal show={showEditModal} onClose={()=>setShowEditModal(false)} size="xl" popup>
        <h1 className="text-center text-[30px] font-semibold mt-4">
            Edit Course
          </h1>
          <ModalBody className='mt-5'>
            <form className='grid grid-cols-1 sm:grid-cols-2 gap-4' onSubmit={handleEditSubmit}>
             <TextInput type='text' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder='Title'/>
             <TextInput type='text' value={form.category}   onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder='Category' />
             <TextInput type='text' value={form.duration}  onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder='Duration'/>
             <TextInput type='text' value={form.level}  onChange={(e) => setForm({ ...form, level: e.target.value })} placeholder='Level'/>
             <TextInput type='number' value={form.price}   onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder='Price' />
             <TextInput type='text' value={form.mentorName} onChange={(e)=>setForm({...form,mentorName:e.target.value})} placeholder='Mentor Name' />
             <TextInput type='email' value={form.mentorEmail} onChange={(e)=>setForm({...form,mentorEmail:e.target.value})} placeholder='Mentor Email' />
             <TextInput type="text" value={form.module} onChange={(e) => setForm({ ...form, module: e.target.value })} placeholder="Module"/>
             <Textarea value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} placeholder="About" rows={3} required/>
             
             <div className='col-span-2 flex gap-6'>
              <div>
                <label htmlFor="course-img">
                  <img className="w-20 h-20 object-cover bg-gray-100 rounded-md cursor-pointer" src={courseImg ? URL.createObjectURL(courseImg) : selectedCourse.image || assets?.defaultCourseImg || "https://via.placeholder.com/150" } alt="Upload Course" />
                </label>
                <input onChange={(e)=>setCourseImg(e.target.files[0])} type="file" id='course-img' hidden/>
                <p className='text-sm'>Upload Course</p>
              </div>
              <div>
                <label htmlFor="mentor-img">
                  <img  className="w-20 h-20 object-cover bg-gray-100 rounded-full cursor-pointer" src={ mentorImg? URL.createObjectURL(mentorImg) : selectedCourse.mentor?.image || assets?.defaultMentorImg || "https://via.placeholder.com/50"}   alt="Upload Mentor" />
                </label>
             <input onChange={(e) => setMentorImg(e.target.files[0])} type="file" id="mentor-img" hidden/>
                  <p className="text-sm">Upload Mentor picture</p>   
              </div>
             </div>
             <div className='col-span-2 flex justify-end gap-3 mt-4'>
              <Button onClick={()=>setShowEditModal(false)} className='cursor-pointer' color="gray">
                Cancel
              </Button>
              <Button className='cursor-pointer' type='submit' disabled={loading}>
                {loading? (
                  <span className='flex items-center gap-2'>
                   <Spinner size='sm'/> Updating...
                  </span>
                ) : (
                 "Update Course"
                )}
              </Button>
             </div>
            </form>
          </ModalBody>
      </Modal>
     )}
    </div>
  )
}

export default Courselist

