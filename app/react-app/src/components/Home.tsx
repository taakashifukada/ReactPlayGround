import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div>Home</div>
      <Link to='/about'>About</Link>
      <Link to='/async'>Async</Link>
    </div>
  )
}

export default Home;