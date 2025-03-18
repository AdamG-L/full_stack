import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)
  const hide = {display: 'none'}
  const show = {display: 'block'}

  if(visible){
    console.log("Visible equals true ", buttonLabel)
  }
  else if(visible === null){
    console.log("Visible equals null ", buttonLabel)
  }
  else{
    console.log("Visible equals false ", buttonLabel)
  }

  const toggleVisibility = () => {
    setVisible(prev => !prev)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={visible ? hide : show}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={visible ? show: hide} className="togglableContent">
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}
)

Togglable.displayName = "Togglable";
export default Togglable