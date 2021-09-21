import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { Contract } from "ethers";
import { Button, Input, Table } from "antd";
import { WalletButton } from "./components/WalletButton";
import { useWeb3Modal } from "./hooks/useWeb3Modal";
import { addresses, abis } from "./contracts";
import { GET_NEW_BIDS } from "./queries/get-new-bids";

import type { BigNumber } from "ethers";
import type { ProfileAuction } from "./types";
import type { NewBidEvent } from "./types/ProfileAuction";

type Bid = [BigNumber, BigNumber, string, BigNumber] & {
  _nftTokens: BigNumber;
  _blockMinted: BigNumber;
  _profileURI: string;
  _blockWait: BigNumber;
};

function App() {
  const { loading, error, data } = useQuery(GET_NEW_BIDS);
  const { provider, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();
  const [profileAuction, setProfileAuction] = useState<ProfileAuction>();
  const [nftTokens, setNftTokens] = useState<string>();
  const [profileUri, setProfileUri] = useState<string>();
  const [bids, setBids] = useState<Bid[]>([]);
  const [bidsLoading, setBidsLoading] = useState(false);
  const [newBidEvents, setNewBidEvents] = useState<NewBidEvent[]>();
  const [newBidEventsLoading, setNewBidEventsLoading] = useState(false);

  useEffect(() => {
    if (!loading && !error) {
      console.log({ transfers: data?.transfers });
    }
  }, [loading, error, data]);

  useEffect(() => {
    if (provider) {
      const profileAuction = new Contract(
        addresses.profileAuction,
        abis.profileAuction,
        provider
      ) as ProfileAuction;
      setProfileAuction(profileAuction);
    }
  }, [provider]);

  const getBids = useCallback(
    async (address: string) => {
      if (!address) {
        setBids([]);
        return;
      }
      setBidsLoading(true);
      const bids = await profileAuction?.getBids(address);
      setBids(bids || []);
      setBidsLoading(false);
    },
    [profileAuction]
  );

  useEffect(() => {
    const async = async () => {
      const filter = profileAuction?.filters.NewBid();
      if (filter) {
        setNewBidEventsLoading(true);
        const newBidEvents = await profileAuction?.queryFilter(filter);
        setNewBidEvents(newBidEvents);
        setNewBidEventsLoading(false);
      }
    };
    async();
  }, [profileAuction]);

  const submitProfileBid = async () => {
    if (provider && profileAuction) {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const tx = await profileAuction
        .connect(signer)
        .submitProfileBid(parseInt(nftTokens || ""), profileUri || "");
      await tx.wait();
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center bg-blue-900 p-3">
        <div className="text-lg text-white">NFT Profile Auction</div>
        <WalletButton
          provider={provider}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
        />
      </header>
      <div className="p-3">
        <div className="text-lg text-center">Profile Bid</div>
        <div className="flex pt-3">
          <Input
            className="max-w-sm"
            placeholder="NFT tokens"
            value={nftTokens}
            onChange={(event) => setNftTokens(event.target.value)}
          />
          <Input
            className="max-w-sm"
            placeholder="Profile URI"
            onChange={(event) => setProfileUri(event.target.value)}
          />
          <Button type="primary" onClick={submitProfileBid}>
            Submit
          </Button>
        </div>
      </div>
      <div className="p-3">
        <div className="text-lg text-center">Query Bids</div>
        <Input.Search
          className="max-w-lg pt-3"
          placeholder="Address"
          enterButton="Get Bids"
          onSearch={getBids}
          loading={bidsLoading}
        />
        <Table
          className="pt-3"
          pagination={{ defaultPageSize: 10 }}
          loading={bidsLoading}
          dataSource={bids?.map(
            ({ _nftTokens, _blockMinted, _profileURI, _blockWait }, index) => ({
              key: index,
              _nftTokens: _nftTokens.toString(),
              _blockMinted: _blockMinted.toString(),
              _profileURI,
              _blockWait: _blockWait.toString(),
            })
          )}
        >
          <Table.Column title="NFT tokens" dataIndex="_nftTokens" />
          <Table.Column title="Block minted" dataIndex="_blockMinted" />
          <Table.Column title="Profile URI" dataIndex="_profileURI" />
          <Table.Column title="Block wait" dataIndex="_blockWait" />
        </Table>
      </div>
      <div className="p-3">
        <div className="text-lg text-center">NewBid Events</div>
        <Table
          className="pt-3"
          pagination={{ defaultPageSize: 10 }}
          loading={newBidEventsLoading}
          dataSource={newBidEvents?.map(
            ({ blockNumber, args: { _amount, _user, _val } }, index) => ({
              key: index,
              blockNumber,
              _amount: _amount.toString(),
              _user,
              _val,
            })
          )}
        >
          <Table.Column title="Block #" dataIndex="blockNumber" />
          <Table.Column title="NFT tokens" dataIndex="_amount" />
          <Table.Column title="User" dataIndex="_user" />
          <Table.Column title="Val" dataIndex="_val" />
        </Table>
      </div>
    </div>
  );
}

export default App;
