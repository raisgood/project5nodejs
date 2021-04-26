import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import './App.js';
import './App.css';
class Node extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { apiResponse: "", image: null };
  }

  callAPI() {
    fetch("http://localhost:2425/testAPI")
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res.message }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p> {this.state.apiResponse} </p>
        </header>
      </div>
    );
  }
}

function App() {
  const [photo, setPhoto] = useState("");
  const [clientId] = useState(
    "wmIq668XnfXhyDLB_5Xxpc1EeLXW0NuE2kb7bBjHPAc"
  );
  const [result, setResult] = useState([]);

  function handleChange(event) {
    setPhoto(event.target.value);
  }

  function handleSubmit(event) {
    console.log(photo);

    const url =
      "https://api.unsplash.com/search/photos?page=1&query=" +
      photo +
      "&client_id=" +
      clientId;

    axios.get(url).then((response) => {
      console.log(response);
      setResult(response.data.results);
    });
  }

  return (
    <div className="App">
      <h1>Photo Searcher</h1>
      <section class="SearchBar">
      <input
        onChange={handleChange}
        type="text"
        name="photo"
        placeholder="Search for Photos..."
      />
      <button onClick={handleSubmit} type="submit">
        Search
      </button>
      </section>
      <section class="Photos">
      {result.map((photo) => (
        <img src={photo.urls.small} alt="photos" width="200" height="200"/>
      ))}
      </section>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);