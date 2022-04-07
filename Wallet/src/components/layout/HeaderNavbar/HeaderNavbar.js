import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Nav, Collapse } from "shards-react";

import { Store } from "../../../flux";
import MenuItem from "./MenuItem";
import * as roleMatcher from '../../../utils/roleMatcher';
class HeaderNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false
    };

    this.onChange = this.onChange.bind(this);
  }


  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      menuVisible: Store.getMenuState(),
    });
  }

  render() {
	 const {mydappwallet} = window;
    	let userRoles = [];
      const user = mydappwallet.user;
      if(user) {
        userRoles = user.roles;
        
      }
	
    const { items } = this.props;
    return (
      <Collapse className="header-navbar d-lg-flex p-0 bg-white border-top" open={this.state.menuVisible}>
        <Container>
          <Row>
            <Col>
              <Nav tabs className="border-0 flex-column flex-lg-row">
                {items.map((item, idx) => (
				       item.authorize  && roleMatcher.rolesMatched(item.authorize, userRoles) === false?(null):<MenuItem key={idx} item={item} />
                ))}
              </Nav>
            </Col>
          </Row>
        </Container>
      </Collapse>
    );
  }
}


HeaderNavbar.propTypes = {
  /**
   * The array of header navbar items.
   */
  items: PropTypes.array
};

export default HeaderNavbar;
