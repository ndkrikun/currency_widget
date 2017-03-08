import React, {Component} from 'react'
import ReactDOM from 'react-dom'

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
  }

  sortItems(type) {
    this.state[type].items.sort((x, y) =>
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
    // this.setState(prevState => ({
    //   [type]: {
    //     prevState.opened
    //   }
    // }))
    // this.state[type].items.map(item => item.checked = item.id === id);
    // this.sortItems(type);
  }

  renderCurrency(item, type) {
    return (
      <div className="widget__currency-item"
        key={item.id}
        type={type}
        onClick={() => this.handleCurrencyChange(type, item.id)}>
        {item.name}
      </div>
    )
  }

  renderPart(data, type) {
    const field = type === 'input'
      ? ( <input className="widget__field js-widget-input" type="text" placeholder="Type value" onChange={this.handleAmmountChange} /> )
      : ( <div className="widget__field js-widget-output"></div> );

    return (
      <div className="widget__part">
        <div className={`widget__currency js-widget-currency ${data.opened ? 'is-opened' : ''}`}>
          {data.items.map(item => this.renderCurrency(item, type) )}
          <span className="widget__arrow" onClick={() => this.toggleList(type)}></span>
        </div>
        {field}
      </div>
    )
  }

  render() {
    return (
      <div className="widget js-widget">
        {Object.keys(this.state).map(key => this.renderPart(this.state[key], key))}
      </div>
    )
  }
}

// 'uk.finance.yahoo.com/currencies/converter/#from=GBP;to=EUR;amt=1'
// http://api.fixer.io/latest?base=USD

ReactDOM.render(<Widget/>, document.body.querySelector('.js-container'));