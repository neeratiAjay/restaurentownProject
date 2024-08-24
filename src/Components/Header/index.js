import './index.css'
import {IoCartOutline} from 'react-icons/io5'

const Header = props => {
  const {cartList} = props
  const cartCount = ()=>(
    cartList.reduce((acc,item)=> acc + item.quantity,0)
  )
  return (
    <div className="header-container">
      <h1 className="logo-heading">UNI Resto Cafe</h1>
      <div className="order-flex-container">
        <p className="order-text">My Orders</p>
        <div className="icon-container">
          <div className="count-box">
            <span className="count">{cartCount()}</span>
          </div>
          <IoCartOutline size="30" className="icon" />
        </div>
      </div>
    </div>
  )
}
export default Header
