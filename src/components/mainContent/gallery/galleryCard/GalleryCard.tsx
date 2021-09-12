import { Card, CardContent, CardMedia, Grid, Checkbox } from "@material-ui/core"
import UncheckedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import CheckedIcon from '@material-ui/icons/Favorite';
import c from './galleryCard.module.css';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

type Props = {
    src: string
    name: string
    isLiked: boolean
    updateIsLiked: (isLiked: boolean, name: string) => void
    deleteGalleryCard: (name: string, img: string) => void
};

let GalleryCard = ({src, name, isLiked, updateIsLiked, deleteGalleryCard}: Props) => {

    let onLikeClick = async () => {
        updateIsLiked(!isLiked, name);
    }

    return <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
        <Card>
            <CardMedia className={c.cardImg} image={src} />
            <CardContent className={c.content}>
                <DeleteIcon className={c.trash} onClick={() => deleteGalleryCard(name, src)} />
                <p className={c.name}>{name}</p>
                <Checkbox checked={isLiked} onClick={onLikeClick} className={c.like} checkedIcon={<CheckedIcon className={c.checked} />} icon={<UncheckedIcon className={c.unchecked} />} />
            </CardContent>
        </Card>
    </Grid>
}

export default GalleryCard;