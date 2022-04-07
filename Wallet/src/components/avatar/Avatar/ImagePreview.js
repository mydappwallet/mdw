import React from "react";
import {
 Button,
  FormInput,
 
} from "shards-react";



const ImagePreview = (props) => (
<React.Fragment>
  <div className="edit-user-details__avatar m-auto">
                          <img
                            src={props.src}
                            alt="User Avatar"
                          />
                         </div>
  
                        </React.Fragment>
)

export default ImagePreview;