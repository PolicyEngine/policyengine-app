// External imports
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

// Local imports
import Button from "controls/Button";

const styles = {
  modal: {
    borderRadius: "25px",
  },
  title: {
    marginBottom: "16px",
    fontWeight: "bold"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  submitButton: {
    width: "fit-content"
  }
}

export default function RecreateHouseholdPopup(props) {

  const {
    countryId,
    householdId,
    isRHPOpen,
    setIsRHPOpen
  } = props;

  const navigate=useNavigate();

  const title = "Household Input Error";
  const content = `Unfortunately, this household contains data that 
  is out of date. Please return to the home screen and create a new 
  household.`;
  const buttonText = "Create new household";

  function handleClick() {
    setIsRHPOpen(false);
    navigate(`${countryId}/household?focus=intro`);
  }

  if (!isRHPOpen) {
    return;
  }
  else {
    return (
      <>
        <Modal 
          open={isRHPOpen}
          header={null}
          footer={null}
          style={styles.modal}
          centered
          closable={false}
          keyboard={false}
        >
          <div style={styles.container}>
            <h6 style={styles.title}>
              {title}
            </h6>
            <p>{content}</p>
            <Button
              text={buttonText}
              onClick={handleClick}
              primary={true}
              style={styles.submitButton}
              centered
            />
          </div>
        </Modal>
      </>
    );
  }

}
