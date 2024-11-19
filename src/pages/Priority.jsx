import React from "react";
import Status from "../Components/Status";
import Card from "../Components/Card";
import {
  HighPriority,
  LowPriority,
  NoPriority,
  UrgentPriorityColor,
  MediumPriority,
} from "../utils/Svgs";

const Priority = ({ priorityCounts, groupedTicketsByPriority }) => {
  console.log(priorityCounts);
  console.log(groupedTicketsByPriority);
  const {
    high: highList,
    low: lowList,
    medium: mediumList,
    noPriority: noPriorityList,
    urgent: urgentList,
  } = groupedTicketsByPriority;
  console.log(highList);
  const { high, low, medium, noPriority, urgent } = priorityCounts;
  return (
    <>
      <div className="grid-5" style={{ margin: "0 5rem" }}>
        <div>
          <Status status="No Priority" imgSvg={NoPriority} count={noPriority} />
          {noPriorityList.map((data) => (
            <Card key={data.id} data={data} status={true} />
          ))}
        </div>
        <div>
          <Status status="Urgent" imgSvg={UrgentPriorityColor} count={urgent} />
          {urgentList.map((data) => (
            <Card key={data.id} data={data} status={true} />
          ))}
        </div>
        <div>
          <Status status="High" imgSvg={HighPriority} count={high} />
          {highList.map((data) => (
            <Card key={data.id} data={data} status={true} />
          ))}
        </div>
        <div>
          <Status status="Medium" imgSvg={MediumPriority} count={medium} />
          {mediumList.map((data) => (
            <Card key={data.id} data={data} status={true} />
          ))}
        </div>
        <div>
          <Status status="Low" imgSvg={LowPriority} count={low} />
          {lowList.map((data) => (
            <Card key={data.id} data={data} status={true} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Priority;
