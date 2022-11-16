import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allFundTypes, raiserFundTypes } from "../../core/constants/base";
import { baseIconProp, baseIcons } from "../../core/constants/icons";
import { baseStyles } from "../../core/constants/style";
import { charityProp } from "../../core/interfaces/base";

export const FundRaiseForPage = () => {
    
  return (
    <div className="bg-alabaster">
        <div className="w-[95%] md:w-[80%] mx-auto py-100 lg:py-0">
            <p className="text-center text-38 font-bold">FundRaise for ...</p>
            <div className="my-40">
                <Grid container spacing={1}>
                {
                    raiserFundTypes.map((key, index:number) => {
                        const fundType = allFundTypes[key];
                        return (
                            <Grid item xs={12} sm={6} key={index}>
                            <div className="shadow-default m-5 p-20 bg-white rounded-10 cursor-pointer flex items-center">
                                <div className="text-20 capitalize mr-20">
                                    <p className="font-bold">{fundType.title}</p>
                                    <p>{fundType.detail}</p>
                                </div>
                                <img src={baseIcons[fundType.img]} className="w-100 h-100"/>
                            </div>
                            </Grid>
                        )
                    })
                }
                </Grid>
            </div>
        </div>
    </div>
  );
}
