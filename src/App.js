import './App.css';
import axios from 'axios';

function App() {

  const handleOnClickWithFetch = async (cacheBusting) => {
    const url = cacheBusting ? `/api/data?name=${Math.random()}` : 'api/data';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }

  const handleOnClickWithAxios = async () => {
    const url = 'api/data';
    const response = await axios.get(url);
    console.log(response.data);
  }

  const updateServerData = async () => {
    const url = '/api/data/update';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }

  const updateAnotherServerData = async () => {
    const url = '/api/something-else/update';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }

  const getAnotherServerData = async () => {
    const url = '/api/something-else';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="App">
      <div>
        <h1>HTTP Caching Examples (for GET Method)</h1>
        <div className="grid">
          <p>Open the network tab in your browser, and make sure "Disable cache" is NOT ticked.</p>
          <p>
            First time you click the button below to get data, you will get fresh data with response code 200. <br/>
            But, after the first time, you will get response code `304 Not Modified`.<br/>
            This means that the server is returning an empty response body, and the cache is being used in the browser. <br/>
          </p>
          <h3>ETag</h3>
          <p>
            The above happens because ETag is used. <br/>
          </p>
          <ol>
            <li>At the initial request, the server responds with ETag in the response header.</li>
            <li>When making the subsequent requests, the browser automatically adds "If-None-Match: --the original etag hash here --" to the request header. <strong>This can be added manually in the request (e.g. test with postman)</strong></li>
            <li>Server receives the request and checks if the data has changed or not based on the etag hash sent from the browser.</li>
          </ol>
          <h3>fetch</h3>
          <button className="button" onClick={() => handleOnClickWithFetch(false)}>Get Data with fetch</button>
          <button className="button" onClick={() => handleOnClickWithFetch(true)}>Get Data with fetch with cache busting</button>
          <h4>axios: the same behaviour</h4>
          <button className="button" onClick={() => handleOnClickWithAxios()}>Get Data with axios</button>

          <h3>If the data is updated/changed in the server?</h3>
          <p>
            1. Click below to update the data to see what happens to the browser caching. <br/>
            2. Fetch the data above again. You will get the fresh data with response code 200.
          </p>
          <button className="button" onClick={updateServerData}>Update the data in the server</button>
          <h3>If another data is updated/changed in the server?</h3>
          <p>Click below to call another endpoint to update another data in the server. <br/>
            This will not affect the first data in the server (because ETag hash is the specific to the each response data), so it does not affect the browser caching in the first data.</p>
          <button className="button" onClick={updateAnotherServerData}>Update another data in the server</button>
          <h3>Cache-Control: max-age set in the server</h3>
          <p>With this, after intial call, subsequent responses will be very fast as browser cache is used automatically, but the cached data can go stale.</p>
          <button className="button" onClick={getAnotherServerData}>Get the another data in the server</button>
        </div>
      </div>
    </div>
  );
}

export default App;
