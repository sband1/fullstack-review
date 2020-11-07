import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    this.getReposAndSetState();
  }

  getReposAndSetState() {
    axios({
      method: 'get',
      url: 'repos'
    })
    .then((response) => {
      console.log('getReposAndSetState', response.data)
      this.setState({repos: response.data})
    })
    .catch((err) => console.log(err));
  }

  search (term) {
    console.log(`${term} was searched`);
    axios({
      method: 'post',
      url: '/repos',
      data: {
        username: term,
      }
    })
    .then((response) => {
      console.log(response);
      this.getReposAndSetState();
    })
    .catch((err) => console.log(err));
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));