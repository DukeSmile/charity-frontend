import { useEffect } from "react";
import { aboutStrs } from "../core/constants/base";

export const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-200 flex items-end justify-between overflow-hidden">
      </div>
      <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70">
        <div className="m-15">
          <p className="font-bold text-center text-24">Decentralized Donation Application</p>
          {
            aboutStrs.map((str: string, index: number) => {
              return (
                <p key={index} className="text-20 my-10">
                  {str}
                </p>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}