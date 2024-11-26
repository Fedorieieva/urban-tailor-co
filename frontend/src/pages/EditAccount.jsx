import React, {useState} from "react";
import EditUserInfo from "../components/molecules/EditUserInfo/EditUserInfo.jsx";
import Container from "../components/atoms/Container/Container.jsx";
import ImageUpload from "../components/molecules/ImageUpload/ImageUpload.jsx";
import style from './style.module.scss';
const EditAccount = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Container className={style.editPage}>
            <ImageUpload isProfile={true}/>
            {/*<Button onClick={() => setIsModalOpen(true)}>upload new profile photo</Button>*/}
            <EditUserInfo/>

            {/*{isModalOpen && (<ImageUploadModal onClose={() => setIsModalOpen(false)}/>)}*/}

        </Container>
    );
};

export default EditAccount