import { Alert, Button, Label, Spinner, TextInput, Checkbox } from 'flowbite-react';
import { Link , useNavigate} from 'react-router-dom';
import {useState} from 'react'
import { HiInformationCircle } from "react-icons/hi";
import OAuth from '../components/OAuth';

function SignUp() {

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [errorMessage,setErrorMessage] = useState(null)
  const [loading,setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all the fields.')
    }
    try{
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch("/api/auth/signup",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      setLoading(false)
      if(data.success===false){
        setErrorMessage(data.message)
      }
      else{
        navigate('/sign-in')
      }
    }catch(err){
      //This is about errors on client side
      setLoading(false)
      setErrorMessage(err.message)
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>
        <div className='flex-1'>
          {/* Left */}
          <Link to="/" className='whitespace-nowrap text-4xl 
        font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
             via-purple-500 to-pink-500 rounded-lg text-white'>Reader's</span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign up with your email and
            password
            or with Google
          </p>
        </div>
        <div className='flex-1'>
          {/* Right */}
          <div className=''>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <Label value="Your name"/>
                <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
              </div>
              <div>
                <Label value="Your email"/>
                <TextInput type='text' placeholder='name@company.com' id='email' onChange={handleChange}/>
              </div>
              <div> 
                <Label value="Your password"/>
                <TextInput type={showPassword ? 'text':'password'} placeholder='Password' id='password' onChange={handleChange}/>
                <Checkbox id="show-password" onClick={()=>setShowPassword(!showPassword)}></Checkbox>
                <span className='pl-1 text-sm'>Show Password</span>
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : "Sign Up"
              }
              </Button>
              <OAuth/>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account?</span>
              <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
            </div>
            {errorMessage && (
            <Alert className='mt-5' color='failure' icon={HiInformationCircle}>
              {errorMessage}
            </Alert>
           )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;