import React from 'react';
import { connect } from 'react-redux';
import * as Table from 'reactabular-table';
import FormatColHeader from '../FormatColHeader/FormatColHeader.js';

const Countries = {
  fi: 'Finland',
  dk: 'Denmark',
  in: 'India',
};

class MySortingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.getColumns(),
    };
  }
  getColumns() {
    return [
      {
        property: 'id',
        header: {
          label: 'ID',
          transforms: [
            label => ({
              onClick: event => {
                event.stopPropagation();
                this.props.sortTable(label, event.altKey);
              },
            }),
          ],
          formatters: [
            label => (
              <FormatColHeader
                sortingState={this.props.sorting}
                label={label}
              />
            ),
          ],
        },
      },
      {
        property: 'name',
        header: {
          label: 'Name',
          transforms: [
            label => ({
              onClick: event => {
                event.stopPropagation();
                this.props.sortTable(label, event.altKey);
              },
            }),
          ],
          formatters: [
            label => (
              <FormatColHeader
                sortingState={this.props.sorting}
                label={label}
              />
            ),
          ],
        },
      },
      {
        property: 'tools',
        header: {
          label: 'Active',
          transforms: [
            label => ({
              onClick: event => {
                event.stopPropagation();
                this.props.sortTable('tools', event.altKey);
                if (event.altKey) {
                  console.debug('alt+click has just happened!');
                }
              },
            }),
          ],
          formatters: [
            label => (
              <FormatColHeader
                sortingState={this.props.sorting}
                property="tools"
                label={label}
              />
            ),
          ],
        },
        cell: {
          formatters: [tools => (tools.hammer ? 'Hammertime' : 'nope')],
        },
      },
      {
        property: 'country',
        header: {
          label: 'Country',
          transforms: [
            label => ({
              onClick: event => {
                event.stopPropagation();
                this.props.sortTable(label, event.altKey);
              },
            }),
          ],
          formatters: [
            country => (
              <FormatColHeader
                sortingState={this.props.sorting}
                label={country}
              />
            ),
          ],
        },
        cell: {
          formatters: [country => Countries[country]],
        },
      },
    ];
  }

  render() {
    const { columns } = this.state;
    const { rows } = this.props.sorting;

    return (
      <div>
        <Table.Provider
          className="table table-striped table-bordered"
          columns={columns}
        >
          <Table.Header />
          <Table.Body rows={rows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

const mapStateToProps = ({ sorting }) => {
  return { sorting: sorting };
};
const mapDispatchToProps = dispatch => ({
  sortTable: (label, isMultiSort) =>
    dispatch({
      type: 'SORT_ROW',
      label,
      isMultiSort,
    }),
});

const ConnectedSortTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(MySortingTable);

export default ConnectedSortTable;
