import React from 'react';
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

function TableHOC(columns, data, containerClassname, heading, showPagination = false) {
  return function HOC() {
    const options = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      pageCount,
      state: { pageIndex },
      previousPage,
      canNextPage,
      canPreviousPage,
    } = useTable(options, useSortBy, usePagination);

    return (
      <div className={containerClassname}>
      <h2 className="heading">{heading}</h2>

      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const headerGroupProps = headerGroup.getHeaderGroupProps();
            const { key, ...otherHeaderGroupProps } = headerGroupProps;
            return (
              <tr key={headerGroup.id || headerGroup.headers[0].id} {...otherHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const columnProps = column.getHeaderProps(column.getSortByToggleProps());
                  const { key, ...otherColumnProps } = columnProps;
                  return (
                    <th key={column.id} {...otherColumnProps}>
                      {column.render("Header")}
                      {column.isSorted && (
                        <span>
                          {" "}
                          {column.isSortedDesc ? (
                            <AiOutlineSortDescending />
                          ) : (
                            <AiOutlineSortAscending />
                          )}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            const { key, ...otherRowProps } = rowProps;
            return (
              <tr key={row.id || row.index} {...otherRowProps}>
                {row.cells.map((cell) => {
                  const cellProps = cell.getCellProps();
                  const { key, ...otherCellProps } = cellProps;
                  return (
                    <td key={cell.column.id} {...otherCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {showPagination && (
        <div className="table-pagination">
          <button disabled={!canPreviousPage} onClick={previousPage}>
            Prev
          </button>
          <span>{`${pageIndex + 1} of ${pageCount}`}</span>
          <button disabled={!canNextPage} onClick={nextPage}>
            Next
          </button>
        </div>
      )}
    </div>
    )
      
  };
}

export default TableHOC;
