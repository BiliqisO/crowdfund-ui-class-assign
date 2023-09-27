import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import useContract from "../hooks/useContract";

const CreateCampaign = () => {
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
  let [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const createCampaign = async () => {
    try {
      if (!contract) return;
      console.log("I was clicked");
      // Replace with the actual values from your form
      const tx = await contract.proposeCampaign(title, goal, duration);

      // Wait for the transaction to be mined
      await tx.wait();

      setSuccessMessage("Campaign created successfully!");
      setErrorMessage("");
      closeModal();
      console.log("success");
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Error creating campaign: ${error.message}`);
      closeModal();
    }
  };
  return (
    <Fragment>
      <button
        onClick={openModal}
        className="w-[fit-content] block rounded-md mx-auto bg-blue-400 px-4 py-4 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Create a Campaign
      </button>

      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Campaign
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequuntur, numquam.
                    </p>
                  </div>
                  <form
                    onSubmit={createCampaign}
                    className="mt-4 space-y-4"
                  >
                    <div className="flex flex-col">
                      <label className="font-bold">Title</label>
                      <input
                        type="text"
                        className="outline-0 py-2 px-1 rounded-lg mt-2 border border-blue-400"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-bold">Goal</label>
                      <input
                        type="text"
                        className="outline-0 py-2 px-1 rounded-lg mt-2 border border-blue-400"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-bold">Duration(Minutes)</label>
                      <input
                        type="number"
                        className="outline-0 py-2 px-1 rounded-lg mt-2 border border-blue-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="cursor-pointer w-full rounded-md bg-blue-400 p-3 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-center"
                    >
                      Create Campaign
                    </button>
                    {successMessage && (
                      <p className="text-green-600">{successMessage}</p>
                    )}
                    {errorMessage && (
                      <p className="text-red-600">{errorMessage}</p>
                    )}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default CreateCampaign;
