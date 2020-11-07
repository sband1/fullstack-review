import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
    <div>
      <ul>
        {props.repos.map((repo) => <RepoListItem key={repo.id} repo={repo}/>)}
      </ul>
    </div>
  </div>
)

export default RepoList;