import { Editor } from "./components/Editor";
import { Header } from "./components/Header";
import { Result } from "./components/Result";

function App() {
  return (
    <main className="App padding-16 bg-gray-900 min-h-screen">
      <Header />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 m-4">
        <Editor />
        <Result />
      </div>
    </main>
  );
}

export default App;
