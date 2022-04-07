import React from "react";
import styled from "styled-components";

const Uploader = styled.input`
    display: block;
    opacity: 0;
    border-radius: 50%;
    position: absolute;
    width: ${props => props.size ? props.size + 'px' : '150px'};
    height: ${props => props.size ? props.size + 'px' : '150px'};
    cursor: pointer;
    z-index: 2;
`

const UploaderComponent = ({fileType, disabled, onChange}) => (
      <label className="edit-user-details__avatar__change">
                            <i className="material-icons mr-1">&#xE439;</i>
    <Uploader id="profileImage" onChange={onChange} disabled={disabled} type="file" accept={fileType || "image/*"}/>
      </label>

);

export default UploaderComponent;