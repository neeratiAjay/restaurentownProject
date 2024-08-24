import './index.css'

const DishItem = props => {
  const {dish, cartList, addItem, removeItem} = props
  const {
    dishAvailability,
    dishCurrency,
    addonCat,
    dishCalories,
    dishDescription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
    dishType,
  } = dish ?? ''

  const itemInCart = cartList.find(item => item.dishId === dishId)
  const getQuantity = () => {
    const cartItem = cartList.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const boxClass = dishAvailability ? 'green-box' : 'red-box'
  const dotClass = dishAvailability ? 'green-dot' : 'red-dot'

  const onIncrement = () => {
    addItem(dish)
  }
  const onDecrement = () => {
    removeItem(dish)
  }

  const filterButtonContainer = () => (
    <div className="controller-container">
      <button className="button" type="button" onClick={onDecrement}>
        -
      </button>
      <p className="quantity">{getQuantity()}</p>
      <button className="button" type="button" onClick={onIncrement}>
        +
      </button>
    </div>
  )

  return (
    <li key={dishId} className="dish-item-container">
      <div className="title-flex-container">
        <div className="flex-container">
          <button className={boxClass}>
            <p className={dotClass}>.</p>
          </button>
          <h1 className="dish-item-heading">{dishName}</h1>
        </div>
        <div className="margin-container">
          <p className="sar-value">SAR {dishPrice}</p>
          <p className="description">{dishDescription}</p>
          {dishAvailability && filterButtonContainer()}
          {!dishAvailability && (
            <p className="not-availability-text">Not available</p>
          )}
          {addonCat.length !== 0 && (
            <p className="addon-availability-text">Customizations available</p>
          )}
        </div>
      </div>
      <p className="calaries-text">{dishCalories} calories</p>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}
export default DishItem
