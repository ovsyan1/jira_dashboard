import { observer } from "mobx-react-lite";
import Dashboard from "./components/dashboard";
import useStore from "./hooks/useStore";
import Header from './components/header';

const App = () => {
  const { boards } = useStore();
  console.log(boards.active?.sections[1]?.tasks?.toJSON());
  return (
    <>
    <Header />
      <main>
      <Dashboard />
    </main>
    </>
    
  );
}

export default observer(App);
