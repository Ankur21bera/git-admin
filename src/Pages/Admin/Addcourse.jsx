import React, { useState, useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { assets } from "../../assets/assets";
import { Modal, ModalHeader, ModalBody, Button, Spinner } from "flowbite-react";

const AddCourse = () => {
  const { backendUrl, aToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const [courseImg, setCourseImg] = useState(null);
  const [mentorImg, setMentorImg] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");
  const [mentorPassword, setMentorPassword] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [modules, setModules] = useState([{ title: "", content: "" }]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const resetForm = () => {
    setCourseImg(null);
    setMentorImg(null);
    setTitle("");
    setCategory("Web Development");
    setDuration("");
    setLevel("Beginner");
    setMentorName("");
    setMentorEmail("");
    setMentorPassword("");
    setAbout("");
    setPrice("");
    setModules([{ title: "", content: "" }]);
  };

  const handleModuleChange = (index, field, value) => {
    const updated = [...modules];
    updated[index][field] = value;
    setModules(updated);
  };

  const addModule = () => setModules([...modules, { title: "", content: "" }]);
  const removeModule = (index) =>
    setModules(modules.filter((_, i) => i !== index));

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!courseImg || !mentorImg)
      return toast.error("Please upload both images");

    const isModulesValid = modules.every(
      (m) => m.title.trim() !== "" && m.content.trim() !== ""
    );
    if (!isModulesValid)
      return toast.error("All modules must have title & content");

    setLoading(true);

    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append("courseImage", courseImg);
        formData.append("mentorImage", mentorImg);
        formData.append("title", title);
        formData.append("category", category);
        formData.append("duration", duration);
        formData.append("level", level);
        formData.append("mentorName", mentorName);
        formData.append("mentorEmail", mentorEmail);
        formData.append("mentorPassword", mentorPassword);
        formData.append("about", about);
        formData.append("price", price);
        formData.append("modules", JSON.stringify(modules));

        const { data } = await axios.post(
          `${backendUrl}/api/admin/add-course`,
          formData,
          {
            headers: { aToken },
          }
        );

        if (data.success) setShowModal(true);
        else toast.error(data.message);
      } catch (error) {
        console.log(error);
        toast.error("Failed to add course");
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="m-2 sm:m-5 w-full">
        <p className="mb-3 text-lg font-medium">Add Course</p>
        <div className="bg-white px-4 sm:px-8 py-6 border rounded w-full max-w-full sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          {/* Images */}
          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-3 text-gray-500">
              <label htmlFor="course-img">
                <img
                  className="w-20 h-20 object-cover bg-gray-100 rounded-md cursor-pointer"
                  src={
                    courseImg
                      ? URL.createObjectURL(courseImg)
                      : assets.upload_area
                  }
                  alt="Course"
                />
              </label>
              <input
                id="course-img"
                type="file"
                hidden
                onChange={(e) => setCourseImg(e.target.files[0])}
              />
              <p className="text-sm">Upload Course Image</p>
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <label htmlFor="mentor-img">
                <img
                  className="w-20 h-20 object-cover bg-gray-100 rounded-md cursor-pointer"
                  src={
                    mentorImg
                      ? URL.createObjectURL(mentorImg)
                      : assets.upload_area
                  }
                  alt="Mentor"
                />
              </label>
              <input
                id="mentor-img"
                type="file"
                hidden
                onChange={(e) => setMentorImg(e.target.files[0])}
              />
              <p className="text-sm">Upload Mentor Image</p>
            </div>
          </div>

          {/* Course & Mentor Info */}
          <div className="flex flex-col lg:flex-row gap-6 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Course Title"
                required
              />
              <select
                className="border rounded px-3 py-2 w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Data Science">Data Science</option>
                <option value="App Development">App Development</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Graphic Design">Graphic Design</option>
              </select>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration (e.g., 10 weeks)"
                required
              />
              <select
                className="border rounded px-3 py-2 w-full"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                placeholder="Mentor Name"
                required
              />
              <input
                className="border rounded px-3 py-2 w-full"
                type="email"
                value={mentorEmail}
                onChange={(e) => setMentorEmail(e.target.value)}
                placeholder="Mentor Email"
                required
              />
              <input
                className="border rounded px-3 py-2 w-full"
                type="password"
                value={mentorPassword}
                onChange={(e) => setMentorPassword(e.target.value)}
                placeholder="Mentor Password"
                required
              />
              <input
                className="border rounded px-3 py-2 w-full"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
            </div>
          </div>

          {/* About */}
          <textarea
            className="w-full px-4 pt-2 border rounded mt-4"
            rows={4}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About Course"
            required
          />

          {/* Modules */}
          <div className="mt-4">
            <p className="mb-2">Modules</p>
            {modules.map((module, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={module.title}
                  onChange={(e) =>
                    handleModuleChange(i, "title", e.target.value)
                  }
                  placeholder="Module Title"
                  className="border rounded px-2 py-1 w-1/3"
                  required
                />
                <input
                  type="text"
                  value={module.content}
                  onChange={(e) =>
                    handleModuleChange(i, "content", e.target.value)
                  }
                  placeholder="Module Content"
                  className="border rounded px-2 py-1 w-2/3"
                />
                {modules.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeModule(i)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addModule}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer"
            >
              + Add Module
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 cursor-pointer w-full sm:w-fit px-8 py-3 mt-6 text-white rounded-full text-center"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner size="sm" /> Adding Course...
              </span>
            ) : (
              "Add Course"
            )}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size="md"
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-700">
              Course Added Successfully!
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="cursor-pointer"
                onClick={() => {
                  setShowModal(false);
                  navigate("/course-list");
                }}
              >
                View Courses
              </Button>
              <Button className="cursor-pointer"
                color="gray"
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                }}
              >
                Add Another Course
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddCourse;
