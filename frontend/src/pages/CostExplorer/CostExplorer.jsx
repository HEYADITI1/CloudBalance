import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";
import CostExplorerContainer from "./components/CostExplorerContainer";
import { useState } from "react";

export default function CostExplorer() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <main className="flex-1 px-6 py-6 flex">
        <div className="flex gap-6 w-full">
          <Sidebar selected="cost-explorer" collapsed={collapsed} />

          <div className="flex-1 max-w-[calc(100vw-330px)]">
            <CostExplorerContainer />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
