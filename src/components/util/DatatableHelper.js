import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


export const pageListRenderer = ({
    pages,
    onPageChange
  }) => {
    // just exclude <, <<, >>, >
    const pageWithoutIndication = pages.filter(p => typeof p.page !== 'string');
    return (
      <div>
        {          
          pageWithoutIndication.map(p => (
            <button className="btn btn-success" onClick={ () => onPageChange(p.page) }>{ p.page }</button>
          ))
        }
      </div>
    );
  };

export const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    classes: 'selection-row',
  };

export const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    sizePerPageList: 10
  });