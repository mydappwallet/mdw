import styled from "styled-components";
import Uploader from "./Uploader";
import ImagePreview from "./ImagePreview";

const Avatar = styled.div `
    display: flex;
    justify-content: center;



`;

Avatar.Uploader = Uploader;
Avatar.Preview = ImagePreview;

export default Avatar;