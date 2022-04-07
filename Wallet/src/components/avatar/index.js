import React, {Component} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import Avatar from './Avatar';

import defaultPlaceholder from "./static/assets/upload_icon.png"
const { create } = require('ipfs-http-client');
const IPFS_URL = '/dnsaddr/ipfs.infura.io/tcp/5001/https';
const IPFS_GATEWAY = 'https://ipfs.infura.io/ipfs/';
export default class AvatarUploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentImage: null,
            loading: false
        }

        this.uploadImage = this
            .uploadImage
            .bind(this);
        this.onImageChange = this
            .onImageChange
            .bind(this);
    }
    async uploadImage(avatar) {
        const {ipfsURL, onStart, onProgress, onFinished, name, customHeaders, withCredentials} = this.props;
        if (ipfsURL) {
            try {
                if (onStart && typeof onStart === 'function') {
                    onStart();
                }
                this.setState({loading: true});
                const ipfs = create(ipfsURL);
                const { cid } = await ipfs.add(avatar);
                this.setState({loading: false});
                 onFinished(false, IPFS_GATEWAY + cid);

                

            } catch (err) {

                alert(err.message);
                this.setState({loading: false})
                if (onFinished && typeof onFinished === 'function') {
                    onFinished(err);
                }
            }
        }
    }
    onImageChange(e) {
        const imageToUpload = e.target.files[0];
        const reader = new FileReader();
        reader.onload = avatar => this.setState({currentImage: avatar.target.result});
        reader.readAsDataURL(imageToUpload);

        this.uploadImage(imageToUpload);
    }
    render() {
        const {disabled, size, defaultImg, fileType, placeholder} = this.props;
        const {currentImage} = this.state;
        return (
            <Avatar placeholder={placeholder} size={size}>
                {(currentImage || defaultImg)
                    ? <Avatar.Preview src={currentImage || defaultImg}/>
                    : null}
                <Avatar.Uploader
                    fileType={fileType}
                    onChange={this.onImageChange}
                    disabled={disabled}/>
            </Avatar>
        )
    }
}

AvatarUploader.propTypes = {
    ipfsURL: PropTypes.string.isRequired,
    onFinished: PropTypes.func,
    onStart: PropTypes.func,
    onProgress: PropTypes.func,
    placeholder: PropTypes.string,
    withCredentials: PropTypes.bool,
    customHeaders: PropTypes.object,
    disabled: PropTypes.bool,
    fileType: PropTypes.string,
    size: PropTypes.number,
    defaultImg: PropTypes.string,
    name: PropTypes.string.isRequired
}

AvatarUploader.defaultProps = {
    disabled: false,
    placeholder: defaultPlaceholder,
    withCredentials: false,
    fileType: "image/jpeg",
    size: 150
};