import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function CheckOutPage() {
    const location=useLocation()
    const navigate=useNavigate()

    const handleCancel=()=>{
      navigate(-1)
    }
  return (
    <div className="flex justify-center item-center aligh-center text-gray-950 flex flex-col text-[1em] ">
        <section className=" w-[95%] self-center flex justify-center item-center flex-col" >
            <p className="text-[1.5em]">You are about to checkout </p>
            <p>Products you are paying for:</p>
{location.state.map((product,i)=><li  key={i}>{product.productName} - quantity: {product.quantity}</li>)}
<p className="mt-5 text-[1.55em]">Total Amount: GHC {location.state.reduce((accumulator,currentValue)=>accumulator+(currentValue.quantity*+currentValue.productPrice),0)}
</p> 
        
        
        <div className="flex justify-end mr-2 text-white p-1 rounded w-[50%]">
        <button className="bg-red-600 mr-2 text-white p-1 rounded" onClick={handleCancel}>
            Cancel
        </button>

         <button className="bg-blue-600 ml-2 text-white p-1 rounded ">
            Proceed
        </button>
        </div>
        </section>
        
       
    </div>
  )
}
