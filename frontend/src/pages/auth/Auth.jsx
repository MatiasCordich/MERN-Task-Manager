import Layout from '../../components/layout/Layout'
import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'
const Auth = () => {
  return (
    <Layout>
      <div>
        <Login/>
        <Register/>
      </div>
    </Layout>
  )
}

export default Auth