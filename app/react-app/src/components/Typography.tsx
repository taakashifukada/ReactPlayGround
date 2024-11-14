import { Link } from 'react-router-dom';

const Typography = () => {
  return (
    <>
      <div className="flex-col text-center">
        <Link to='/'>Home</Link>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Header 1</h1>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Header 2</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Header 3</h3>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Header 4</h4>
        <p className="leading-7 [&:not(:first-child)]:mt-6">Plain Text</p>
      </div>

      <div className="flex-col text-center gap-4">
        <Link to='/'>Home</Link>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">ヘッダ１</h1>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">ヘッダ2</h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">ヘッダ3</h3>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">ヘッダ4</h4>
        <p className="leading-7 [&:not(:first-child)]:mt-6">プレーンテキスト</p>
      </div>
    </>
  )
}

export default Typography;