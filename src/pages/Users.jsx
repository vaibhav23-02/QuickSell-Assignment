import React from "react";
import Status from "../Components/Status";
import Card from "../Components/Card";
import { Backlog } from "../utils/Svgs";

const Users = ({ userTicketMap, usersCount, userDetailsMap }) => {
  console.log(usersCount);
  console.log(userTicketMap);
  console.log(userDetailsMap["usr-1"]);

  return (
    <>
      <div className={`grid-5`} style={{ margin: "0 5rem" }}>
        {Object.entries(userTicketMap).map(([userId, tickets], index) => (
          <div key={index}>
            <Status
              status={`${userDetailsMap[userId]?.name || "Unknown User"}`}
              imgSvg={Backlog}
              count={tickets.length}
              user="user"
            />
            {tickets.map((ticket) => (
              <Card key={ticket.id} data={ticket} status={true} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
