import React from "react";
import PropTypes from "prop-types";
import { Translate } from "react-localize-redux";
import {
	Container,
	Alert,

} from "shards-react";

const Message = ({ error, info, theme, ...attrs }) => {
	return (
		<Container id="error" fluid className="px-0">

			<Alert theme={theme} className="mb-0">
				{error && error.code && <React.Fragment>{error.code} - <Translate id={"error-" + error.code} data={error.data}/></React.Fragment>}
				{info && info.code && <React.Fragment>{info.code} - <Translate id={"info-" + info.code} data={info.data}/></React.Fragment>}
			</Alert>

		</Container>
	)
};

Message.propTypes = {
	/**
	 * The page title.
	 */
	error: PropTypes.object,
	info: PropTypes.object,

};


export default Message;
