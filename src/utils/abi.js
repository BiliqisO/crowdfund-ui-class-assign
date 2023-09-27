export const data = [
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
];
