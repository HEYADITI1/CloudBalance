import React, { useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";

import IamRoleCreation from "./component/IamRoleCreation";
import OnboardingButton from "./component/OnboardingButton";
import PolicyManagement from "./component/PolicyManagement";
import CUR from "./component/CUR";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCloudAccount } from "../../api/cloudAccountApi";

export default function Onboarding() {
  const [page, setPage] = useState(1);
  const [account, setAccount] = useState({});

  const navigate = useNavigate();

  const changePage = (e) => {
  const { name } = e.target;

  if (name === "next" && page === 1 && !isStepOneValid) {
    toast.error("Please fill all account details first");
    return;
  }

  if (name === "next") setPage((p) => p + 1);
  if (name === "prev") setPage((p) => p - 1);
};


  const isStepOneValid =
    account?.arn?.trim() &&
    account?.accountId?.trim() &&
    account?.accountName?.trim();

  const handleSubmit = async () => {
    try {
      await createCloudAccount(account);
      toast.success("Account created successfully");
    } catch (err) {
      toast.error("Failed to create account");
      console.log(err);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 p-6 pb-24">
        <div className="flex gap-6 h-full">
          <div className="h-[calc(100vh-124px)]">
            <Sidebar selected="client-onboarding" />
          </div>
          <div className="flex-1 bg-white border border-gray-200 rounded-md p-6 overflow-y-auto">
            {page === 1 && (
              <IamRoleCreation account={account} setAccount={setAccount} />
            )}

            {page === 2 && <PolicyManagement />}

            {page === 3 && <CUR />}

            <div className="pt-10 flex justify-between">
              <OnboardingButton
                label="Prev"
                disabled={page === 1}
                name="prev"
                clickFunction={changePage}
              />

              {page !== 3 && (
                <OnboardingButton
                  label="Next"
                  name="next"
                  clickFunction={changePage}
                  disabled={page === 1 && !isStepOneValid}
                />
              )}

              {page === 3 && (
                <OnboardingButton
                  label="Submit"
                  name="submit"
                  clickFunction={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
