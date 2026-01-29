import './ui.css'
// eslint-disable-next-line react/prop-types
const Button = ({ text }) => {
  return (
    <button className='button'>{ text }</button>
  )
}

export default Button