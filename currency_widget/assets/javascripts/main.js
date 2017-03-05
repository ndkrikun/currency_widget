import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class Widget extends Component {
  constructor() {
    super()
    this.model = {
      input: [{
        name: 'USD',
        checked: true
      }, {
        name: 'EUR',
        checked: false
      }, {
        name: 'GBP',
        checked: false
      }],
      output: [{
        name: 'EUR',
        checked: true
      }, {
        name: 'USD',
        checked: false
      }, {
        name: 'GBP',
        checked: false
      }]
    }
  }

  handleCurrencyChange() {
    const select = event.currentTarget.parentNode;
    select.classList.add('is-change')
  }

  renderCurrency(item) {
    const click = item.checked
      ? this.handleCurrencyChange
      : () => {}
    return (
      <div className="widget__currency-item" onClick={click}>{item.name}</div>
    )
  }

  render() {
    return (
      <div className="widget js-widget">
        <div className="widget__part">
          <div className="widget__currency js-widget-currency" data-type="input">
            {this.model.input.map(item => { this.renderCurrency(item) })}
            <span className="widget__arrow"></span>
          </div>
          <input className="widget__field js-widget-input"
            type="text"
            placeholder="Type value"
            onChange={this.handleAmmountChange} />
        </div>
        <div className="widget__part">
          <div className="widget__currency js-widget-currency" data-type="output">
            {this.model.output.map(item => { this.renderCurrency(item) })}
            <span className="widget__arrow"></span>
          </div>
          <div className="widget__field js-widget-output"></div>
        </div>
      </div>
    )
  }
}

// 'uk.finance.yahoo.com/currencies/converter/#from=GBP;to=EUR;amt=1'
// http://api.fixer.io/latest?base=USD

ReactDOM.render(<Widget/>, document.body.querySelector('.js-container'));