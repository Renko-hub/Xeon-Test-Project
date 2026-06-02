import { useState } from "react";

const useTab = (initial = "info") => {
  const [tab, setTab] = useState(initial);
  return {
    isInfo: tab === "info",
    isTools: tab === "tools",
    setInfo: () => setTab("info"),
    setTools: () => setTab("tools"),
  };
};

export default useTab;
