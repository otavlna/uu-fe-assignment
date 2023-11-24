export default function Modal({ children, show }) {
  return (
    <div
      style={{
        zIndex: 10,
        display: show ? "block" : "none",
        position: "fixed",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "30px 60px",
        border: "1px solid #aaa",
        borderRadius: "5px",
        background: "#fff",
      }}
    >
      {children}
    </div>
  );
}
