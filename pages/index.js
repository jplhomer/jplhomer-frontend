import App from "../components/App";
import Header from "../components/Header";
import PostList from "../components/PostList";
import styled from "styled-components";
import phrases from "../lib/hero-phrases";

const Hero = styled.div`
  font-size: 18vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 800;
`;

const Home = ({ phrase }) => (
  <App>
    <Header />
    <Hero>{phrase}</Hero>
    <PostList />
  </App>
);

Home.getInitialProps = () => {
  return { phrase: randomPhrase() };
};

function randomPhrase() {
  // if (process.browser) return "";
  return phrases[Math.floor(Math.random() * phrases.length)];
}

export default Home;
