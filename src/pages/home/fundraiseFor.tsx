import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseIconProp, baseIcons } from "../../core/constants/icons";
import { baseStyles } from "../../core/constants/style";
import { charityProp } from "../../core/interfaces/base";

interface donatePurposeProp {
    title: string;
    detail: string;
    img: string;
}

export const FundRaiseForPage = () => {
  const donatePurposes: donatePurposeProp[] = [
    {
        title: 'Friends $ family',
        detail: 'We’ve talked quite a bit about all the different ways you can lend support and live generously.',
        img: 'family'
    },
    {
        title: 'Yourself',
        detail: 'We’ve talked quite a bit about all the different ways you can lend support and live generously.',
        img: 'yourself'
    },
    {
        title: 'Poor child Education',
        detail: 'We’ve talked quite a bit about all the different ways you can lend support and live generously.',
        img: 'education'
    },
    {
        title: 'Join our volunteers',
        detail: 'We’ve talked quite a bit about all the different ways you can lend support and live generously.',
        img: 'volunteer'
    }
  ];
  return (
    <div className="bg-alabaster">
        <div className="w-[95%] md:w-[80%] mx-auto my-100 lg:py-0">
        <p className="text-center text-38 font-bold">FundRaise for ...</p>
        <div className="my-40">
            <Grid container spacing={1}>
            {
                donatePurposes.map((purpose: donatePurposeProp, index:number) => {
                return (
                    <Grid item xs={12} sm={6} key={index}>
                    <div className="shadow-default m-5 p-20 hover:bg-white rounded-10 cursor-pointer flex items-center">
                        <div className="text-20 capitalize mr-20">
                        <p>{purpose.title}</p>
                        <p>{purpose.detail}</p>
                        </div>
                        <img src={baseIcons[purpose.img].img} />
                    </div>
                    </Grid>
                )
                })
            }
            </Grid>
        </div>
        <div className="flex justify-center">
            <button className={baseStyles.normalBtn}>
            Donate Now <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
        </div>
    </div>
  );
}
