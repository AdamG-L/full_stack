const Notification = ({ errorMsg }) => {
    if (errorMsg === null) {
      return null
    }
  
    return (
      <div className='fixed top-0 font-bold left-0 w-full text-center p-3'>
        {errorMsg}
      </div>
    )
  }

  export default Notification