import { createContext, useContext, useEffect, useState } from "react";
import { getReadOnlyProvider, isSupportedChain } from "../utils";
import { networkInfoMap } from "../constants";
import { ethers } from "ethers";

const Connection = createContext();

const ConnectionProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const [isActive, setIsActive] = useState(false);
  const [provider, setProvider] = useState(getReadOnlyProvider());
  const [signer, setSigner] = useState();

  const connect = async () => {
    if (window.ethereum === undefined)
      return alert("not an ethereum-enabled browser");
    try {
      return window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleAccountChanged = async (accounts) => {
    if (!accounts.length) {
      setAccount(undefined);
      setChainId(undefined);
      setIsActive(false);
      return setProvider(getReadOnlyProvider());
    }
    const chain = await window.ethereum.request({
      method: "eth_chainId",
    });

    setAccount(accounts[0]);
    setChainId(Number(chain));
    if (isSupportedChain(chain)) {
      setIsActive(true);
      setProvider(new ethers.BrowserProvider(window.ethereum));
    } else {
      setProvider();
      setIsActive(false);
      setProvider(getReadOnlyProvider());
      setSigner(
        provider.getSigner("0x46f44F2D1af04D54ab5BCbEF9F4D0Df9baDc1B8C")
      );
    }
  };

  const handleChainChanged = (chain) => {
    setChainId(Number(chain));
    if (isSupportedChain(chain)) {
      setIsActive(true);
      setProvider(new ethers.BrowserProvider(window.ethereum));
      setSigner(
        provider.getSigner("0x46f44F2D1af04D54ab5BCbEF9F4D0Df9baDc1B8C")
      );
    } else {
      setIsActive(false);
      setProvider(getReadOnlyProvider());
    }
  };

  const eagerlyConnect = async () => {
    if (window.ethereum === undefined) return;
    const accounts = await window?.ethereum?.request({
      method: "eth_accounts",
    });

    if (!accounts.length) return;

    handleAccountChanged(accounts);
  };

  useEffect(() => {
    if (window.ethereum === undefined) return;
    eagerlyConnect();

    window.ethereum.on("chainChanged", handleChainChanged);

    window.ethereum.on("accountsChanged", handleAccountChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountChanged);

      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const switchToChain = async (chain) => {
    if (!isSupportedChain(chain))
      return alert("attempt to switch to a wrong chain!");
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chain.toString(16)}` }],
      });
    } catch (error) {
      if (error.code === 4902 || error.code === -32603) {
        const chainInfo = networkInfoMap[chain];
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chainInfo],
          });
        } catch (addError) {
          alert("you rejected network addition!");
        }
      }
    }
  };

  return (
    <Connection.Provider
      value={{
        account,
        chainId,
        isActive,
        provider,
        signer,
        connect,
        switchToChain,
      }}
    >
      {children}
    </Connection.Provider>
  );
};

export const useConnection = () => useContext(Connection);

export default ConnectionProvider;
