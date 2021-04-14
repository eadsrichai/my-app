import React from 'react'
import  {UserStoreContext} from '../context/UserContext'
import { useSelector, useDispatch} from 'react-redux'
import { updateProfile } from "../redux/actions/authAction";



const MemberPage = () => {

  const userStore = React.useContext(UserStoreContext)
  //redux
  const profileRedux = useSelector((state) => state.authReducer.profile)
  const  dispatch = useDispatch()

  
    return (
        <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>สำหรับสมาชิก</h1>
          {
            profileRedux && (
           <h1>สวัสดีคุณ {profileRedux.name} Email: {profileRedux.email}</h1>
            ) 
          }
        </div>
      </div>
    </div>
    )
}

export default MemberPage
