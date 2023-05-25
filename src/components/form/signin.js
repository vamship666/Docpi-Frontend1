
import React, {useState, useEffect} from 'react'; 
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import logo from "../../assets/logo.svg"
import { Signin } from '../service/signin';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth-slice';

export function SigninComponent () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('id') !== null && localStorage.getItem('user') !== null ){
        let id = localStorage.getItem('id')
        let user = localStorage.getItem('user')
        dispatch(authActions.setAuth({'id': id, 'user': user}))
    }
}, [])
  const auth = useSelector((state) => state.auth.login);
  const [user, setUser] = useState({
    user: '',
    password: '',
})

  if (auth){
    return navigate('/');
  }
  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState, 
      [name]: value
    }));
  };

  let networkTimeout = null;
  const SubmitData = () => {

    if (networkTimeout) {
        clearTimeout(networkTimeout);
    }

    //imitate delay of a backend call
    networkTimeout = setTimeout(() => {
      console.log(user)
      Signin.customerSignin(JSON.stringify(user)).then((data) => {
            if(data.status === 200){
              // console.log(data.data)
              // localStorage.getItem('accessToken')
              localStorage.setItem('id', data.id);
              localStorage.setItem('user', data.user);
              dispatch(authActions.setAuth({'id': data.id, 'user': data.user}))
              return navigate('/');
            }
            else{ 
              console.log('Authentication failed')
            }
        });
    }, Math.random() * 1000 + 250);
};

  return (
    <div className='grid col-3 m-auto min-h-full justify-content-center'>
        <Card className='w-full login-card'>
        <div className="flex flex-column gap-3">
        <img alt="logo" src={logo} height="40" className="mr-2 " style={{marginLeft: '15px'}}></img>
           <h3>Vaanara Technologies</h3>
            <InputText type="email" className="p-inputtext-lg" placeholder="Email"  value={user.user} name="user" onChange={handleInputChange}/>
            <InputText type="password" className="p-inputtext-lg" placeholder="Password" value={user.password} name="password" onChange={handleInputChange} />
            <Button label="Signin" icon="pi pi-check" size="large" onClick={SubmitData}/>
        </div>
      </Card>
    </div>
  );
};

