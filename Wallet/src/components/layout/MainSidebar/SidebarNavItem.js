import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import {
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownItem,
  Collapse
} from "shards-react";
import { Dispatcher, Constants } from "../../../flux";


class SidebarNavItem extends React.Component {
  constructor(props) {
    super(props);

  }

 

  render() {
    const { item } = this.props;



    return (
      <NavItem style={{ position: "relative" }}>
        <NavLink
        
          tag={RouteNavLink}
          to={ item.to}
        >
          {item.htmlBefore && (
            <div
              className="d-inline-block item-icon-wrapper"
              dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
            />
          )}
          {item.title && <span>{item.title}</span>}
          {item.htmlAfter && (
            <div
              className="d-inline-block item-icon-wrapper"
              dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
            />
          )}
        </NavLink>

      </NavItem>
    );
  }
}

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
