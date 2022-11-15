import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseIconProp, baseIcons } from "../../core/constants/icons";
import { baseStyles } from "../../core/constants/style";
import { charityProp } from "../../core/interfaces/base";

export const FeaturesOfCharity = () => {
  const donateTypes = ['health','education','environmental','animal'];
  return (
    <div className="w-[95%] md:w-[80%] mx-auto my-100 lg:py-0">
      <p className="text-center text-38 font-bold">Featured Charities</p>
      <div className="my-40">
        <Grid container spacing={1}>
          {
            donateTypes.map((type, index:number) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                  <div className="shadow-default mx-10 p-10 hover:bg-iron rounded-10 cursor-pointer flex items-center">
                    <img src={baseIcons[type].img} />
                    <div className="text-20 capitalize ml-20">
                      <p>{type}</p>
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
  const donateTypes = ['health','education','environmental','animal'];
  const charities = useSelector((state:any) => state.app.charities);

  return (
    <div className="w-[95%] md:w-[80%] mx-auto my-100 lg:py-0">
      <div className="text-38 font-bold flex justify-between">
        <label>Featured Charities</label>
        <button className="px-20 py-15 text-16 text-white bg-green border-1 border-black rounded-full hover:text-brown mr-30">
          Donate Now <FontAwesomeIcon icon={faArrowRight} />
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
  );
}