import listingMedia from "../css/listingMedia.module.css";

export default function Header(props) {
    const { content } = props;
    const images = content.images;
    return (
        <div className={listingMedia.wrapper}>
            <div className={listingMedia.container}>
                {images && images.map((image, i) => (
                    <span
                        key={i}
                        className={listingMedia.item}
                        style={{ backgroundImage: `url(${image.url})` }}
                    />
                ))}
            </div>
            <div className={listingMedia.showAll}>See All {images.length}</div>
        </div>
    );
}