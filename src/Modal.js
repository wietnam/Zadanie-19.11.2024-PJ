import React, { Component, createContext } from 'react';

// Tworzymy kontekst
const ModalContext = createContext();

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false,
    };
  }

  // Metoda toggle do otwierania/zamykania modalu
  toggle = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { isOpen } = this.state;
    const { children } = this.props;

    return (
      <ModalContext.Provider value={{ isOpen, toggle: this.toggle }}>
        {isOpen && (
          <>
            {/* Szare, półprzeźroczyste tło */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={this.toggle}
            />
            {/* Modal */}
            <div
              style={{
                position: "fixed",
                backgroundColor: "white",
                borderRadius: "5px",
                maxWidth: "500px",
                width: "100%",
                zIndex: 10,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </>
        )}
      </ModalContext.Provider>
    );
  }
}

// Modal.Header
Modal.Header = ({ title }) => (
  <ModalContext.Consumer>
    {({ toggle }) => (
      <div
        style={{
          padding: "10px",
          backgroundColor: "white",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>{title}</h3>
        <button onClick={toggle}>Close</button>
      </div>
    )}
  </ModalContext.Consumer>
);

// Modal.Content
Modal.Content = ({ children }) => (
  <ModalContext.Consumer>
    {({ isOpen }) => (isOpen ? <div style={{ padding: "10px" }}>{children}</div> : null)}
  </ModalContext.Consumer>
);

// Modal.Footer
Modal.Footer = ({ callToActionLabel }) => (
  <ModalContext.Consumer>
    {({ toggle }) => (
      <div
        style={{
          padding: "10px",
          backgroundColor: "white",
          borderTop: "1px solid #ccc",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <button onClick={toggle}>Cancel</button>
        <button
          onClick={() => {
            toggle();
            alert("OK");
          }}
        >
          {callToActionLabel}
        </button>
      </div>
    )}
  </ModalContext.Consumer>
);

export default Modal;
