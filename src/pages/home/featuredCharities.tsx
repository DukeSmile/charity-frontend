import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CharityInfo } from "../../components/charityInfo";
import { FundraiserInfo } from "../../components/fundraiserInfo";
import { allFundTypes } from "../../core/constants/base";
import { baseIconProp, baseIcons } from "../../core/constants/icons";
import { baseStyles } from "../../core/constants/style";
import { charityProp } from "../../core/interfaces/base";

export const FeaturedCategories = () => {

  const navigate = useNavigate();
  const allCategories = useSelector((state:any) => state.app.categories);

  return (
    <div className="w-[95%] md:w-[80%] mx-auto my-100 lg:py-0">
      <p className="text-center text-38 font-bold">Categories</p>
      <div className="my-40">
        <Grid container spacing={1}>
          {
            Object.keys(allFundTypes).map((key, index:number) => {
              const category = allFundTypes[key];
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                  <div className="shadow-default mx-10 p-10 hover:bg-iron rounded-10 cursor-pointer flex items-center"
                    onClick={() => navigate('/filter/'+key)}>
                    <img src={baseIcons[category.img]} className="w-60 h-60"/>
                    <div className="text-20 capitalize ml-20">
                      <p>{category.title}</p>
                      <p>{category.type}</p>
                    </div>
                  </div>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    </div>
  );
}

export const FeaturedCharities = () => {
  const allCharities = useSelector((state:any) => state.app.charities);
  let startPos = allCharities.length - 3;
  startPos = startPos < 0 ? 0 : startPos;
  const charities = allCharities.slice(startPos, allCharities.length);
  const navigate = useNavigate();
  return (
    <div className="bg-alabaster">
      <div className="w-[95%] md:w-[80%] mx-auto py-100">
        <div className="text-38 font-bold flex justify-between">
          <label>Featured Charities</label>
          <button className="px-20 py-15 text-16 text-white bg-green border-1 border-black rounded-full hover:text-brown mr-30"
            onClick={() => navigate('/charities')}  
          >
            All Charities <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <div className="my-40">
          <Grid container spacing={1}>
            {
              charities.map((charity:charityProp, index:number) => {
                return (
                  <Grid xs={12} sm={6} md={6} lg={4} item key={charity.index}>
                    <CharityInfo info={charity} key={index}/>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
        <div className="flex justify-center">
        </div>
      </div>
    </div>
  );
}

export const FeaturedFundRaisers = () => {
  const donateTypes = ['health','education','environmental','animal'];
  const navigate = useNavigate();
  const allFundraisers = useSelector((state:any) => state.app.fundRaisers);
  let startPos = allFundraisers.length - 3;
  startPos = startPos < 0 ? 0 : startPos;
  const fundRaisers = allFundraisers.slice(startPos, allFundraisers.length);
  return (
    <div className="w-[95%] md:w-[80%] mx-auto py-100">
      <div className="text-38 font-bold flex justify-between">
        <label>Featured FundRaisers</label>
        <button className="px-20 py-15 text-16 text-white bg-green border-1 border-black rounded-full hover:text-brown mr-30"
          onClick={() => navigate('/fundraisers')}  
        >
          All FundRaisers <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className="my-40">
        <Grid container spacing={1}>
          {
            fundRaisers.map((charity:charityProp, index:number) => {
              return (
                <Grid xs={12} sm={6} md={6} lg={4} item key={charity.index}>
                  <FundraiserInfo info={charity}/>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    </div>
  );
}