import React from 'react'

const Form = () => {
    const submitHandler = (e) =>{
        e.preventDefault(e)
        console.log("Helllo");
        
    }
  return (
    <div>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <input type="text" />
            <button>submit</button>
        </form>

    </div>
  )
}

export default Form