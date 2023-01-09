import { Toaster } from 'react-hot-toast'
import Layout from '../../components/layout/Layout'
import Register from '../../components/Register/Register'
import './auth.css'

const AuthRegister = () => {
  return (
    <Layout>
        <div className='box'>
            <Toaster
              position="bottom-center"
              reverseOrder={false}
            />
            <Register/>
        </div>
    </Layout>
    
  )
}

export default AuthRegister