import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class Widget extends Component {
  constructor() {
    super()
    this.state = {
      input: {
        opened: true,
        items:[
          { id: 1, name: 'USD', checked: true },
          { id: 2, name: 'EUR', checked: false },
          { id: 3, name: 'GBP', checked: false }
        ]
      },
      output: {
        opened: false,
        items: [
          { id: 1, name: 'EUR', checked: true },
          { id: 2, name: 'USD', checked: false },
          { id: 3, name: 'GBP', checked: false }
        ]
      }
    }

    this.rates = [{
      id: 1, name: 'USD',
      relations: [
        { id: 2, name: 'EUR', value: null },
        { id: 3, name: 'GBP', value: null }
      ]
    }, {
      id: 2, name: 'EUR',
      relations: [
        { id: 1, name: 'USD', value: null },
        { id: 3, name: 'GBP', value: null }
      ] 
    }, {
      id: 3, name: 'GBP',
      relations: [
        { id: 2, name: 'EUR', value: null },
        { id: 1, name: 'USD', value: null }
      ]
    }]

    this.timeinterval = setInterval(() => this.updateRates(), 30 * 1000)
    this.updateRates()
  }

  async updateRates() {
    const API = 'http://api.fixer.io/latest'
    try {
      for (let i = 0; i < this.rates.length; i++) {
        let request = await axios.get(`${API}?base=${this.rates[i].name}`)
        for (let key in request.data.rates) {
          for (let j = 0; j < this.rates[i].relations.length; j++) {
            if (key === this.rates[i].relations[j].name) {
              this.rates[i].relations[j].value = request.data.rates[key]
            }
          }
        }
      }
    } catch (e) {
      clearInterval(this.updateRates)
      throw new Error(e)
    }
    console.log(this.rates)
  }

  sortItems(items, id) {
    items.map(item => { item.checked = item.id === id })
    return items.sort((x, y) =>
      x.checked === y.checked
        ? 0 
        : x.checked ? -1 : 1
    )
  }

  toggleList(type) {
    this.setState(prevState => ({
      [type]: {
        opened: !prevState[type].opened,
        items: prevState[type].items
      }      
    }))
  }

  handleCurrencyChange(type, id) {
    this.setState(prevState => ({
      [type]: {
        opened: !prevState[type].opened,
        items: this.sortItems(prevState[type].items, id)
      }
    }))
  }

  renderCurrency(item, type) {
    const click = item.checked
      ? () => this.toggleList(type)
      : () => this.handleCurrencyChange(type, item.id)
    return (
      <div className="widget__currency-item"
        key={item.id}
        type={type}
        onClick={click}>
        {item.name}
      </div>
    )
  }

  renderPart(data, type) {
    const field = type === 'input'
      ? ( <input className="widget__field js-widget-input" type="text" placeholder="Type value" onChange={this.handleAmmountChange} /> )
      : ( <div className="widget__field js-widget-output"></div> )

    return (
      <div className="widget__part">
        <div className={`widget__currency js-widget-currency ${data.opened ? 'is-opened' : ''}`}>
          {data.items.map(item => this.renderCurrency(item, type) )}
          <span className="widget__currency-arrow" onClick={() => this.toggleList(type)}></span>
        </div>
        {field}
      </div>
    )
  }

  render() {
    return (
      <div className="widget js-widget">
        {Object.keys(this.state).map(
          key => this.renderPart(this.state[key], key)
        )}
      </div>
    )
  }
}

ReactDOM.render(<Widget/>, document.body.querySelector('.js-container'))