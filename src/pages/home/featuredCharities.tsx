import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { allFundTypes } from "../../core/constants/base";
import { baseIconProp, baseIcons } from "../../core/constants/icons";
import { baseStyles } from "../../core/constants/style";
import { charityProp } from "../../core/interfaces/base";

export const FeaturesOfCharity = () => {
  return (
    <div className="w-[95%] md:w-[80%] mx-auto my-100 lg:py-0">
      <p className="text-center text-38 font-bold">Featured Charities</p>
      <div className="my-40">
        <Grid container spacing={1}>
          {
            Object.keys(allFundTypes).map((key, index:number) => {
              const fundType = allFundTypes[key];
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                  <div className="shadow-default mx-10 p-10 hover:bg-iron rounded-10 cursor-pointer flex items-center">
                    <img src={baseIcons[fundType.img]} />
                    <div className="text-20 capitalize ml-20">
                      <p>{fundType.title}</p>
                      <p>Charities</p>
                    </div>
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
  );
}

export const FeaturedCharities = () => {
  const charities = useSelector((state:any) => state.app.charities);
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
              charities.map((charity:charityProp) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={charity.index} >
                    <div className="shadow-default m-10 rounded-10 cursor-pointer">
                      <img src={"https://ipfs.io/ipfs/" + charity.catalog.photo} alt={charity.catalog.name} className="rounded-t-10 h-250 w-full"/>
                      <div className="p-10 md:p-20">
                        <div className="font-bold text-24">{charity.catalog.name}</div>
                        <div className="flex h-50 overflow-hidden text-16 my-15">
                          {charity.catalog.summary}
                        </div>
                        <div className="py-15">
                          <Link to={`/donate/${charity.index}`} className={baseStyles.brownBtn}>Donate now</Link>
                        </div>
                      </div>
                    </div>
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

export const LastFundRaisers = () => {
  const donateTypes = ['health','education','environmental','animal'];
  const allCharities = useSelector((state:any) => state.app.allCharities);
  const fundRaisers = allCharities.slice(allCharities.length-3, allCharities.length);
  return (
    <div className="w-[95%] md:w-[80%] mx-auto py-100">
      <div className="text-38 font-bold flex justify-between">
        <label>Last News</label>
        <div>
          <button className={baseStyles.normalBtn + ' hover:bg-green mr-20'}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className={baseStyles.normalBtn + ' hover:bg-green mr-20'}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className="my-40">
        <Grid container spacing={1}>
          {
            fundRaisers.map((charity:charityProp) => {
              return (
                <Grid item xs={12} sm={6} md={6} lg={4} key={charity.index} >
                  <div className="shadow-default m-10 rounded-10 cursor-pointer">
                    <img src={"https://ipfs.io/ipfs/" + charity.catalog.photo} alt={charity.catalog.name} className="rounded-t-10 h-250 w-full"/>
                    <div className="p-10">
                      <div className="flex h-60 overflow-hidden text-22 font-bold">
                        {charity.catalog.summary}
                      </div>
                      <hr></hr>
                      <div className="py-15">
                        <button className={baseStyles.brownBtn + ' mr-20 font-bold'}>Read More</button>
                        <Link to={`/donate/${charity.index}`} className={baseStyles.brownBtn}>Donate now</Link>
                      </div>
                    </div>
                  </div>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
      <div className="flex justify-center">
      </div>
    </div>
  );
}