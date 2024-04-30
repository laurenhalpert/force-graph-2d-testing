import React, { useState } from "react";
import ResultItem from "./ResultItem";

function ResultList({
  results,
  searchTerm,
  onSelect,
  teamList,

  repoList,

  userList,
}) {
  //   const [teamList, setTeamList] = useState([]);
  //   const [repoList, setRepoList] = useState([]);
  //   if (results) {
  //     results.forEach((result) => {
  //       result.teams.forEach((team) => {
  //         if (team.includes(searchTerm) && !teamList.includes(team)) {
  //           updateTeamList([...teamList, team]);
  //         } else if (searchTerm === "") {
  //           updateTeamList([]);
  //         }
  //       });
  //       result.repos.forEach((repo) => {
  //         if (repo.title.includes(searchTerm) && !repoList.includes(repo.title)) {
  //           updateRepoList([...repoList, repo.title]);
  //         } else if (searchTerm === "") {
  //           updateRepoList([]);
  //         }
  //       });
  //     });
  //   }

  //   if (teamList) {
  //     teamList.forEach((team) => {
  //       if (!team.includes(searchTerm)) {
  //         teamList.splice(teamList.indexOf(team), 1);
  //         updateTeamList([...teamList]);
  //       } else if (searchTerm === "") {
  //         updateTeamList([]);
  //       }
  //     });
  //   }
  //   if (repoList) {
  //     repoList.forEach((repo) => {
  //       if (!repo.includes(searchTerm)) {
  //         repoList.splice(repoList.indexOf(repo), 1);
  //         updateRepoList([...repoList]);
  //       } else if (searchTerm === "") {
  //         updateRepoList([]);
  //       }
  //     });
  //   }

  //   results.forEach((result) => {
  //     result.repos.forEach((repo) => {
  //       if (repo.title.includes(searchTerm) && !repoList.includes(repo.title)) {
  //         updateRepoList([...repoList, repo.title]);
  //       } else if (searchTerm === "") {
  //         updateRepoList([]);
  //       }
  //     });
  //   });

  return (
    <div className="resultList">
      <table>
        <thead>
          <tr>
            <th>Users</th>
          </tr>
        </thead>

        <tbody>
          {userList
            ? userList.map((user) => {
                return (
                  <ResultItem
                    key={user.userName}
                    result={user}
                    searchTerm={searchTerm}
                    category="user"
                    onSelect={onSelect}
                  />
                );
              })
            : null}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Teams</th>
          </tr>
        </thead>

        <tbody>
          {teamList
            ? teamList.map((team) => {
                return (
                  <ResultItem
                    key={team}
                    result={team}
                    searchTerm={searchTerm}
                    category="team"
                    onSelect={onSelect}
                  />
                );
              })
            : null}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Repos</th>
          </tr>
        </thead>

        <tbody>
          {repoList
            ? repoList.map((repo) => {
                return (
                  <ResultItem
                    key={repo}
                    result={repo}
                    searchTerm={searchTerm}
                    category="repo"
                    onSelect={onSelect}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default ResultList;
