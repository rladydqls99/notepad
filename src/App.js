import styled from "styled-components";
import SideBar from "./component/SideBar";
import Main from "./component/Main";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <Container>
      <RecoilRoot>
        <SideBar />
        <Main />
      </RecoilRoot>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  height: 600px;

  border: 1px solid lightgray;
  border-radius: 10px;
`;
