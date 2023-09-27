import React, { useEffect, useState } from "react";
import useContract from "../hooks/useContract";

function ListCampaign() {
  const contract = useContract("0x46f44F2D1af04D54ab5BCbEF9F4D0Df9baDc1B8C", [
    {
      inputs: [{ internalType: "uint256", name: "_ID", type: "uint256" }],
      name: "campaignEnds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "contribute",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_ID", type: "uint256" }],
      name: "contributeEth",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "crowd",
      outputs: [
        { internalType: "string", name: "title", type: "string" },
        { internalType: "uint256", name: "fundingGoal", type: "uint256" },
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "uint256", name: "durationTime", type: "uint256" },
        { internalType: "bool", name: "isActive", type: "bool" },
        { internalType: "uint256", name: "fundingBalance", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "id",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_title", type: "string" },
        { internalType: "uint256", name: "_fundingGoal", type: "uint256" },
        { internalType: "uint256", name: "_durationTime", type: "uint256" },
      ],
      name: "proposeCampaign",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]);

  const [campaigns, setCampaigns] = useState([]);
  const [maxCampaignID, setMaxCampaignID] = useState(0);

  useEffect(() => {
    console.log("calling fetch", contract);
    if (!contract) return;

    const fetchCampaigns = async () => {
      try {
        // Get the maximum campaign ID
        const id = await contract.id();
        console.log(id, "id of campaigns");

        setMaxCampaignID(Number(id));

        // Create an array of promises to fetch campaigns
        const campaignPromises = [];
        for (let i = 0; i <= Number(id); i++) {
          campaignPromises.push(contract.crowd(i));
        }

        // Use Promise.all to fetch all campaigns in parallel
        const campaignResults = await Promise.all(campaignPromises);

        // Set the campaigns state with the results
        setCampaigns(campaignResults);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div>
      <h1>Campaigns</h1>
      <p>Maximum Campaign ID: {maxCampaignID}</p>
      <ul>
        {campaigns.map((campaign, index) => (
          <li key={index}>
            <strong>Campaign #{index}</strong>
            <ul>
              <li>Title: {campaign.title}</li>
              <li>Funding Goal: {campaign.fundingGoal} ETH</li>
              <li>Owner: {campaign.owner}</li>
              <li>Duration Time: {campaign.durationTime} seconds</li>
              <li>Is Active: {campaign.isActive ? "Yes" : "No"}</li>
              <li>Funding Balance: {campaign.fundingBalance} ETH</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListCampaign;
