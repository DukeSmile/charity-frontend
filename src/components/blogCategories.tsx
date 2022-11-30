import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3'
import { blogFundTypes, allFundTypes } from '../core/constants/base';

export const BlogCategories = (props: any) => {
    
  const navigate = useNavigate();
  const allCategories = useSelector((state: any) => state.app.categories);
  return (
    <div className="my-20">
      <p className="text-24 font-bold">Blog Categories</p>
      {blogFundTypes.map((typeName, index) => {
        const fundType = allFundTypes[typeName]
        return (
          <div
            key={index}
            className="p-20 text-romance capitalize flex justify-between border-b-2 cursor-pointer hover:bg-alabaster"
            onClick={() => navigate('/filter/'+typeName)}
          >
            <label className="text-18 cursor-pointer">{fundType.title}</label>
            <div className="w-30 h-30 flex items-center justify-center bg-white border-1 rounded-full">
              {allCategories[typeName] ? allCategories[typeName].count : 0}
            </div>
          </div>
        )
      })}
    </div>
  )
}
