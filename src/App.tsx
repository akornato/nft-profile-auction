import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { notification } from "antd";
import { ethers, Contract } from "ethers";
import { Button, Input, Table } from "antd";
import { WalletButton } from "./components/WalletButton";
import { useWeb3Modal } from "./hooks/useWeb3Modal";
import { addresses, abis } from "./contracts";
import { GET_BIDS_BY_USER, GET_ALL_BIDS } from "./queries/get-bids";

import type { BigNumber } from "ethers";
import type { ProfileAuction, NftToken } from "./types";
import type { GetAllBids } from "./types-gql/GetAllBids";
import type {
  GetBidsByUser,
  GetBidsByUserVariables,
} from "./types-gql/GetBidsByUser";

const { parseEther, formatEther } = ethers.utils;

function App() {
  const {
    provider,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    error: providerError,
  } = useWeb3Modal();
  const [account, setAccount] = useState<string>();
  const [nftToken, setNftToken] = useState<NftToken>();
  const [nftTokenBalance, setNftTokenBalance] = useState<string>();
  const [allowance, setAllowance] = useState<string>();
  const [newAllowance, setNewAllowance] = useState<string>();
  const [approveAllowanceLoading, setApproveAllowanceLoading] = useState(false);
  const [profileAuction, setProfileAuction] = useState<ProfileAuction>();
  const [nftTokenBid, setNftTokenBid] = useState<string>();
  const [profileUriBid, setProfileUriBid] = useState<string>();
  const [submitProfileBidLoading, setSubmitProfileBidLoading] = useState(false);
  const [bidsQueryAddress, setBidsQueryAddress] = useState<string>();
  const {
    loading: allBidsLoading,
    data: allBidsData,
    refetch: allBidsRefetch,
  } = useQuery<GetAllBids>(GET_ALL_BIDS, { skip: !!bidsQueryAddress });
  const {
    loading: bidsByUserLoading,
    data: bidsByUserData,
    refetch: bidsByUserRefetch,
  } = useQuery<GetBidsByUser, GetBidsByUserVariables>(GET_BIDS_BY_USER, {
    variables: { user: bidsQueryAddress },
    skip: !bidsQueryAddress,
  });
  const bidsLoading = allBidsLoading || bidsByUserLoading;
  const bids = (bidsQueryAddress ? bidsByUserData : allBidsData)?.bids || [];

  const newBidListener = useCallback(
    (_user: string, _val: string, _amount: BigNumber) => {
      notification.open({
        key: `${_user}|${_val}|${_amount}`,
        message: "New Bid",
        description: `User: ${_user} | Value: ${ethers.utils.formatEther(
          _amount
        )} NFT | Profile: ${_val}`,
      });
      allBidsRefetch();
      bidsByUserRefetch();
    },
    [allBidsRefetch, bidsByUserRefetch]
  );

  useEffect(() => {
    const async = async () => {
      if (provider) {
        const account = (await provider.listAccounts())[0];
        setAccount(account);
        const profileAuction = new Contract(
          addresses.profileAuction,
          abis.profileAuction,
          provider
        ) as ProfileAuction;
        setProfileAuction(profileAuction);
        profileAuction.on("NewBid", newBidListener);
        const nftToken = new Contract(
          addresses.nftToken,
          abis.nftToken,
          provider
        ) as NftToken;
        setNftToken(nftToken);
        const nftTokenBalance = await nftToken.balanceOf(account);
        setNftTokenBalance(formatEther(nftTokenBalance));
        const allowance = await nftToken.allowance(
          account,
          profileAuction.address
        );
        setAllowance(formatEther(allowance));
      }
    };
    async();
  }, [provider, newBidListener]);

  const approveAllowance = async () => {
    if (provider && nftToken && profileAuction) {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setApproveAllowanceLoading(true);
      try {
        const tx = await nftToken
          .connect(signer)
          .approve(profileAuction.address, parseEther(newAllowance || ""));
        await tx.wait();
        setAllowance(formatEther(parseEther(newAllowance || "")));
      } catch (e: any) {
        console.log(e.message);
      }
      setApproveAllowanceLoading(false);
    }
  };

  const submitProfileBid = async () => {
    if (provider && profileAuction) {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSubmitProfileBidLoading(true);
      try {
        const bids = await profileAuction?.getBids(account || "");
        if (bids.find(({ _profileURI }) => _profileURI === profileUriBid)) {
          notification.open({
            key: `${profileUriBid}`,
            message: `You already have a bid for "${profileUriBid}" profile.`,
          });
          setSubmitProfileBidLoading(false);
          return;
        }
        const tx = await profileAuction
          .connect(signer)
          .submitProfileBid(
            parseEther(nftTokenBid || ""),
            profileUriBid || "",
            { gasLimit: 300000 }
          );
        await tx.wait();
        setAllowance(
          formatEther(
            parseEther(allowance || "").sub(parseEther(nftTokenBid || ""))
          )
        );
      } catch (e: any) {
        console.log(e.message);
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
          {allowance && (
            <div className="pr-3 text-white">Allowance: {allowance}</div>
          )}
          {providerError && (
            <div className="pr-3 text-red-500">{providerError}</div>
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
        <div className="flex items-center pt-3">
          <Input
            className="max-w-sm"
            placeholder="NFT tokens"
            value={newAllowance}
            onChange={(event) => setNewAllowance(event.target.value)}
          />
          <Button
            type="primary"
            onClick={approveAllowance}
            disabled={!newAllowance}
            loading={approveAllowanceLoading}
          >
            Approve Allowance
          </Button>
        </div>
      </div>
      <div className="p-3">
        <div className="flex">
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
      </div>
      <div className="p-3">
        <Input
          className="max-w-lg"
          placeholder="User filter"
          onChange={(event) => setBidsQueryAddress(event.target.value)}
        />
      </div>
      <div className="p-3">
        <Table
          pagination={{ defaultPageSize: 10 }}
          loading={bidsLoading}
          dataSource={bids
            .map(({ id, blockNumber, user, amount, val }) => ({
              key: id,
              blockNumber,
              amount: formatEther(amount),
              user,
              val,
            }))
            .sort(({ blockNumber: a }, { blockNumber: b }) => b - a)}
        >
          <Table.Column title="Block #" dataIndex="blockNumber" />
          <Table.Column title="NFT tokens" dataIndex="amount" />
          <Table.Column title="User" dataIndex="user" />
          <Table.Column title="Profile" dataIndex="val" />
        </Table>
      </div>
    </div>
  );
}

export default App;
