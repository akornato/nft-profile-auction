import { useEffect, useState } from "react";
import { providers } from "ethers";
import { Button } from "antd";

type Props = {
  provider?: providers.Web3Provider;
  account?: string;
  loadWeb3Modal: Function;
  logoutOfWeb3Modal: Function;
};

export const WalletButton = ({
  provider,
  account,
  loadWeb3Modal,
  logoutOfWeb3Modal,
}: Props) => {
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    async function fetchAccount() {
      try {
        if (!provider || !account) {
          return;
        }
        // Resolve the ENS name for the first account.
        const name = await provider.lookupAddress(account);

        // Render either the ENS name or the shortened account address.
        if (name) {
          setRendered(name);
        } else {
          setRendered(account.substring(0, 6) + "..." + account.substring(36));
        }
      } catch (err) {
        setRendered("");
        console.error(err);
      }
    }
    fetchAccount();
  }, [account, provider, setRendered]);

  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
};
