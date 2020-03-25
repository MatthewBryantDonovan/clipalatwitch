import React from 'react'

function Nextarrow(props) {
      const { className, style, onClick } = props;
      return (   
            <div
                  className={ className}
                  style={{ ...style, display: "block", background: "#1e88e5", height: "100%" }}
                  onClick={onClick}
            />
      )
}

export default Nextarrow