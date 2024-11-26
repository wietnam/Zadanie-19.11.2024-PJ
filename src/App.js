import React from "react";
import Modal from "./Modal";

function App() {
  const modalRef = React.useRef();

  return (
    <div>
      <button onClick={() => modalRef.current.toggle()}>Open Modal</button>
      <Modal ref={modalRef} isOpen={false}>
        <Modal.Header title="Modalek" />
        <Modal.Content>
          <p>Tresc modala</p>
        </Modal.Content>
        <Modal.Footer callToActionLabel="Confirm" />
      </Modal>
    </div>
  );
}

export default App;
