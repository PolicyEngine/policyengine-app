import { Modal } from "antd";
import { useCallback, useEffect, useState } from "react";

export default function Screenshottable(props) {
  const { children, title } = props;
  // This component watches for the keyboard shortcut Ctrl + K, and when it
  // is pressed, it shows the children in a modal dialog with lots of whitespace
  // around them, so that they can be easily copied and pasted into a document.

  const [show, setShow] = useState(false);

  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.key === "k") {
      console.log("ctrl+k");
      setShow(true);
    }
  }, []);

  // Watch for escape key to close the modal
  const handleKeyUp = useCallback((event) => {
    if (event.key === "Escape") {
      setShow(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <>
      {children}
      <Modal
        open={show}
        closable={false}
        size="lg"
        centered
        width={1000}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div
          style={{
            paddingLeft: 100,
            paddingRight: 100,
            paddingTop: 200,
            paddingBottom: 120,
            borderWidth: 1,
            borderStyle: "dashed",
            minHeight: 800,
          }}
        >
          {
            title && (
              <h2>{title}</h2>
            )
          }
          {children}
        </div>
      </Modal>
    </>
  );
}
