//? .primary {
//   font-weight: 700;
//   background-color: var(--color-brand--2);
//   color: var(--color-dark--1);
// }

//? .back {
//   font-weight: 600;
//   background: none;
//   border: 1px solid currentColor;
// }

//? .position {
//   font-weight: 700;
//   position: absolute;
//   z-index: 1000;
//   font-size: 1.4rem;
//   bottom: 4rem;
//   left: 50%;
//   transform: translateX(-50%);
//   background-color: var(--color-brand--2);
//   color: var(--color-dark--1);
//   box-shadow: 0 0.4rem 1.2rem rgba(36, 42, 46, 0.16);
// }

import styles from "../components-styles/Button.module.css";

export default function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

//!APP

<div className={styles.buttons}>
  <Button type="primary">Add</Button>
  <Button type="back">&larr; Back</Button>
</div>;
