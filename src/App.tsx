import { useState, useEffect, useCallback } from "react";
// import { useQuery } from "@apollo/client";
import { ethers, Contract } from "ethers";
import { Button, Input, Table } from "antd";
import { WalletButton } from "./components/WalletButton";
import { useWeb3Modal } from "./hooks/useWeb3Modal";
import { addresses, abis } from "./contracts";
// import { GET_NEW_BIDS } from "./queries/get-new-bids";

import type { BigNumber } from "ethers";
import type { ProfileAuction, NftToken } from "./types";
import type { NewBidEvent } from "./types/ProfileAuction";

type Bid = [BigNumber, BigNumber, string, BigNumber] & {
  _nftTokens: BigNumber;
  _blockMinted: BigNumber;
  _profileURI: string;
  _blockWait: BigNumber;
};

function App() {
  // const { loading, error, data } = useQuery(GET_NEW_BIDS);
  const { provider, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();
  const [submitProfileBidError, setSubmitProfileBidError] = useState<string>();
  const [account, setAccount] = useState<string>();
  const [ethBalance, setEthBalance] = useState<string>();
  const [, setNftToken] = useState<NftToken>();
  const [nftTokenBalance, setNftTokenBalance] = useState<string>();
  const [profileAuction, setProfileAuction] = useState<ProfileAuction>();
  const [nftTokenBid, setNftTokenBid] = useState<string>();
  const [profileUriBid, setProfileUriBid] = useState<string>();
  const [submitProfileBidLoading, setSubmitProfileBidLoading] = useState(false);
  const [bidsQueryAddress, setBidsQueryAddress] = useState<string>();
  const [bids, setBids] = useState<Bid[]>([]);
  const [bidsLoading, setBidsLoading] = useState(false);
  const [newBidEvents, setNewBidEvents] = useState<NewBidEvent[]>();
  const [newBidEventsLoading, setNewBidEventsLoading] = useState(false);

  useEffect(() => {
    const async = async () => {
      if (provider) {
        const account = (await provider.listAccounts())[0];
        setAccount(account);
        const ethBalance = await provider.getBalance(account);
        setEthBalance(ethers.utils.formatEther(ethBalance));
        const profileAuction = new Contract(
          addresses.profileAuction,
          abis.profileAuction,
          provider
        ) as ProfileAuction;
        setProfileAuction(profileAuction);
        const filter = profileAuction.filters.NewBid();
        if (filter) {
          setNewBidEventsLoading(true);
          const newBidEvents = await profileAuction?.queryFilter(filter);
          setNewBidEvents(newBidEvents);
          setNewBidEventsLoading(false);
        }
        const nftToken = new Contract(
          addresses.nftToken,
          abis.nftToken,
          provider
        ) as NftToken;
        setNftToken(nftToken);
        const nftTokenBalance = await nftToken.balanceOf(account);
        setNftTokenBalance(ethers.utils.formatEther(nftTokenBalance));
      }
    };
    async();
  }, [provider]);

  const getBids = useCallback(async () => {
    setBidsLoading(true);
    const bids = await profileAuction?.getBids(bidsQueryAddress || "");
    setBids(bids || []);
    setBidsLoading(false);
  }, [profileAuction, bidsQueryAddress]);

  const submitProfileBid = async () => {
    setSubmitProfileBidError("");
    if (provider && profileAuction) {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSubmitProfileBidLoading(true);
      try {
        const tx = await profileAuction
          .connect(signer)
          .submitProfileBid(
            ethers.utils.parseEther(nftTokenBid || ""),
            profileUriBid || "",
            { gasLimit: 210000 }
          );
        await tx.wait();
      } catch (e: any) {
        setSubmitProfileBidError(e.message);
      }
      setSubmitProfileBidLoading(false);
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center bg-blue-900 p-3">
        <div className="text-lg text-white">NFT Profile Auction</div>
        <div className="flex items-center">
          {nftTokenBalance && (
            <div className="pr-3 text-white">
              NFT Token Balance: {nftTokenBalance}
            </div>
          )}
          {ethBalance && (
            <div className="pr-3 text-white">ETH Balance: {ethBalance}</div>
          )}
          <WalletButton
            provider={provider}
            account={account}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
          />
        </div>
      </header>
      <div className="p-3">
        <div className="flex pt-3">
          <Input
            className="max-w-sm"
            placeholder="NFT tokens"
            value={nftTokenBid}
            onChange={(event) => setNftTokenBid(event.target.value)}
          />
          <Input
            className="max-w-sm"
            placeholder="Profile URI"
            value={profileUriBid}
            onChange={(event) => setProfileUriBid(event.target.value)}
          />
          <Button
            type="primary"
            onClick={submitProfileBid}
            disabled={!nftTokenBid || !profileUriBid}
            loading={submitProfileBidLoading}
          >
            Submit Profile Bid
          </Button>
        </div>
        {submitProfileBidError ? (
          <div className="pt-3 text-red-500">{submitProfileBidError}</div>
        ) : null}
      </div>
      <div className="p-3">
        <div className="flex">
          <Input
            className="max-w-lg"
            placeholder="Address"
            onChange={(event) => setBidsQueryAddress(event.target.value)}
          />
          <Button
            type="primary"
            disabled={!bidsQueryAddress}
            onClick={getBids}
            loading={bidsLoading}
          >
            Query Bids
          </Button>
        </div>
        {bids.length > 0 && (
          <Table
            className="pt-5"
            pagination={{ defaultPageSize: 10 }}
            loading={bidsLoading}
            dataSource={bids?.map(
              (
                { _nftTokens, _blockMinted, _profileURI, _blockWait },
                index
              ) => ({
                key: index,
                _nftTokens: ethers.utils.formatEther(_nftTokens),
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
        )}
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
              _amount: ethers.utils.formatEther(_amount),
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
