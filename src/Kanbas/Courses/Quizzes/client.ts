import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const findQuizzesForCourse = async (courseId: any) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};
export const createQuiz = async (courseId: any, quiz: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/quizzes`,
        quiz
    );
    return response.data;
};
export const deleteQuiz = async (quizId: any) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const updateQuiz = async (quiz: any) => {
    console.log("Updating quiz at:", `${QUIZZES_API}/${quiz._id}`); // Debug URL
    const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    console.log("Update response:", response.data); // Debug response
    return response.data;
};
