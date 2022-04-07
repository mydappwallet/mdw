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
  FormInput,
  Collapse 
} from "shards-react";
import history from "../../../utils/history";
import PageTitle from "../../../components/common/PageTitle";
import RangeDatePicker from "../../../components/common/RangeDatePicker";
import * as constants from '../../../constants';
import { Redirect } from "react-router-dom";
import Transaction from "./Transaction";
var utils = require('web3-utils');
const renderRowSubComponent = 
    ({ row }) => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    )

class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSizeOptions: [5, 10, 15, 20, 25, 30],
      pageSize: 10,
      tableData: [],
      redirect: undefined,
	  expanded:{},
	  selected: undefined
    };
	this.props.addTranslation(require("../../../translations/transactionHistory.json"));
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

	mydappwallet.transaction_list({network:this.props.name},function (error, result){
			if(error){
				
			}else {

				var expanded = result.map(x => true);

			  this.setState({...this.state,tableData:result, expanded});
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
		expander: true,
		show: false,
	},
	 
      {
        Header: "#",
        accessor: "id",
        maxWidth: 60,
        className: "text-center",
		Expander: () => { return null; },
		Cell: row =>
          <React.Fragment>{row.index+1}</React.Fragment>
      },
	 
      {
        Header: "Create Date",
        accessor: "date",
        className: "text-center",
        minWidth: 120,
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
		width: 120,
		Cell: row => (
         <Translate id={'transaction-type-'+ row.original.type} data={row.original}/>
        ),
      },
      {
        Header: "Amount",
        accessor: "value",
        className: "text-center",

		Cell: row => (
     		<div>{utils.fromWei(row.original.value.toString())} {row.original.symbol}</div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        className: "text-center",
		width: 100,
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
     
    ];

    return (
      <Container className=" pb-4">
      


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


            <div className="">
              <ReactTable
cell
                columns={tableColumns}
                data={tableData}
                pageSize={pageSize}
                showPageSizeOptions={false}
                resizable={false}
				expanded={this.state.expanded}
				SubComponent={row => {
					
				    return (
				       <Collapse open={row.index === this.state.selected}>
				     	 <Transaction uid={row.original.uid} />
							
				      </Collapse>
				    )
				  }}
				getTrProps={(state, rowInfo) => {
				  if (rowInfo && rowInfo.row) {
				    return {
				      onClick: (e) => {
									if(this.state.selected===rowInfo.index ){
							this.setState({
				          		selected: undefined
				        	}) 
						} else {
						
				        this.setState({
				          selected: rowInfo.index
				        })
						}
				      },
				      style: {
				        background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
				        color: rowInfo.index === this.state.selected ? 'white' : 'black'
				      }
				    }
				  }else{
				    return {}
				  }
				}
				}
				
				

              />
            </div>


      </Container>
    );
  }
}
export default withLocalize(History);

