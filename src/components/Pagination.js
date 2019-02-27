import React from 'react';
import {
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';


class PaginationTable extends React.Component {
    state = {
        pages: 0,
    }
    componentWillUpdate(props) {

        if (this.props !== props) {
            const { data = [], entry } = props;
            this.setState({ pages: Math.ceil(data.length / entry) });
        }
    }
    showPagi = () => {
        let arrPagiItem = [];

        if (this.state.pages !== 0) {
            for (let i = 0; i < this.state.pages; i++) {
                arrPagiItem.push(<PaginationItem key={i} active={(i) === this.props.currentPage ? true : false} onClick={() => this.props.handleChangePage(i)}>
                    <PaginationLink>
                        {i + 1}
                    </PaginationLink>
                </PaginationItem>);
            }
       }
        return arrPagiItem;
    }
    render() {
        const { currentPage } = this.props;
        return (
            <Pagination aria-label="Page navigation example">
                {currentPage === 0 ? <PaginationItem disabled  >
                    <PaginationLink previous />
                </PaginationItem> : <PaginationItem onClick={() => this.props.handleChangePage(this.props.currentPage - 1)} >
                        <PaginationLink previous />
                    </PaginationItem>}

                {this.showPagi()}
                {currentPage === this.state.pages ? <PaginationItem disabled >
                    <PaginationLink next />
                </PaginationItem> : <PaginationItem  onClick={() => this.props.handleChangePage(this.props.currentPage + 1)}>
                        <PaginationLink next />
                    </PaginationItem>}
            </Pagination>
        );
    }
}

export default PaginationTable;
