import React, { useEffect, useState } from "react";
import {FaTrash} from 'react-icons/fa'

import Image from "next/image";
import { v4 } from "uuid";

interface ConsoleSectionProps {}

interface consolefeed {
  type: string;
  msg: string;
  line?: number;
}

const ConsoleSection: React.FC<ConsoleSectionProps> = ({}) => {
  const [consoleFeed, setConsoleFeed] = useState<consolefeed[]>([]);

  

  useEffect(() => {
    // setConsoleFeed(() => [])
    window.addEventListener("message", (e) => {
      const data = e.data;
      if (data.type === "log") {
        setConsoleFeed((prev) => [
          ...prev,
          { type: "log", msg: data.args },
        ]);
      }else if (data.type === "error") {
        setConsoleFeed((prev) => [
          ...prev,
          { type: "error", msg: `${data.args}` },
        ]);
      }
    });

  }, []);

  return (<>
    <div className=" bg-black flex items-center pl-8">
    <p>Console</p>
    <FaTrash
    onClick={() => {setConsoleFeed([])}}
    className="cursor-pointer ml-5"
                    
  /> 
  {/* <Image src="/trash.svg" width="20px" height="20px" /> */}
  </div>
    <div className="h-full text-black px-3 pt-3">
      {
          consoleFeed.map((feed) => <><p key={v4()} className={ feed.type === "error" ? "text-red-600" : "text-white"}>{feed.msg}</p> <hr /></>)
      }
    </div>
    </>
  );
};

export default ConsoleSection;
