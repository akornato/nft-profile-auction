import { useCallback, useEffect, useMemo, useState } from "react";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = "INVALID_INFURA_KEY";

const NETWORK = "rinkeby";

export const useWeb3Modal = () => {
  const [provider, setProvider] = useState<
    providers.Web3Provider | undefined
  >();
  const [autoLoaded, setAutoLoaded] = useState(false);

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = useMemo(
    () =>
      new Web3Modal({
        network: NETWORK,
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: INFURA_ID,
            },
          },
        },
      }),
    []
  );

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new providers.Web3Provider(newProvider));
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal]
  );

  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (!autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

  return { provider, loadWeb3Modal, logoutOfWeb3Modal };
};
