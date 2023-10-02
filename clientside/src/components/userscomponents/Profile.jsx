import React, { useEffect } from 'react'
import { useGetTokenVerificationQuery } from '../../features/userQuery/signinupQuery';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("userinfo"))?.token;
    const {data,isLoading} = useGetTokenVerificationQuery(token);
    {data && console.log(data)}
    useEffect(()=> {
      if(data?.result!=='token is verified') {
        navigate("/login");
      }
      
    },[])
  return (
    <div>
        Profile...
    </div>
  )
}

export default Profile