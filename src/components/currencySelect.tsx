import { MenuItem, Select, TextField } from "@material-ui/core";
import { MenuProps as MenuPropsType } from "@material-ui/core/Menu";
import { NumericFormat } from 'react-number-format';

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
      <p className="text-20 font-medium">Enter your donation</p>
      <div className="flex items-center">
        <NumericFormat 
          value={props.amount} 
          thousandSeparator=","
          className="w-full p-7 border-1 -mr-25"
          onChange={props.updateAmount}
        />
        {/* <TextField id="outlined-basic" 
            variant="outlined" 
            size="small" 
            type="number" 
            style={{ width: '100%' }} 
            value={props.amount}
            onChange={props.updateAmount}
            autoComplete='off'
        /> */}
        <Select onChange={props.onChange} id="bsc-season" className="p-0 text-black" value={props.currency} MenuProps={selectMenuProps} disableUnderline>
          {
            tokenList.map((token, index:number) => {
              if (token.address[FromNetwork] === '')
                return <div className="hidden" key={index}></div>;
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
      <p className="text-right mr-10 flex">
        <label>Available : {Intl.NumberFormat().format(parseFloat(props.cAmount))} {tokenList[props.currency].name}</label>
      </p>
    </div>
  );
};