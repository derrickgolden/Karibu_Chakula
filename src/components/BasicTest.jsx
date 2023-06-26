const BasicTest = () => {
    return (
      <div> 
        <ChildComponent /> 
      </div> 
    )
  }
  
  const ChildComponent = () => {
    return (
      <div>
       <p> Child components</p>
      </div>
    )
  }

  export default BasicTest;