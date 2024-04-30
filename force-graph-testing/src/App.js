import logo from "./logo.svg";
import "./App.css";
import ForceGraph2D from "react-force-graph-2d";
import React, { useState } from "react";
import { users } from "./myData";
import Search from "./Search";
import ResultList from "./ResultList";
import ResetButton from "./ResetButton";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  let userUsers = [];
  let teams = [];
  let repos = [];

  users.forEach((user) => {
    if (!userUsers.includes(user)) {
      userUsers.push(user);
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

  const [userList, setUserList] = useState(userUsers);
  const [teamList, setTeamList] = useState(teams);
  const [repoList, setRepoList] = useState(repos);
  // TODO: redo state so that it lives here and manage state here. Then use the state to set data used for result graphs

  let myData = {};
  myData.nodes = [];
  myData.links = [];

  // myData.nodes = [{ id: "A" }, { id: "B" }];
  // myData.links = [{ source: "A", target: "B" }];

  // users.forEach((user) => {
  //   if (!usernames.includes(user.userName)) {
  //     usernames.push(user.userName);
  //   }
  //   if (!firstNames.includes(user.firstName)) {
  //     firstNames.push(user.firstName);
  //   }
  //   if (!lastNames.includes(user.lastName)) {
  //     lastNames.push(user.lastName);
  //   }
  //   for (let i = 0; i < user.repos.length; i++) {
  //     if (!repos.includes(user.repos[i].title)) {
  //       repos.push(user.repos[i].title);
  //     }
  //   }
  //   for (let i = 0; i < user.teams.length; i++) {
  //     if (!teams.includes(user.teams[i])) {
  //       teams.push(user.teams[i]);
  //     }
  //   }
  // });

  userUsers.forEach((user) => {
    myData.nodes.push({ id: user.userName, group: "user" });
  });
  repos.forEach((repo) => {
    myData.nodes.push({ id: repo, group: "repo" });
  });
  teams.forEach((team) => {
    myData.nodes.push({ id: team, group: "team" });
  });

  users.forEach((user) => {
    for (let i = 0; i < user.repos.length; i++) {
      myData.links.push({
        source: user.userName,
        target: user.repos[i].title,
        value: user.repos[i].access,
      });
    }
    for (let i = 0; i < user.teams.length; i++) {
      myData.links.push({
        source: user.userName,
        target: user.teams[i],
        value: "none",
      });
    }
  });

  function updateSearchTerm(val) {
    setSearchTerm(() => val);
    let filteredUsers = userUsers.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(val) ||
        user.lastName.toLowerCase().includes(val) ||
        user.userName.toLowerCase().includes(val)
      );
    });
    setUserList(filteredUsers);
    let filteredTeams = teams.filter((team) => {
      return team.includes(val);
    });
    setTeamList(filteredTeams);
    let filteredRepos = repos.filter((repo) => {
      return repo.includes(val);
    });
    setRepoList(filteredRepos);
  }
  function handleSelect() {
    setIsSelected(() => true);
    selectedData.nodes = [];
    selectedData.edges = [];
  }
  function handleReset() {
    setIsSelected(() => false);
  }
  return (
    <div className="App">
      <Search searchTerm={searchTerm} setter={updateSearchTerm} />
      {searchTerm ? (
        <ResultList
          results={results}
          searchTerm={searchTerm}
          onSelect={handleSelect}
          teamList={teamList}
          repoList={repoList}
          userList={userList}
        />
      ) : null}
      <ResetButton onReset={handleReset} />
      {isSelected ? null : (
        <ForceGraph2D
          graphData={myData}
          nodeAutoColorBy="group"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 24 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(
              (n) => n + fontSize * 0.2
            );

            ctx.fillStyle = "rgba(250, 236, 255, 0.8)";
            ctx.fillRect(
              node.x - bckgDimensions[0] / 2,
              node.y - bckgDimensions[1] / 2,
              ...bckgDimensions
            );

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = node.color;
            ctx.fillText(label, node.x, node.y);

            node.__bckgDimensions = bckgDimensions;
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            bckgDimensions &&
              ctx.fillRect(
                node.x - bckgDimensions[0] / 2,
                node.y - bckgDimensions[1] / 2,
                ...bckgDimensions
              );
          }}
          linkAutoColorBy="value"
        />
      )}
    </div>
  );
}

export default App;
