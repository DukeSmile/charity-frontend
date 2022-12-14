import {  Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faArrowRight, faCaretDown, faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
// import { FaLinkedin, FaTwitter, FaGoogle, FaFacebook, FaInstagram, FaPhoneAlt, FaNetworkWired, FaFlag, FaBook, FaRegistered, FaMapMarkedAlt, FaUser, FaBtc } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { charityProp } from "../../core/interfaces/base";
import { FilterCharity } from "../../components/info/filteredCharityInfo";
import donateImg from "../../assets/images/components/filter.png";
import leaveImg from "../../assets/images/components/leave.png";
import { allFundTypes, menuFundTypes } from "../../core/constants/base";
import { LeftLabelSwitch } from "./switches";

interface categoryProp {
  [key:string]: boolean
}

export const FilterCharitiesPage = () => {

  let { category } = useParams();
  let charities = useSelector((state: any) => state.app.allCharities);
  const [openBar, setOpenBar] = useState(false);
  const [showAllCategory, setShowAllCategory] = useState(false);
  const [filterCharity, setFilterCharity] = useState(true);
  const [filterFundraiser, setFilterFundraiser] = useState(true);
  const [filterNear, setFilterNear] = useState(true);
  const [filterCategories, setFilterCategories] = useState<categoryProp>({});
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const itemPerPage = 16;

  console.log(charities);

  if (filterCharity && filterFundraiser){
  }
  else if (filterCharity)
    charities = charities.filter((charity:any)  => charity.charity_type === 0);
  else if (filterFundraiser)
    charities = charities.filter((charity:any)  => charity.charity_type === 1);
  else
    charities = [];


  charities = charities.filter((charity:any)  => filterCategories[charity.fund_type] === true);
  const filterReset = () => {
    setShowAllCategory(false);
    setFilterCharity(true);
    setFilterFundraiser(true);
    setFilterNear(true);

    let filters:categoryProp = {};
    if(category !== undefined && category !== 'all')
      filters[category] = true;
    if (category === 'all') {
      Object.keys(allFundTypes).forEach((type:string, index:number) => {
        filters[allFundTypes[type].title] = true;
      });
    }
    setFilterCategories(filters);
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

  const pageDecrease = () => {
    if (page <= 0){
      setPage(0);
    }
    else
      setPage(page-1);
  }

  const pageIncrease = () => {
    if (page >= Math.ceil(charities.length / itemPerPage) - 1)
      setPage(Math.ceil(charities.length / itemPerPage) - 1);
    else
      setPage(page+1);
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
    
    if(category !== undefined && category !== 'all')
      filterCategories[category] = true;
    if (category === 'all') {
      Object.keys(allFundTypes).forEach((type:string, index:number) => {
        filterCategories[allFundTypes[type].title] = true;
      });
    }
    setFilterCategories(filterCategories);

    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  useEffect(() => {
    let filters:categoryProp = {};
    if(category !== undefined && category !== 'all')
      filters[category] = true;
    if (category === 'all') {
      Object.keys(allFundTypes).forEach((type:string, index:number) => {
        filters[allFundTypes[type].title] = true;
      });
    }
    setFilterCategories(filters);
    setShowAllCategory(false);
    setFilterCharity(true);
    setFilterFundraiser(true);
    setFilterNear(true);
  }, [category]);

  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-600 sm:h-450 flex items-end justify-between overflow-hidden">
        <img src={donateImg} className="w-175 h-110 ml-20 sm:w-350 sm:h-220" alt=""/>
        <img src={leaveImg} className="w-200 h-180 mr-20 md:w-400 md:h-360" alt=""/>
        <div className="absolute left-0 top-0 w-full h-full text-white text-center flex items-center justify-center">
          <div className="mt-170 mx-20">
            <p className="text-48 font-bold">Find your Fundraiser</p>
            <p className="text-20">Below are the charities and fundraisers looking for your help.</p>
            <p className="text-20">Please donate and make a difference.</p>
            <div className="h-70 bg-white rounded-full my-40 flex items-center justify-between">
              <div className="flex">
                <div className="text-black ml-35 flex items-center border-r-1 pr-10 cursor-pointer" onClick={() => setOpenBar(openBar === true ? false : true)}>
                  <FontAwesomeIcon icon={faSliders} className="mr-10 cursor-pointer"/>
                  <button className="w-60 flex justify-between items-center">
                    <span>Filter</span>
                    <FontAwesomeIcon icon={faCaretDown}/>
                  </button>
                </div>
                <div className="w-full ml-20">
                  <input type="text" placeholder="Search for Fundraisers" className="w-full text-16 text-black outline-none"/>
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
          <>
            <Grid container spacing={2}>
              {
                charities.map((charity: charityProp, index:number) => {
                  if (index >= itemPerPage * (page+1) || index < itemPerPage * page )
                    return <></>;
                  return (
                    <Grid xs={12} sm={6} md={4} lg={3} item key={charity.index}>
                      <FilterCharity info={charity}/>
                    </Grid>
                  )
                })
              }
            </Grid>
            <div className="text-20 flex flex-row-reverse">
              <div className="flex">
                <div className="p-5 hover:bg-alabaster cursor-pointer" onClick={pageDecrease}><FontAwesomeIcon icon={faCaretLeft}/></div>
                <input type="number" value={page} onChange={(e:any) => setPage(e.target.value)} className="w-50 border mx-10"/>
                <div className="p-5 hover:bg-alabaster cursor-pointer" onClick={pageIncrease}><FontAwesomeIcon icon={faCaretRight} /></div>
              </div>
            </div>
          </>
        )}
        {charities.length === 0 &&
          <div className="text-24 p-20">
            There is no charity & fundraiser matched on the filter options
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
              <Grid container spacing={3} className="pt-10 flex items-center">
                <Grid item xs={12} sm={4} md={3} className="flex items-center justify-center">
                  <div className="mr-20">
                    <p className="text-24 font-bold text-center">Close to Goal</p>
                    <p className="text-gunsmoke text-center">$50 or less needed</p>
                  </div>
                  <LeftLabelSwitch color="primary" className="w-100"/>
                </Grid>
                <Grid item xs={12} sm={4} md={3} className="flex items-center justify-center">
                  <label className="text-24 font-bold mr-20">Near you</label>
                  <LeftLabelSwitch color="primary" className="w-100" checked={filterNear} onClick={() => setFilterNear(!filterNear)}/>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <div className="flex items-center justify-center">
                    <label className="text-24 font-bold w-140">Charity</label>
                    <LeftLabelSwitch color="primary" className="w-100" checked={filterCharity} onClick={() => setFilterCharity(!filterCharity)}/>
                  </div>
                  <div className="flex items-center justify-center">
                    <label className="text-24 font-bold w-140">Fundraiser</label>
                    <LeftLabelSwitch color="primary" className="w-100" checked={filterFundraiser} onClick={() => setFilterFundraiser(!filterFundraiser)}/>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={2} className="flex items-center flex-row-reverse">
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