import React, { Component } from "react";

export default class FooterFilter extends Component {

  render() {
    FooterFilter.defaultProps = {
      selectedFilter: 'all',
    }
    return (
      <div>
        <li>
          <button className={this.props.selectedFilter === 'all'? 'selected': '' }
          onClick={() => this.props.handleFilter('all')}>All</button>
        </li>
        <li>
          <button className={this.props.selectedFilter === 'active'? 'selected': '' }
           onClick={() => this.props.handleFilter('active')}>Active</button>
        </li>
        <li>
          <button className={this.props.selectedFilter === 'completed'? 'selected': '' }
           onClick={() => this.props.handleFilter('completed')}>Completed</button>
        </li>
      </div>
    );
  }
}
