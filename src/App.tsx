import { greet } from "./utils/greet";
import MainPage from "./components/MainPage";

function App(): JSX.Element {
  return (
    <>
    <div className="header-buttons">
      <button>spots</button>
      <button>add a spot</button>
    </div>
      <MainPage />
    </>
  );
}

export default App;
