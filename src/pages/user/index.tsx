import { Grid, TextareaAutosize, TextField, NativeSelect, MenuItem } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { create } from 'ipfs-http-client';
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import { useWeb3Context } from "../../hooks/web3Context";
import { allFundTypes, baseServerUrl, getContract, projectId, projectSecret } from "../../core/constants/base";
import { setLoading, setLoginUser } from "../../core/store/slices/bridgeSlice";
import { PhotoUpload } from "../../components/photoUpload";
import { loginUserProp } from "../../core/interfaces/base";

import logoImg from "../../assets/images/logo.png";
import remoteImg from "../../assets/images/components/remote.png";
import { baseStyles } from "../../core/constants/style";
import { RegistrationPage } from "./registration";

export const UserPage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { actionType } = useParams();
  const {connected, address, provider} = useWeb3Context();
  const loginUser:loginUserProp = useSelector((state:any) => state.app.loginUser);

  const sidebarStyle = "p-5 text-center border";
  console.log(actionType);
  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen h-400 flex items-end justify-between overflow-hidden">
        <div></div>
        <img src={remoteImg} className="w-150 h-150 mr-20 sm:w-300 sm:h-300 md:mr-[10%]"/>
        <div className="absolute left-[10%] top-0 w-full h-full text-white flex items-center">
          <div className="mt-100 mx-20">
            <p className="text-48 font-bold">Profile Settings</p>
            <p className="text-20 my-10">Complete tasks by easily following the profile process.</p>
          </div>
        </div>
      </div>
      <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70 px-35 py-50">
        <Grid item container xs={12} sm={4} md={3}>
          <div className="p-20 rounded-10 border-1 w-full">
            <div className="bg-logo py-10 w-full flex justify-center">
              <img src={logoImg} className="w-120 h-120"/>
            </div>
            <div className={sidebarStyle}>
              Sign up
            </div>
            <div className={sidebarStyle}>
              Profile
            </div>
            <div className={sidebarStyle}>
              My donations
            </div>
            <div className={sidebarStyle}>
              My fundraising
            </div>
          </div>
        </Grid>
        <Grid item container xs={12} sm={8} md={9} spacing={1}>
          {actionType === "signup" && (
            <RegistrationPage />
          )}
        </Grid>
      </div>
    </div>
  );
}