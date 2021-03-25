import React,{useMemo} from 'react';
import { useTable, useSortBy, useFilters, usePagination} from 'react-table';
import {Table, Row, Col, Button, Input, CustomInput} from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filter';

function ReactTable({columns,data}){
    const {
        getTableProps, 
        getTableBodyProps,
        headerGroups, 
        page,//rows changed to page
        prepareRow,
        //props related to usePagination
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize } 
      } = useTable({
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        initialState: { pageIndex: 0, pageSize: 5 }
      },useFilters,useSortBy,usePagination);
      const generateSortingIndicator = column => {
        return column.isSorted ? (column.isSortedDesc ? "(des)" : "(asc)") : ""
      }
      const onChangeInSelect = event => {
        setPageSize(Number(event.target.value))
      }
      const onChangeInInput = event => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0
        gotoPage(page)
      }
     
    return (
      <>
        <Table bordered {...getTableProps()} >
          <thead>
            {headerGroups.map(headerGroup=>(
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column=>(
                  <th {...column.getHeaderProps()}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column}/>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row=>{
              prepareRow(row);
              return(
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell=>{
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <Col md={3}>
            <Button color="primary" onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </Button>
            <Button color="primary" onClick={previousPage} disabled={!canPreviousPage}>
              {'<'}
            </Button>
          </Col>
          <Col md={2} style={{ marginTop: 7 }}>
            Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
          </Col>
          <Col md={2}>
            <Input
              type="number"
              min={1}
              style={{ width: 70 }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </Col>
          <Col md={2}>
            <CustomInput type="select" value={pageSize} onChange={onChangeInSelect}>
              {[5, 8, 10, 12, 15].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </CustomInput>
          </Col>
          <Col md={3}>
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {'>'}
            </Button>
            <Button color="primary" onClick={()=> gotoPage(pageCount-1)} disabled={!canNextPage}>
              {'>>'}
            </Button>
          </Col>
        </Row>
      </>
    );
}

export default ReactTable;