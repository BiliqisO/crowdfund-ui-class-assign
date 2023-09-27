import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { ethers } from "ethers";

const useContract = (contractAddress, abi) => {
  const [contract, setContract] = useState(null);
  const { provider, signer } = useConnection();

  useEffect(() => {
    if (!contractAddress || !abi || !provider) return;

    const newContract = new ethers.Contract(contractAddress, abi, provider);

    setContract(newContract);
  }, []);

  return contract;
};

export default useContract;
