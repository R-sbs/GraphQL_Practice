import { Loader } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div className="w-full h-full flex items-start justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};

export default Spinner;
