import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { charityProp } from "../../core/interfaces/base";
import { FaBook, FaBtc, FaFlag, FaGoogle, FaMapMarkedAlt, FaUser } from "react-icons/fa";
import { FundraiserInfo } from "../../components/info/fundraiserInfo";
import donateImg from "../../assets/images/components/filter.png";
import leaveImg from "../../assets/images/components/leave.png";

export const FundRaisersPage = () => {

  const [page, setPage] = useState(0);
  const fundRaisers = useSelector( (state:any) => state.app.fundRaisers);
  const itemPerPage = 16;

  const pageDecrease = () => {
    if (page <= 0){
      setPage(0);
    }
    else
      setPage(page-1);
  }

  const pageIncrease = () => {
    if (page >= Math.ceil(fundRaisers.length / itemPerPage) - 1)
      setPage(Math.ceil(fundRaisers.length / itemPerPage) - 1);
    else
      setPage(page+1);
  }

  useEffect(() => {
    window.scrollTo(0,0);
  },[]);

  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-200 flex items-end justify-between overflow-hidden">
        <img src={donateImg} className="w-175 h-110 ml-20 sm:w-350 sm:h-220"/>
        <img src={leaveImg} className="w-200 h-180 mr-20 md:w-400 md:h-360"/>
        <div className="absolute left-0 top-0 w-full h-full text-white text-center flex items-center justify-center">
          <div className="mt-100 mx-20">
            <p className="text-48 font-bold">All Fundraisers</p>
          </div>
        </div>
      </div>
      <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70 p-20">
        <Grid container spacing={2}>
          <Grid item xs={12} className="text-24 font-bold text-center">FundRaisers</Grid> 
          {
            fundRaisers.map((charity:charityProp, index:number) => {
              if (index >= itemPerPage * (page+1) || index < itemPerPage * page )
                return <></>;
              return (
                <Grid xs={12} sm={6} md={4} lg={3} item key={charity.index}>
                  <FundraiserInfo info={charity} />
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
      </div>
    </div>
  );
}