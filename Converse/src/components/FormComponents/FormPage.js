import LoginForm from "./LoginForm";
import Registration from "./Registration";
import {  useState,useEffect } from "react";
import loginPic from './../../assets/login5.jpeg';
import AlertForm from "./AlertForm";

const FormPage = ({FetchRequests, loggedIn,setLoggedIn}) => {
  const [alertCalled,setAlertCalled] = useState(false);
  const [alertProperties,setAlertProperties]= useState([]);
  const callAlert = () => {
    return <AlertForm alertProperties={alertProperties} setAlertCalled={setAlertCalled} />
  }

  // useEffect(() => {
  //   console.log("Alert called");
  //   setAlertCalled(true);
  //   cons
  // }, [alertProperties])

  return ( 
    <div class="vh-100" style={{backgroundColor: '#E8E8E4'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style= {{ backgroundColor: 'white', borderRadius: '1rem' }}>
              
              {/* LEFT CARD IMAGE  */}
              <div className="row g-0 ">
              <div className=" col-md-6 col-lg-5 d-none d-md-block">
                <img 
                src={loginPic}
                className="img-fluid"
                alt="formImage"
                style= {{borderRadius: '1rem 0 0 1rem', maxHeight: '90vh'}}
                />
              </div>
              
              {/* Need to change max height */}
                <div className="col-md-6 col-lg-7 d-flex overflow-auto" style= {{maxHeight: '60vh'}}>
                <div className="card-body p-4 p-lg-5">
                <div className="d-flex align-items-center mb-3 pb-2">

                  {/* LOGO AND TITLE ON FORM */}
                    <div className="col-1 me-2s">
                      <i className="bi bi-globe2"></i>
                    </div>
                    <div className="col-lg-8 col-md-11">
                      <div className="d-flex fs-2"><b>Converse</b></div>
                    </div>
                  </div>
                  {callAlert()}
                    <LoginForm FetchRequests={FetchRequests} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setAlertProperties={setAlertProperties} />

                    <Registration setAlertProperties={setAlertProperties}/>
                      
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default FormPage;