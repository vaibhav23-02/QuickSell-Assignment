import Navbar from "./Components/Navbar";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Priority from "./pages/Priority";
import Users from "./pages/Users";
import PrioritySort from "./pages/PrioritySort";
import TitleSort from "./pages/TitleSort";

const App = () => {
  const [statusCounts, setStatusCounts] = useState({
    todo: 0,
    inprogress: 0,
    backlog: 0,
    done: 0,
    cancelled: 0,
  });

  const [groupedTickets, setGroupedTickets] = useState({
    todo: [],
    inprogress: [],
    backlog: [],
    done: [],
    cancelled: [],
  });

  const [priorityCounts, setPriorityCounts] = useState({
    urgent: 0,
    high: 0,
    medium: 0,
    low: 0,
    noPriority: 0,
  });

  const [groupedTicketsByPriority, setGroupedTicketsByPriority] = useState({
    urgent: [],
    high: [],
    medium: [],
    low: [],
    noPriority: [],
  });

  const [mergedTickets, setMergedTickets] = useState([]);
  const [userTicketMap, setUserTicketMap] = useState({});
  const [usersCount, setUsersCount] = useState(0);
  const [userDetailsMap, setUserDetailsMap] = useState({});

  const [sortTitle, setSortTitle] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await res.json();
        const { tickets, users } = data;

        const counts = {
          todo: 0,
          inprogress: 0,
          backlog: 0,
          done: 0,
          cancelled: 0,
        };

        const grouped = {
          todo: [],
          inprogress: [],
          backlog: [],
          done: [],
          cancelled: [],
        };

        const groupedPriority = {
          urgent: [],
          high: [],
          medium: [],
          low: [],
          noPriority: [],
        };

        tickets.forEach((ticket) => {
          const normalizedStatus =
            ticket.status === "In progress"
              ? "inprogress"
              : ticket.status.toLowerCase();

          if (counts.hasOwnProperty(normalizedStatus)) {
            counts[normalizedStatus]++;
            grouped[normalizedStatus].push(ticket);
          }

          switch (ticket.priority) {
            case 4:
              priorityCounts.urgent++;
              groupedPriority.urgent.push(ticket);
              break;
            case 3:
              priorityCounts.high++;
              groupedPriority.high.push(ticket);
              break;
            case 2:
              priorityCounts.medium++;
              groupedPriority.medium.push(ticket);
              break;
            case 1:
              priorityCounts.low++;
              groupedPriority.low.push(ticket);
              break;
            case 0:
              priorityCounts.noPriority++;
              groupedPriority.noPriority.push(ticket);
              break;
            default:
              break;
          }
        });

        const populatedTickets = tickets.map((ticket) => {
          const user = users.find((user) => user.id === ticket.userId);
          return {
            ...ticket,
            user: user
              ? { id: user.id, name: user.name, available: user.available }
              : null,
          };
        });

        const userMap = {};
        const userDetails = {};

        populatedTickets.forEach((ticket) => {
          const userId = ticket.userId;
          const user = users.find((user) => user.id === ticket.userId);

          if (user) {
            userDetails[user.id] = { id: user.id, name: user.name }; // Corrected scope
          }

          if (!userMap[userId]) {
            userMap[userId] = [];
          }
          userMap[userId].push(ticket);
        });

        setStatusCounts(counts);
        setGroupedTickets(grouped);

        setPriorityCounts(priorityCounts);
        setGroupedTicketsByPriority(groupedPriority);

        setMergedTickets(populatedTickets);
        setUserTicketMap(userMap);
        console.log("Count users: ", Object.keys(userMap).length);
        setUsersCount(Object.keys(userMap).length);
        setUserDetailsMap(userDetails); // Set user details state

        console.log("Ticket counts:", counts);
        console.log("Grouped tickets:", grouped);
        console.log("Priority counts:", priorityCounts);
        console.log("Grouped tickets by priority:", groupedPriority);
        console.log("Populated tickets with user info:", populatedTickets);
        console.log("User -> Tickets map:", userMap);

        const sorted = tickets.sort((a, b) => a.title.localeCompare(b.title));
        setSortTitle(sorted);
        console.log(sorted); // but here it shows it has 10 objects
        // here it coming empty

        console.log("user-detail", userDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();

    return () => {
      console.log("Unmounted");
    };
  }, [priorityCounts]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                statusCounts={statusCounts}
                groupedTickets={groupedTickets}
              />
            }
          />
          <Route
            path="/priority"
            element={
              <Priority
                priorityCounts={priorityCounts}
                groupedTicketsByPriority={groupedTicketsByPriority}
              />
            }
          />
          <Route
            path="/names"
            element={
              <Users
                usersCount={usersCount}
                userTicketMap={userTicketMap}
                userDetailsMap={userDetailsMap}
              />
            }
          />
          <Route
            path="/sort/priority"
            element={
              <PrioritySort
                priorityCounts={priorityCounts}
                groupedTicketsByPriority={groupedTicketsByPriority}
              />
            }
          />
          <Route
            path="/sort/title"
            element={
              <TitleSort statusCounts={statusCounts} sortTitle={sortTitle} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;