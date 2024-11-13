import { Link } from 'react-router-dom';

const Typography = () => {
  return (
    <div>
      <div>Typography</div>
      <Link to='/'>Home</Link>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Header 1</h1>
      <h2 className="text-xl font-bold text-gray-800">Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <p>Plain Text</p>
    </div>
  )
}

export default Typography;