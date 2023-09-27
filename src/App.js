import CreateCampaign from "./component/CreateCampaign";
import Header from "./component/Header";
import ListCampaign from "./component/ListCampaign";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="mt-10">
        <CreateCampaign />
        <ListCampaign />
      </main>
    </div>
  );
}

export default App;
