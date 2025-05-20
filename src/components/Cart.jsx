/* eslint-disable react/prop-types */
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { formatGhanaCedis } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

export default function Cart({ cartItems, modalStatus, handleModalStatus2 ,sendData}) {
  const [isOpen, setIsOpen] = useState(modalStatus);
  const [updateStatus, setUpdateStatus] = useState([]);
  const navigate=useNavigate()

  const handleModalCancel = () => {
    handleModalStatus2(false);
  };

  const handleCheckOut=()=>{
   handleModalStatus2(false)
    navigate('/klinchem/checkout',{state:updateStatus})

  }
  const handleCount = (sign, name) => {
    updateStatus &&
      updateStatus.map((e) => {
        if (sign === "+" && e.productName === name) {
          e.quantity += 1;
          setUpdateStatus(() => {
            return [...updateStatus];
          });
        }


const handleCardData=(data)=>{
  sendData(data)
}

        if(sign==="-"&&e.productName===name){
          e.quantity -= 1;
          setUpdateStatus(() => {
            return [...updateStatus];
          });
        }
        if((sign==="-")&&(e.productName===name )&&(e.quantity===0)){
          const filteredSets= updateStatus.filter((products)=>products.quantity!==0)
          handleCardData([...filteredSets])
          setUpdateStatus(()=>{
            return[...filteredSets]
          })
        }
      });
  };
  useEffect(() => {
    setUpdateStatus(cartItems);
    setIsOpen(modalStatus);
  }, [modalStatus, cartItems]);

  return (
    <>
      <Modal
        open={isOpen}
        className={` bg-opacity-30 z-50  flex justify-center items-center rounded`}
      >
        <div
          className="flex justify-center items-center  rounded 
         h-[50vh] w-[80vw] "
        >
          <div className="flex flex-col w-[20vw] self-start h-[50vh]  rounded">
            <h3 className=" font-semibold text-blue-500 text-[1.5em] ml-4 ">
              Cart Items
            </h3>
            <section className=" w-[80vw] flex flex-col text-start justify-start items-start">
              {cartItems.length > 0 &&
                updateStatus.map((items, i) => {
                  return (
                    <p
                      key={items.productName}
                      className=" pl-4 w-full mt-2 self-center text-[1.5em] text-left mr-2  ml-4 flex justify-start items-center flex-wrap"
                    >
                      {i + 1 + "." + " "} {items.productName} -
                      {formatGhanaCedis(items.productPrice)}{" "}
                      <span className="mr-1">x</span>
                      <span className=" text-blue-500 font-semibold mr-1">
                     { items.quantity}
                      </span>
                      <button
                        onClick={() => handleCount("+", items.productName)}
                        className=" bg-blue-600 shadow shadow-gray-950  text-[.5em] hover:text-[.555em] bg-black  text-gray-50 rounded p-1  mr-1 flex justify-center items-center self-center "
                      >
                        Add
                      </button>
                      <button
                        onClick={() => handleCount("-",items.productName)}
                        className=" text-[.5em] shadow shadow-blue-600 hover:text-[.555em] bg-black shadow-red-600 text-gray-50 rounded p-1 mr-1 flex justify-center items-center "
                      >
                        Reduce
                      </button>{" "}
                    </p>
                  );
                })}
            </section>
          </div>
          
          <section className="w-full h-h-full flex flex-row justify-end items-end self-end mb-4 mr-4">
          <div className="flex flex-col">
            <p>Total - GHC {updateStatus.reduce((accumulator,currentValue)=>accumulator+(currentValue.quantity*+currentValue.productPrice),0)}</p>
            <div>
            <button
              className=" bg-red-700 text-gray-50 p-1 m-1 rounded shadow shadow-black"
              onClick={handleModalCancel}
            >
              Cancel
            </button>
            <button
              className=" bg-blue-700 text-gray-50 p-1 m-1 rounded shadow shadow-black"
              onClick={handleCheckOut}
            >
              Checkout
            </button>
           </div>
            </div> 
           
            
          </section>
        </div>
      </Modal>
    </>
  );
}
