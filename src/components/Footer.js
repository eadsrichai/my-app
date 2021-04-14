import React from "react";
import PropTypes from "prop-types";
import {getVersion} from '../redux/actions/authAction'
import {useDispatch,useSelector} from 'react-redux'

const Footer = () => {
  const dispatch = useDispatch()
  const version = useSelector((state) => state.authReducer.version)

  React.useEffect(() => {
    dispatch(getVersion())
  },[])
  return (
    <div>
      <footer className="container">
        <p>API Version: {version} </p>
      </footer>
      
    </div>
  );

//   const styles = {
//     title: {
//       color: "red",
//     },
//   };

//   Footer.propTypes = {
//     title: PropTypes.string,
//     website: PropTypes.string,
//     postcode: PropTypes.number,
//     isOpen: PropTypes.bool,
//   };
};

export default Footer;
