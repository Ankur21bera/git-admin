import React, { useContext, useEffect, useState } from 'react';
import { MentorContext } from '../../Context/MentorContext';
import { BookOpen, Layers, Clock, BarChart3, DollarSign, Edit2, Save } from "lucide-react";

const MentorProfile = () => {
  const { mentorProfile, getMentorProfile, updateMentorCourse } = useContext(MentorContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ title: "", category: "", duration: "", level: "", price: "" });

  useEffect(() => {
    getMentorProfile();
  }, []);

  useEffect(() => {
    if (mentorProfile?.course) {
      setFormData({
        title: mentorProfile.course.title,
        category: mentorProfile.course.category,
        duration: mentorProfile.course.duration,
        level: mentorProfile.course.level,
        price: mentorProfile.course.price,
      });
    }
  }, [mentorProfile]);

  if (!mentorProfile) return <div className="p-5">Loading profile...</div>;

  const { mentor, course } = mentorProfile;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMentorCourse(formData);
    setEditing(false);
  };

  return (
    <div className='p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl'>
      <div className='flex items-center space-x-4'>
        <img className='w-20 h-20 rounded-full object-cover border' src={mentor.image} alt="" />
        <div>
          <h2 className='text-2xl font-semibold'>{mentor.name}</h2>
          <p className="text-gray-600">{mentor.email}</p>
          <span className='px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-full'>{mentor.role}</span>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">Your Course Information</h3>
          <button onClick={() => setEditing(!editing)} className="flex items-center space-x-1 text-indigo-600 font-semibold">
            {editing ? <Save size={16} /> : <Edit2 size={16} />}
            <span className='cursor-pointer'>{editing ? "Save" : "Edit"}</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-gradient-to-r from-indigo-50 to-white shadow-md rounded-xl p-6 space-y-4 border border-indigo-100">
          {["title","category","duration","level","price"].map((field) => (
            <div className="flex items-center space-x-3" key={field}>
              {field === "title" && <BookOpen className="text-indigo-500" size={20} />}
              {field === "category" && <Layers className="text-pink-500" size={20} />}
              {field === "duration" && <Clock className="text-green-500" size={20} />}
              {field === "level" && <BarChart3 className="text-orange-500" size={20} />}
              {field === "price" && <DollarSign className="text-emerald-500" size={20} />}

              {editing ? (
                <input
                  type={field === "price" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="border-b border-gray-300 text-gray-800 focus:outline-none focus:border-indigo-500 w-full"
                />
              ) : (
                <p className="text-lg">
                  <span className="font-semibold text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>{" "}
                  <span className="text-gray-800">{formData[field]}</span>
                </p>
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default MentorProfile;
