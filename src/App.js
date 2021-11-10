import styled from 'styled-components'
import SearchingPage from "./components/SearchingPage/SearchingPage";

const MainPage = styled.div`
  background: white;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`

function App() {
  return (
    <div className="App">
      <MainPage>
        <SearchingPage/>
      </MainPage>
    </div>
  );
}

export default App;
