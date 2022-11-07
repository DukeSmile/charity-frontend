import { aboutStrs } from "../core/constants/base";

export const AboutPage = () => {

  return (
    <div>
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
  )
}