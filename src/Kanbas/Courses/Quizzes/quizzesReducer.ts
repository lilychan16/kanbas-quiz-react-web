import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as {
    _id: string;
    title: string;
    due_date: string;
    available_date: string;
    until_date: string;
    points: string;
  }[],
  quiz: {
    title: "New Quiz",
    due_date: "2024-01-31",
    available_date: "2024-01-01",
    until_date: "2024-01-31",
    points: "100",
  },
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        addQuiz: (state, action) => {
            state.quizzes = [
                action.payload,
                ...state.quizzes,
            ];
            state.quiz = {
              title: "New Quiz",
              due_date: "2024-01-01",
              available_date: "2024-01-31",
              until_date: "2024-01-31",
              points: "100",
            };
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz) => quiz._id !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            console.log("Updating quiz with:", action.payload);
            state.quizzes = state.quizzes.map((quiz) => {
                return quiz._id === action.payload._id ? action.payload : quiz;
            });
            state.quiz = action.payload;
        },
        
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        }
    },
});

export const { addQuiz, deleteQuiz, 
                updateQuiz, setQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;