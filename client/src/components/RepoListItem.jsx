import React from'react';

const RepoListItem = (props) => {


  return (
    <li>
      <span><a href={props.repo.repo_url}><text>{props.repo.repo_name}</text></a></span> <br></br>
      <span style={{display: !props.repo.description && "none"}}>{props.repo.description}</span> <br></br>
      <span>{props.repo.updated_at}</span> <br></br>
      <span>{props.repo.forks_count}</span>
    </li>
  )
}

export default RepoListItem;

