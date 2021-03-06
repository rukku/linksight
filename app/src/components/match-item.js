import React from 'react'
import styled from 'styled-components'

// Colors
import * as colors from '../colors'

const Choice = styled(props => (
  <tr className={'-choice ' + props.className}>
    <td
      colSpan='4'
      className='table-cell -choice-content'
      onClick={props.onChoose.bind(null, props.item)}
    >
      {props.noChoice ? 'No correct match / Unsure' : [
        props.item.matched_barangay,
        props.item.matched_city_municipality,
        props.item.matched_province
      ].filter(v => v).join(', ')}
    </td>
    <td
      className='table-cell'
    >
      <div className='score'>{props.item.total_score}</div>
    </td>
  </tr>
))`
  .table-cell.-choice-content {
    position: relative;
    padding-left: 40px;
    border-left: 1px solid ${colors.monochrome[1]};
  }
  .table-cell.-choice-content:before {
    display: block;
    content: ' ';
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid ${colors.monochrome[2]};
    position: absolute;
    left: 15px;
    top: 20px;
    transition: border-color, background 0.2s ease-in-out;
    ${props => props.item.id === props.chosenItem ? `
      border-color: ${colors.green};
      background: ${colors.green};
    ` : null}
  }
  .table-cell .score {
    font-size: 15px;
    color: ${colors.monochrome[3]};
  }
`

class MatchItem extends React.Component {
  render () {
    const {item} = this.props
    return (
      <React.Fragment>
        <tr className={this.props.className}>
          <td className='table-cell -index' colSpan='2' rowSpan={item.choices.length + 2}>
            {this.props.index + 1}
          </td>
          <td className='table-cell -source' rowSpan={item.choices.length + 2}>
            {[item.source_barangay,
              item.source_city_municipality,
              item.source_province].filter(v => v).join(', ')}
          </td>
        </tr>
        {item.match_type === 'near' ? this.renderChoices(item.choices) : null}
        {item.match_type === 'near' ? this.renderNoChoice(item) : null}
      </React.Fragment>
    )
  }
  renderChoices (choices) {
    return choices.map((item, i) => (
      <Choice
        key={i}
        item={item}
        onChoose={this.props.onChoose}
        chosenItem={this.props.chosenItem}
      />
    ))
  }
  renderNoChoice (item) {
    return (
      <Choice noChoice='true'
        /*
          Based on how chosenItem works, the passed item needs to have:
            - no id
            - a dataset_index
        */
        item={{dataset_index: item.dataset_index}}
        onChoose={this.props.onChoose}
        chosenItem={this.props.chosenItem} />
    )
  }
}

export default styled(MatchItem)`
  .table-cell.-index {
    color: ${colors.indigo};
    font-weight: bold;
    padding: 15px;
    width: 1px;
    vertical-align: top;
    text-align: center;
  }
  .table-cell.-tag {
    width: 1px;
  }
  .table-cell.-tag .tag {
    display: inline-block;
    color: white;
    font-size: 12px;
    line-height: 20px;
    border-radius: 5px;
    text-align: center;
    width: 20px;
    margin: 0 15px 0 5px;
  }
  .table-cell.-source {
    vertical-align: top;
  }
  .tag img {
    width: 12px;
    height: 12px;
  }
  .tag-match {
    background: ${colors.green};
  }
  .tag-checked {
    background: ${colors.yellow};
  }
  .tag-no-match {
    background: ${colors.orange};
  }
  .table-cell .missing {
    font-style: italic;
    color: ${colors.monochrome[3]};
  }
`
