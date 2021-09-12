import { Modal, TextField, Button, Grid } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import c from './modals.module.css';

type Props = {
    addGalleryCard: (img: File, name: string) => void
    closeModal: () => void
};

let AddGalleryCardModal = ({ addGalleryCard, closeModal }: Props) => {

    let [img, setImg] = useState<File>({} as File);
    let [name, setName] = useState('');

    let saveButton = () => {
        addGalleryCard(img, name);
        closeModal();
    };

    let onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            setImg(e.target.files[0]);
        };
    };

    let onCloseModal = () => {
        closeModal();
        setImg({} as File);
        setName('');
    };

    return <Modal className={`${c.modalContainer} ${c.addGalleryCardModal}`} onClose={onCloseModal} open={true} >
        <Grid className={c.gridContainer} container direction='column' justifyContent='center' alignItems='center'>
            <div className={c.modal}>
                <Grid item>
                    <h2 className={c.sign}>Добавить карточку в галлерею</h2>
                </Grid>
                <Grid item>
                    <Button fullWidth={true} component='label' variant='contained'>Выбрать фотографию <input type='file' onChange={onInputChange} hidden /></Button>
                    <div>{img.name}</div>
                </Grid>
                <Grid item>
                    <TextField error={name.length >= 16} inputProps={{maxLength: 16}} fullWidth={true} label='Название' value={name} onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid className={c.buttonContainer} item>
                    <Button disabled={name.length === 0 || name.length > 16 || !img.name} fullWidth={true} className={c.saveButton} onClick={saveButton} variant='contained'>Сохранить</Button>
                </Grid>
            </div>
        </Grid>
    </Modal>
};

export default AddGalleryCardModal;