import "./Card.css";
import { getStatus } from "../utils/status";
import { Dot } from "../utils/Svgs";
import { getPriorityIcon } from "../utils/getpriority";

const Card = ({ data, userName, status }) => {
  console.log("data", data);

  console.log("status", status);

  return (
    <>
      <div className="card">
        <div className="card-left">
          <div className="card-title">
            <h3 className="card-cam">{data?.id}</h3>
          </div>
          <div className="card-top">
          <p className="card-description">
            {data?.status && (
              <img src={getStatus(data.status)} alt="Menu icon" className="menu-icon" />
            )}
            {" Status"}
            {data?.title}
          </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.01rem" }}>
            <div className="card-network-icon">
              <img
                src={getPriorityIcon(data?.priority)}
                alt="Priority icon"
                style={{ width: "0.7rem" }}
              />
            </div>
            <div className="feature-request">
              <img src={Dot} alt="Menu icon" style={{ width: "0.7rem" }} />
              Feature Request
            </div>
          </div>
        </div>
        <div className="card-right">
          {!status && (
            <>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                style={{ width: "2.1rem", height: "2.1rem" }}
                className="card-cam-avatar"
                alt=""
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;