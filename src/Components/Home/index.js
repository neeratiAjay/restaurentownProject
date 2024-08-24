import {Component} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'

import './index.css'

const tabItemsList = [
  {id: 11, displayText: 'Salads and Soup'},
  {id: 12, displayText: 'From The Barnyard'},
  {id: 13, displayText: 'From the Hen House'},
  {id: 14, displayText: 'Fresh From The Sea'},
  {id: 15, displayText: 'Biryani'},
  {id: 17, displayText: 'Fast Food'},
]

class Home extends Component {
  state = {activeTabId: 11, dishItemsData: [], cartItems: []}

  componentDidMount() {
    this.getData()
  }

  getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  getData = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(api)
    const data = await response.json()
    const updateData = this.getUpdatedData(data[0].table_menu_list)
    this.setState({dishItemsData: [...updateData]})
  }

  onClickTabItem = event => {
    this.setState({activeTabId: parseInt(event.target.value)})
  }

  addCartItem = dish => {
    const {cartItems} = this.state

    const findItem = cartItems.find(item => item.dishId === dish.dishId)
    if (findItem === undefined) {
      this.setState(prev => ({
        cartItems: [...prev.cartItems, {...dish, quantity: 1}],
      }))
    } else {
      this.setState(prev => ({
        cartItems: [
          ...prev.cartItems.map(item => {
            if (item.dishId === dish.dishId) {
              return {...item, quantity: item.quantity + 1}
            }
            return item
          }),
        ],
      }))
    }
  }

  removeCartItem = dish => {
    const {cartItems} = this.state
    const findItem = cartItems.find(eachItem => eachItem.dishId === dish.dishId)
    if (findItem !== undefined) {
      if (findItem.quantity === 1) {
        const filteredData = cartItems.filter(
          item => item.dishId !== dish.dishId,
        )
        this.setState({cartItems: filteredData})
      } else if (findItem.quantity > 1) {
        this.setState(prev => ({
          cartItems: [
            ...prev.cartItems.map(item =>
              item.dishId === dish.dishId
                ? {...item, quantity: item.quantity - 1}
                : item,
            ),
          ],
        }))
      }
    }
  }

  render() {
    const {activeTabId, dishItemsData, cartItems} = this.state

    const filterData = dishItemsData.filter(
      item => parseInt(item.menuCategoryId) === activeTabId,
    )
    const {categoryDishes} = filterData[0] ?? ''

    return (
      <>
        <Header cartList={cartItems} />
        <div className="home-container">
          <div className="tab-container">
            {tabItemsList.map(eachTab => (
              <button
                onClick={this.onClickTabItem}
                value={eachTab.id}
                className={
                  activeTabId === eachTab.id ? 'active-btn' : 'tab-btn'
                }
                key={eachTab.id}
              >
                {eachTab.displayText}
              </button>
            ))}
          </div>
          <ul className="dish-ol-container">
            {categoryDishes?.map(item => (
              <DishItem
                dish={item}
                key={item.dishId}
                cartList={cartItems}
                addItem={this.addCartItem}
                removeItem={this.removeCartItem}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }
}
export default Home
