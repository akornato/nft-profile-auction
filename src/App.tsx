import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { Contract } from "ethers";
import { Input, Table } from "antd";
import { WalletButton } from "./components/WalletButton";
import { useWeb3Modal } from "./hooks/useWeb3Modal";
import { addresses, abis } from "./contracts";
import { GET_NEW_BIDS } from "./queries/get-new-bids";

import type { BigNumber } from "ethers";
import type { ProfileAuction } from "./types";

type Bids = ([BigNumber, BigNumber, string, BigNumber] & {
  _nftTokens: BigNumber;
  _blockMinted: BigNumber;
  _profileURI: string;
  _blockWait: BigNumber;
})[];

function App() {
  const { loading, error, data } = useQuery(GET_NEW_BIDS);
  const { provider, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();
  const [profileAuction, setProfileAuction] = useState<ProfileAuction>();
  const [bids, setBids] = useState<Bids>();
  const [bidsLoading, setBidsLoading] = useState(false);

  useEffect(() => {
    if (!loading && !error) {
      console.log({ transfers: data?.transfers });
    }
  }, [loading, error, data]);

  useEffect(() => {
    const async = async () => {
      if (provider) {
        const profileAuction = new Contract(
          addresses.profileAuction,
          abis.profileAuction,
          provider
        ) as ProfileAuction;
        setProfileAuction(profileAuction);
      }
    };
    async();
  }, [provider]);

  const getBids = useCallback(
    async (address: string) => {
      setBidsLoading(true);
      const bids = await profileAuction?.getBids(address);
      setBids(bids);
      setBidsLoading(false);
    },
    [profileAuction]
  );

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
        <Input.Search
          className="max-w-lg"
          placeholder="Address"
          defaultValue="0x59495589849423692778a8c5aaca62ca80f875a4"
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
    </div>
  );
}

export default App;
