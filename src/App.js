import './App.css';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import { generateClient } from 'aws-amplify/api';
import { getTodo } from './graphql/queries'

Amplify.configure(amplifyconfig);
const client = generateClient();

function App() {
  async function fetchTodos() {
    try {
      const todoData = await client.graphql({
        query: getTodo
      });
      const todos = todoData.data.listTodos.items;

      console.log('todos ===>>', todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  return (
    <div>
      <h1>
        Hello World
      </h1>
      <button onClick={fetchTodos} > todo </button>
    </div>
  );
}

export default App;
