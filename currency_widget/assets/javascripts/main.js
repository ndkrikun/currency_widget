import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class Widget extends Component {
  constructor() {
    super()
    this.model = {
      input: ['USD', 'EUR', 'GBP'],
      output: ['EUR', 'USD', 'GBP']
    }
  }
  renderCurrency(name) {
    return (
      <div className="widget__currency-item">{name}</div>
    )
  }

  render() {
    return (
      <div className="widget js-widget">
        <div className="widget__part">
          <div className="widget__currency js-widget-currency" data-type="input">
            {this.model.input.map(this.renderCurrency)}
            <span className="widget__arrow"></span>
          </div>
          <input className="widget__field js-widget-input"
            type="text"
            placeholder="Type value"
            onchange={this.handleChange} />
        </div>
        <div className="widget__part">
          <div className="widget__currency js-widget-currency" data-type="output">
            {this.model.output.map(this.renderCurrency)}
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

ReactDOM.render(<Widget/>, document.body);