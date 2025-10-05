import { createContext, useContext, useReducer } from "react";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "DATA_RECEIVED":
      return { ...state, questions: action.payload, status: "ready" };

    case "DATA_FAILED":
      return { ...state, status: "error" };

    case "START":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "NEW_ANSWER": {
      const question = state.questions.at(state.index);
      const isCorrect = action.payload === question.correctOption;

      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    }

    case "NEXT_QUESTION":
      return { ...state, index: state.index + 1, answer: null };

    case "FINISH":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "RESTART":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "TICK":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Acción desconocida");
  }
}

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //! Friendly funtions
  function getQuestions(data) {
    dispatch({ type: "DATA_RECEIVED", payload: data });
  }

  function errorGetingData() {
    dispatch({ type: "DATA_FAILED" });
  }

  function startQuiz() {
    dispatch({ type: "START" });
  }

  function nextQuestion() {
    dispatch({ type: "NEXT_QUESTION" });
  }

  function finishQuiz() {
    dispatch({ type: "FINISH" });
  }

  function getNewAnswer() {
    dispatch({ type: "NEW_ANSWER", payload: index });
  }

  function restartQuiz() {
    dispatch({ type: "RESTART" });
  }

  function tickTack() {
    dispatch({ type: "TICK" });
  }

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  // 🧩 Creamos un objeto de conveniencia
  const value = {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    numQuestions: questions.length,
    maxPoints: questions.reduce((acc, q) => acc + q.points, 0),
    dispatch,
    getQuestions,
    errorGetingData,
    startQuiz,
    nextQuestion,
    finishQuiz,
    getNewAnswer,
    restartQuiz,
    tickTack,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

// Custom hook para acceder al contexto fácilmente
export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("useQuiz debe usarse dentro de QuizProvider");
  return context;
}
