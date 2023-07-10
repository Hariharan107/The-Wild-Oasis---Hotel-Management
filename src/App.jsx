import styled from "styled-components";

import GlobalStyles from "./styles/GlobalStyles";
const H1 = styled.h1`
  color: var(--color-brand-500);
`;
const App = () => {
  return (
    <>
      <GlobalStyles />
      <div>
        <H1>hello world</H1>
      </div>
    </>
  );
};

export default App;
