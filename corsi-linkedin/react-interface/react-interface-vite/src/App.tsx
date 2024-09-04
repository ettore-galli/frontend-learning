import { RiArchive2Line } from "react-icons/ri";
import Search from "./components/Search";

function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className='text-5xl'>
        <RiArchive2Line className='inline-block text-red-400 align-top' /> Your appointments
      </h1>
      <Search />
    </div>
  );
}

export default App;
