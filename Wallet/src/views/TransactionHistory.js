import React from "react";
import ReactTable from "react-table";
import FuzzySearch from "fuzzy-search";
import Moment from "react-moment";
import { withLocalize, Translate } from "react-localize-redux";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";
import history from "../utils/history";
import PageTitle from "../components/common/PageTitle";
import RangeDatePicker from "../components/common/RangeDatePicker";
import * as constants from '../constants';
import { Redirect } from "react-router-dom";


class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 10,
      tableData: [],
      redirect: undefined
    };
	this.props.addTranslation(require("../translations/transactionHistory.json"));
    this.searcher = null;

    this.getStatusClass = this.getStatusClass.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.handleItemReject = this.handleItemReject.bind(this);
    this.handleItemConfirm = this.handleItemConfirm.bind(this);
    this.handleItemViewDetails = this.handleItemViewDetails.bind(this);
  }

  componentDidMount() {
	  const {mydappwallet} = window;

	mydappwallet.transaction_list({network:'ropsten'},function (error, result){
			if(error){
				
			}else {
				  this.setState({...this.state,tableData:result});
		   			// Initialize the fuzzy searcher.
					this.searcher = new FuzzySearch(result, ["customer", "status"], {
      				caseSensitive: false
    });
			}
		}.bind(this))
	
	
 
    
  }

  /**
   * Returns the appropriate status class for the `Status` column.
   */
  getStatusClass(status) {
    const statusMap = {
      Cancelled: "danger",
      Complete: "success",
      Pending: "warning"
    };

    return `text-${statusMap[status]}`;
  }

  /**
   * Handles the page size change event.
   */
  handlePageSizeChange(e) {
    this.setState({
      ...this.state,
      pageSize: e.target.value
    });
  }

  /**
   * Handles the global search.
   */
  handleFilterSearch(e) {
    this.setState({
      ...this.state,
      tableData: this.searcher.search(e.target.value)
    });
  }

  /**
   * Mock method for editing transactions.
   */
  handleItemSelect(row) {
    this.setState({'redirect': '/transaction/'+ row.original.uid});
   
  }

  /**
   * Mock method for deleting transactions.
   */
  handleItemReject(row) {
    alert(`Deleting transaction "${row.original.id}"!`);
	const {web3} = window;
	web3.gateway.reject(row.original.uid, function (error, result){
		if(error){
			alert(JSON.stringify(error));
		}else {
			var tableData = this.state.tableData;
			tableData[row.index].status = 2;
	  		this.setState({...this.state,tableData});
		}
	}.bind(this));


	
  }

  /**
   * Mock method for confirming transactions.
   */
  handleItemConfirm(row) {
    alert(`Confirming transaction "${row.original.id}"!`);
	
	
  }

  /**
   * Mock method for confirming transactions.
   */
  handleItemViewDetails(row) {
    alert(`Viewing details for "${row.original.id}"!`);
  }

  render() {
    const { tableData, pageSize, pageSizeOptions, redirect } = this.state;
    if(redirect)return <Redirect to={redirect}/>;
    
    const tableColumns = [
      {
        Header: "#",
        accessor: "id",
        maxWidth: 60,
        className: "text-center",
		Cell: row =>
          <React.Fragment>{row.index+1}</React.Fragment>
      },
	  {
        Header: "UID",
        accessor: "uid",
        className: "text-left",
		style: {'justify-content':'left'},
        minWidth: 90,
        
      },
      {
        Header: "Create Date",
        accessor: "date",
        className: "text-center",
        minWidth: 80,
 		Cell: row => (
         <Moment format={constants.DATE_AND_TIME_FORMAT}>
			{row.original.createDate*1000}
		 </Moment>
        ),
        
      },
 	  {
        Header: "Type",
        accessor: "type",
        className: "text-center",
		Cell: row => (
         <Translate id={'transaction-type-'+ row.original.type}/>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        className: "text-center",
		Cell: row => (
      <React.Fragment>
          {row.original.status===0 && <Button aria-checked="false"  className="btn-outline-primary" style={{'padding': '.375rem .75rem', 'cursor': 'default'}}><Translate id="transaction-status-0"/></Button>}
          {row.original.status===1 && <Button aria-checked="false"  className="btn-outline-primary" style={{'padding': '.375rem .75rem', 'cursor': 'default'}}><Translate id="transaction-status-1"/></Button>}
          {row.original.status===2 && <Button aria-checked="false" className="btn-outline-danger" style={{'padding': '.375rem .75rem',  'cursor': 'default'}}><Translate id="transaction-status-2"/></Button>}
          {row.original.status===3 && <Button aria-checked="false" className="btn-outline-danger" style={{'padding': '.375rem .75rem',  'cursor': 'default'}}><Translate id="transaction-status-3"/></Button>}
          {row.original.status===4 && <Button aria-checked="false" className="btn-outline-info" style={{'padding': '.375rem .75rem',  'cursor': 'default'}}><Translate id="transaction-status-4"/></Button>}


         
       </React.Fragment>                               
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        maxWidth: 300,
        minWidth: 180,
        sortable: false,
        Cell: row => (
			<React.Fragment>

          <ButtonGroup size="sm" className="d-table mx-auto">
            <Button theme="white" onClick={() => this.handleItemSelect(row)}>
              <i className="material-icons">&#xE5CA;</i>
            </Button>
          
           
          </ButtonGroup></React.Fragment>
        )
      }
    ];

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title={<Translate id="transaction-history-title"/>} subtitle={<Translate id="wallet"/>} className="text-sm-left mb-3" />
          <Col sm="4" className="d-flex ml-auto my-auto">
            <RangeDatePicker className="justify-content-end" />
          </Col>
        </Row>
        <Card className="p-0">
          <CardHeader className="p-0">
            <Container fluid className="file-manager__filters border-bottom">
              <Row>
                {/* Filters :: Page Size */}
                <Col className="file-manager__filters__rows d-flex" md="6">
                  <span>Show</span>
                  <FormSelect
                    size="sm"
                    value={this.state.pageSize}
                    onChange={this.handlePageSizeChange}
                  >
                    {pageSizeOptions.map((size, idx) => (
                      <option key={idx} value={size}>
                        {size} rows
                      </option>
                    ))}
                  </FormSelect>
                </Col>

                {/* Filters :: Search */}
                <Col className="file-manager__filters__search d-flex" md="6">
                  <InputGroup seamless size="sm" className="ml-auto">
                    <InputGroupAddon type="prepend">
                      <InputGroupText>
                        <i className="material-icons">search</i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormInput onChange={this.handleFilterSearch} />
                  </InputGroup>
                </Col>
              </Row>
            </Container>
          </CardHeader>
          <CardBody className="p-0">
            <div className="">
              <ReactTable
                columns={tableColumns}
                data={tableData}
                pageSize={pageSize}
                showPageSizeOptions={false}
                resizable={false}
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    );
  }
}
export default withLocalize(TransactionHistory);

