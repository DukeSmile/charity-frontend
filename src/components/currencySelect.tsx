import { makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import { MenuProps as MenuPropsType } from "@material-ui/core/Menu";
import { useState } from "react";

import { FromNetwork, tokenList } from "../networks";

export const CurrencySelect = (props: any) => {
  const selectMenuProps: Partial<MenuPropsType> = {
    variant: 'menu',
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "left" },
    getContentAnchorEl: null,
  };
  const optionStyle = 'flex justify-between items-center text-center w-full text-black text-18 font-medium border-1 border-limedSqruce py-5 px-10 pr-60';
  return (
    <div>
      <p className="text-24 font-bold">Enter your donation</p>
      <div className="flex items-center">
        <TextField id="outlined-basic" 
            variant="outlined" 
            size="small" 
            type="number" 
            style={{ width: '100%' }} 
            value={props.amount}
            onChange={props.updateAmount}
            autoComplete='off'
        />
        <Select onChange={props.onChange} id="bsc-season" className="p-0 text-black" value={props.currency} MenuProps={selectMenuProps} disableUnderline>
          {
            tokenList.map((token, index:number) => {
              return <MenuItem value={index} key={index}>
                <div className={optionStyle}>
                  <div className="flex items-center">
                    <img src={token.img} className="w-30 h-30" alt={token.name}/>
                    <p className="mx-5">{token.name}</p>
                  </div>
                </div>
              </MenuItem>;
            })
          }
        </Select>
      </div>
    </div>
  );
};