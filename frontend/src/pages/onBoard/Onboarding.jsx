import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";
import React, { useState } from "react";
import IamRoleCreation from "./component/IamRoleCreation";
import OnboardingButton from "./component/OnboardingButton";
import PolicyManagement from "./component/PolicyManagement";
import CUR from "./component/CUR";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCloudAccount } from "../../api/cloudAccountApi";

const Onboarding = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const[account, setAccount] = useState({});

  const changePage = (e) => {
    const { name } = e.target;
    if (name == "next") setPage((p) => p + 1);
    if (name == "prev") setPage((p) => p - 1);
  };

  const handleSubmit = async (e) => {
    try{
      const response = await createCloudAccount(account);
      toast.success("Account creaetd successfully")
      navigate("/costExplorer");
    }catch(err){
      toast.error("Failed to create account");
      console.log(err);
    } gyyt
  };

  return (
    <>
      <div className="p-9 h-[85vh] overflow-y-scroll">
        {(page == 1) && <IamRoleCreation account={account} setAccount={setAccount}/>}
        {(page == 2) && <PolicyManagement />}
        {(page == 3) && <CUR />}

        <div className=" pt-10 flex justify-between">
          <OnboardingButton label={"Prev"} disabled={page==1} name={"prev"} clickFunction={changePage}/>
          {(page != 3) && <OnboardingButton label={"Next"} name={"next"} clickFunction={changePage}/>}
          {(page ==3) && <OnboardingButton label={"Submit"} name={"submit"} clickFunction={handleSubmit}/>}
        </div>
      </div>
    </>
  );
};

export default Onboarding;
