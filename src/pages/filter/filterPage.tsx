import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCaretDown, faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FaLinkedin, FaTwitter, FaGoogle, FaFacebook, FaInstagram, FaPhoneAlt, FaNetworkWired, FaFlag, FaBook, FaRegistered, FaMapMarkedAlt, FaUser, FaBtc } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { charityProp } from "../../core/interfaces/base";
import { useWeb3Context } from "../../hooks/web3Context";
import { FilterCharity } from "../../components/info/filteredCharityInfo";
import donateImg from "../../assets/images/components/filter.png";
import leaveImg from "../../assets/images/components/leave.png";
import { allFundTypes, menuFundTypes } from "../../core/constants/base";
import { LeftLabelSwitch } from "./switches";
import { boolean } from "yup";

interface categoryProp {
  [key:string]: boolean
}

export const FilterCharitiesPage = () => {

  let { category } = useParams();
  const dispatch = useDispatch();
  let charities = useSelector((state: any) => state.app.allCharities);
  const isOwner = useSelector((state: any) => state.app.isOwner);
  const { connected, address } = useWeb3Context();
  const [openBar, setOpenBar] = useState(false);
  const [showAllCategory, setShowAllCategory] = useState(false);
  const [filterCharity, setFilterCharity] = useState(true);
  const [filterFundraiser, setFilterFundraiser] = useState(true);
  const [filterNear, setFilterNear] = useState(true);
  const [filterCategories, setFilterCategories] = useState<categoryProp>({});
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const style = {
    btn: 'border-2 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
  };

  if (category !== 'all') {
    charities = charities.filter((charity:any)  => filterCategories[charity.contract.donateType] === true);
  }
  if (filterCharity && filterFundraiser){
    
  }
  else if (filterCharity)
    charities = charities.filter((charity:any)  => charity.charity_type == 0);
  if (filterFundraiser)
    charities = charities.filter((charity:any)  => charity.charity_type == 1);
  else
    charities = [];

  const filterReset = () => {
    setShowAllCategory(false);
    setFilterCharity(true);
    setFilterFundraiser(true);
    setFilterNear(true);
    setFilterCategories({});
  }

  // const filterStart = () => {
  //   setOpenBar(false);
  //   setCount(count+1);
  // }

  const searchCategory = (category: string) => {
    if (filterCategories[category])
      filterCategories[category] = false;
    else
      filterCategories[category] = true;
    setFilterCategories(filterCategories);
    setCount(count+1);
  }

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setOpenBar(false);
    };
    window.scrollTo(0,0);
    
    if(category != undefined)
      filterCategories[category] = true;
    setFilterCategories(filterCategories);

    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-600 sm:h-450 flex items-end justify-between overflow-hidden">
        <img src={donateImg} className="w-175 h-110 ml-20 sm:w-350 sm:h-220"/>
        <img src={leaveImg} className="w-200 h-180 mr-20 md:w-400 md:h-360"/>
        <div className="absolute left-0 top-0 w-full h-full text-white text-center flex items-center justify-center">
          <div className="mt-170 mx-20">
            <p className="text-48 font-bold">Find your resource</p>
            <p className="text-20">Quisque dignissim maximus ipsum, sed rutrum metus tincidunt et.</p>
            <p className="text-20">Sed eget tincidunt ipsum. Quisque dignissim maximus ipsum</p>
            <div className="h-70 bg-white rounded-full my-40 flex items-center justify-between">
              <div className="flex">
                <div className="text-black ml-35 flex items-center border-r-1 pr-10 cursor-pointer" onClick={() => setOpenBar(openBar == true ? false : true)}>
                  <FontAwesomeIcon icon={faSliders} className="mr-10 cursor-pointer"/>
                  <button className="w-60 flex justify-between items-center">
                    <span>Filter</span>
                    <FontAwesomeIcon icon={faCaretDown}/>
                  </button>
                </div>
                <div className="w-full ml-20">
                  <input type="text" placeholder="Search for Fundraise" className="w-full text-16 text-black outline-none"/>
                </div>
              </div>
              <div className="w-55 min-w-55 h-55 flex items-center justify-center bg-algae text-white rounded-full mr-10">
                <FontAwesomeIcon icon={faSearch} className="text-16"/>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <div className="relative w-[95%] md:w-[80%] mx-auto border-1 my-70">
        {charities.length > 0 && (
          <Grid container spacing={2}>
            {
              charities.map((charity: charityProp, index:number) => {
                return (
                  <Grid xs={12} sm={6} md={4} lg={3} item key={charity.index}>
                    <FilterCharity info={charity}/>
                  </Grid>
                )
              })
            }
          </Grid>
        )}
        {charities.length === 0 &&
          <div className="text-24 p-20">
            There is no charity & fundraiser on this <label className="font-bold text-black">{category}</label> category
          </div>
        }
        
        {openBar && (
          <div className="absolute w-full -top-100">
            <div className="w-[80%] mx-auto p-20 rounded-10 border bg-white text-16 shadow-default" ref={ref}>
              <Grid container className="border-b-1 pb-10" spacing={3}>
                <Grid item xs={12} sm={3}>
                  <p className="text-24 font-bold text-center">Fundraiser purpose</p>
                  <p className="text-gunsmoke text-center">Choose one or more</p>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <div className="flex flex-wrap">
                  {!showAllCategory && (
                    <>
                      {
                        menuFundTypes.map((type:string, index:number) => {
                          const active = filterCategories[allFundTypes[type].title] ? 'bg-green' : '';
                          return (
                            <div key={index} 
                              className={"p-5 px-10 m-5 rounded-full border cursor-pointer capitalize " + active}
                              onClick={() => searchCategory(allFundTypes[type].title)}
                            >
                              {allFundTypes[type].title}
                            </div>                      
                          )
                      })
                      }
                      <div className="p-5 px-10 m-5 font-bold cursor-pointer" onClick={() => setShowAllCategory(true)}>
                        See More <FontAwesomeIcon icon={faArrowRight} />
                      </div> 
                    </>
                  )}
                  {showAllCategory && (
                    <>
                      {
                        Object.keys(allFundTypes).map((type:string, index:number) => {
                          const active = filterCategories[allFundTypes[type].title] ? 'bg-green' : '';
                          return (
                            <div key={index}
                              className={"p-5 px-10 m-5 rounded-full border cursor-pointer capitalize " + active}
                              onClick={() => searchCategory(allFundTypes[type].title)}
                            >
                              {allFundTypes[type].title}
                            </div>                      
                          )
                        })
                      }
                      <div className="p-5 px-10 m-5 font-bold cursor-pointer" onClick={() => setShowAllCategory(false)}>
                        Less show <FontAwesomeIcon icon={faArrowRight} />
                      </div> 
                    </>
                  )}
                  </div>
                </Grid>
              </Grid>
              <Grid container className="pt-10" spacing={3}>
                <Grid item xs={12} sm={3} className="flex items-center">
                  <div className="mr-20">
                    <p className="text-24 font-bold text-center">Close to Goal</p>
                    <p className="text-gunsmoke text-center">$50 or less needed</p>
                  </div>
                  <LeftLabelSwitch color="primary" className="w-100"/>
                </Grid>
                <Grid item xs={12} sm={3} className="flex items-center">
                  <label className="text-24 font-bold mr-20">Near you</label>
                  <LeftLabelSwitch color="primary" className="w-100" checked={filterNear} onClick={() => setFilterNear(!filterNear)}/>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <div className="flex items-center">
                    <label className="text-24 font-bold w-140">Charity</label>
                    <LeftLabelSwitch color="primary" className="w-100" checked={filterCharity} onClick={() => setFilterCharity(!filterCharity)}/>
                  </div>
                  <div className="flex items-center">
                    <label className="text-24 font-bold w-140">Fundraiser</label>
                    <LeftLabelSwitch color="primary" className="w-100" checked={filterFundraiser} onClick={() => setFilterFundraiser(!filterFundraiser)}/>
                  </div>
                </Grid>
                <Grid item xs={12} sm={3} className="flex items-center">
                  <button className="p-10 px-20 m-5 bg-iron font-bold cursor-pointer border rounded-full" onClick={filterReset}>
                    Reset
                  </button>
                  {/* <button className="p-10 px-20 m-5 bg-iron font-bold cursor-pointer border rounded-full" onClick={filterStart}>
                    Search
                  </button> */}
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}