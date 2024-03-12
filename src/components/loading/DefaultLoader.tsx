import salad from '@/assets/icons/salad.svg'


export default function DefaultLoader() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img src={salad} alt="Loading" className='size-50pxr animate-ping'/>
    </div>
  )
}