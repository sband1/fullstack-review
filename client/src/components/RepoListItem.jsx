import React from'react';

const RepoListItem = (props) => {


  return (
    <li>
      <span><a href={props.repo.repo_url}><text>{props.repo.repo_name}</text></a></span> <br></br>
      {props.repo.description? <span><span>Description: {props.repo.description}</span><br></br></span> : null}
      <span>Date: {props.repo.updated_at}</span> <br></br>
      <span>Forks: {props.repo.forks_count}</span>
    </li>
  )
}

export default RepoListItem;

