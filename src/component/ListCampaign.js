import React, { useEffect, useState } from "react";
import useContract from "../hooks/useContract";
import { data } from "../utils/abi";

function ListCampaign() {
  const contract = useContract(
    "0x46f44F2D1af04D54ab5BCbEF9F4D0Df9baDc1B8C",
    data
  );

  const [campaigns, setCampaigns] = useState([]);
  const [maxCampaignID, setMaxCampaignID] = useState(0);
  console.log(campaigns);

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
              <li>Funding Goal: {campaign.fundingGoal.toString()} ETH</li>
              <li>Owner: {campaign.owner}</li>
              <li>Duration Time: {campaign.durationTime.toString()} seconds</li>
              <li>Is Active: {campaign.isActive ? "Yes" : "No"}</li>
              <li>Funding Balance: {campaign.fundingBalance.toString()} ETH</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListCampaign;
