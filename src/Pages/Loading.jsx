import React from 'react'
import ReactLoading from "react-loading";



const Loading = () => {
  return (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <ReactLoading type="spokes" color="#FE2D4D" 
        height={400} width={100} />
    </div>
  )

   
}

export default Loading