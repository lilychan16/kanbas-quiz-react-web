import store from "./store";
import { Provider } from "react-redux";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  
  const COURSES_API = `${API_BASE}/api/courses`;

  const [course, setCourse] = useState({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "reactjs.jpg",
  });

  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };

  useEffect(() => {
    findAllCourses();
  }, []);

  /*
  const addNewCourse = () => {
    const newCourse = { ...course, _id: new Date().getTime().toString() };
    setCourses([...courses, { ...course, ...newCourse }]);
  };
  */
  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course);
    setCourses([...courses, response.data]);
  };

  /*
  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  */
  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(`${COURSES_API}/${courseId}`);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  /*
  const updateCourse = () => {
    setCourses(
      courses.map((current) => {
        if (current._id === course._id) {
          return course;
        } else {
          return current;
        }
      })
    );
  };
  */
  const updateCourse = async () => {
    const response = await axios.put(`${COURSES_API}/${course._id}`, course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        }
        return c;
      })
    );
  };

  return (
    <Provider store={store}>
      <div className="d-flex">
        <KanbasNavigation />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account" element={<h1>Account</h1>} />
            <Route
              path="Dashboard"
              element={
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
              }
            />
            <Route
              path="Courses/:courseId/*"
              element={<Courses />}
            />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default Kanbas;
