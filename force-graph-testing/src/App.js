import logo from "./logo.svg";
import "./App.css";
import ForceGraph2D from "react-force-graph-2d";

import { users } from "./myData";

function App() {
  let usernames = [];
  let repos = [];
  let teams = [];

  let myData = {};
  myData.nodes = [];
  myData.links = [];

  // myData.nodes = [{ id: "A" }, { id: "B" }];
  // myData.links = [{ source: "A", target: "B" }];

  users.forEach((user) => {
    if (!usernames.includes(user.userName)) {
      usernames.push(user.userName);
    }
    for (let i = 0; i < user.repos.length; i++) {
      if (!repos.includes(user.repos[i].title)) {
        repos.push(user.repos[i].title);
      }
    }
    for (let i = 0; i < user.teams.length; i++) {
      if (!teams.includes(user.teams[i])) {
        teams.push(user.teams[i]);
      }
    }
  });

  usernames.forEach((username) => {
    myData.nodes.push({ id: username });
  });
  repos.forEach((repo) => {
    myData.nodes.push({ id: repo });
  });
  teams.forEach((team) => {
    myData.nodes.push({ id: team });
  });

  users.forEach((user) => {
    for (let i = 0; i < user.repos.length; i++) {
      myData.links.push({ source: user.userName, target: user.repos[i].title });
    }
    for (let i = 0; i < user.teams.length; i++) {
      myData.links.push({ source: user.userName, target: user.teams[i] });
    }
  });

  console.log(myData);

  return (
    <div className="App">
      <ForceGraph2D graphData={myData} />
    </div>
  );
}

export default App;
