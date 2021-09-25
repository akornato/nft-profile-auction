import "antd/dist/antd.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom";
import App from "./App";

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/9900/nft-profile-auction/0.0.2",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
