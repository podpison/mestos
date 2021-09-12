import c from './gallery.module.css';
import { Grid } from "@material-ui/core"
import GalleryCard from './galleryCard/GalleryCard';
import { GalleryCardType } from '../../../redux/mainContentReducer';

type Props = {
    galleryCards: Array<GalleryCardType>
    updateIsLiked: (isLiked: boolean, name: string) => void
    deleteGalleryCard: (name: string, img: string) => void
}  

let Gallery = ({deleteGalleryCard, galleryCards, updateIsLiked}: Props) => {
    let Card = galleryCards.map(c => <GalleryCard deleteGalleryCard={deleteGalleryCard} updateIsLiked={updateIsLiked} name={c.name} src={c.src} isLiked={c.isLiked} key={c.name} />);

    return <div className={c.galleryContainer}>
        <Grid container spacing={1}>
            {Card}
        </Grid>
    </div>
};

export default Gallery;