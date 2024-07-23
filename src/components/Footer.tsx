import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectLatestEntry } from "../store/leaderboardSlice";

import FooterImg from "../assets/footerImg.png";

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
    useSelector(selectLatestEntry);

  useEffect(() => {
    const footer = footerRef.current;
    let scrollAmount = 0;

    const scrollFooter = () => {
      if (footer) {
        footer.scrollLeft = scrollAmount;
        scrollAmount += 1;
        if (scrollAmount >= footer.scrollWidth - footer.clientWidth) {
          scrollAmount = 0;
        }
      }
    };

    const interval = setInterval(scrollFooter, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={footerRef} className="">
      <img src={FooterImg} alt="footerImg" className="" />
      <div className="flex justify-center text-[12px] sm:text-[16px] items-center p-2 text-slate-300 bg-[#181818] ">
        <span>Footer: Disclaimers/ Announcements/ etc</span>
      </div>
    </div>
  );
};

export default Footer;
