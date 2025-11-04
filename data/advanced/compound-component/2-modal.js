/* eslint-disable */

//! import "./App.css";

// import Modal from "./components/Modal";
// import AuthForm from "./components/AuthForm";

// export default function App() {
//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-bold mb-4">Auth Modals</h1>

//       <Modal>
//         <Modal.Open opens="login">Login</Modal.Open>
//         <Modal.Open opens="register">Register</Modal.Open>

//         <Modal.Window name="login">
//           <AuthForm mode="login" />
//         </Modal.Window>

//         <Modal.Window name="register">
//           <AuthForm mode="register" />
//         </Modal.Window>
//       </Modal>
//     </div>
//   );
// }

//! Modal
import { createContext, useContext, useState } from "react";

// Creamos el contexto para compartir estado
const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = (name) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

//! Boton que abre el modal
Modal.Open = function ModalOpen({ children, opens }) {
  const { open } = useContext(ModalContext);

  return (
    <button
      className="px-2 py-1 bg-cyan-700 rounded m-1"
      onClick={() => open(opens)}
    >
      {children}
    </button>
  );
};

//! Contenedor del modal
Modal.Window = function ModalWindow({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-[90%] max-w-md animate-scaleIn">
        {children}
        {/* Botón de cerrar */}
        <button onClick={close} className="absolute top-3 right-3 text-2xl">
          &times;
        </button>
      </div>
    </div>
  );
};

//! Boton de cierre opcional dentro del modal

Modal.Close = function ModalClose({ children }) {
  const { close } = useContext(ModalContext);

  return (
    <button
      onClick={close}
      className="px-4 py-2 bg-red-500 text-white rounded mt-4"
    >
      {children}
    </button>
  );
};

//! Form in modal
export default function AuthForm({ mode }) {
  const isLogin = mode === "login";

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold mb-4">
        {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
      </h2>

      {!isLogin && (
        <input
          type="text"
          placeholder="Nombre completo"
          className="border px-3 py-2 w-full"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        className="border px-3 py-2 w-full"
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="border px-3 py-2 w-full"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        {isLogin ? "Entrar" : "Registrarme"}
      </button>
    </form>
  );
}
