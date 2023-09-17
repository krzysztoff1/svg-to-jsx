import { Editor } from "./components/Editor";
import { Header } from "./components/Header";
import { Result } from "./components/Result";
import { TransformerOptions } from "./components/TransformerOptions";

function App() {
  return (
    <main className="App padding-16 min-h-screen">
      <Header />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4 m-4 h-full">
        <Editor />
        <Result />
      </div>

      <TransformerOptions />
    </main>
  );
}

export default App;
