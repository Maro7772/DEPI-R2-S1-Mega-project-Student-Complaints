import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Image, Button } from "react-bootstrap";
import styles from "./StudentDashboard.module.css";

function StudentDashboard() {
  return (
    <Container className="mx-4 px-0">
      <div className={`${styles.Summary} d-flex my-2 p-4`}>
        <div className={`${styles.Img} m-5`}>abc</div>
        <div className={`${styles.Info}`}>
          <p>Summary</p>
          <hr />
          <p>Full Name: </p>
          <p>Email: </p>
          <p>Age: </p>
          <p>Gender: </p>
          <p>Address: </p>
          <p>Phone: </p>
        </div>
      </div>
      <div className={`${styles.Indicators} d-flex my-2 p-4`}>
        <div className={`${styles.ColorQuestion}`}>
          <p>What does the color mean?</p>
        </div>
        <div className={`${styles.ColorInfo}`}>
          <p>Color Info</p>
          <p>Your application is progressing accordingly</p>
          <p>
            Your application is pending additional documents or correction by
            your institution
          </p>
          <p>
            Your application has been rejected/expired at the current stage.
            Please contact your institution for advice
          </p>
        </div>
      </div>
      <div className={`${styles.Applications} d-flex flex-column my-2 p-4`}>
        <div className="d-flex flex-row">
          <p className="flex-grow-1">Your Applications</p>
          <Button className="flex-grow-0">Apply New</Button>
        </div>

        <div
          className={`${styles.SearchInput} d-flex flex-row justify-content-center align-items-center mt-4`}
        >
          <div className="mx-2">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search for application"
            />
          </div>
          <div>
            <Button className="mx-2">Filters</Button>
            <Button className="mx-2">Export</Button>
          </div>
        </div>
        <div
          className={`${styles.ApplicationsList} d-flex flex-row justify-content-between mt-5`}
        >
          <div>
            <input type="checkbox" className="w-100" />
          </div>
          <div>
            <p>Date</p>
          </div>
          <div>
            <p>Status</p>
          </div>
          <div>
            <p>Remark</p>
          </div>
          <div>
            <p>Action</p>
          </div>
          <div>
            <p>Option</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default StudentDashboard;
