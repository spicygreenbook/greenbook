import { useState, useEffect, useRef } from "react";
import listingMedia from "../css/listingMedia.module.css";
import Icons from "../components/Icons";

const scrollToRef = (fullContainerRef, ref) => {
    let scrollAmount = (ref.current.offsetLeft - fullContainerRef.current.scrollLeft);
    let scrollTop = 0;
    let get_scrollTop = (document.body.scrollTop || document.documentElement.scrollTop);
    if (get_scrollTop != 75) {
        scrollTop = (75 - get_scrollTop)
    }
    //console.log('fullContainerRef', fullContainerRef, 'ref', ref, 'cur scroll', fullContainerRef.scrollLeft, 'offset left', ref.current.offsetLeft, 'scroll top', scrollTop, 'scroll amount', scrollAmount)
    fullContainerRef.current.scrollBy({top: 0, left: scrollAmount, behavior: 'smooth'})
    window.scrollBy({top: scrollTop, left: 0, behavior: 'smooth'})
}

export default function Header(props) {
    const { content } = props;
    const images = content.images;

    let fullContainerRef = useRef(null);
    images.forEach(image => {
        image.ref = useRef(null);
    })

    const [ mode, setMode ] = useState('normal');
    const [ mediaIndex, setMediaIndex ] = useState(null);
    const [ scrolledMediaIndex, setScrolledMediaIndex ] = useState(mediaIndex);
    const [ scrollIgnore, setScrollIgnore ] = useState(false);

    useEffect(
        () => {
            if (images[mediaIndex] && images[mediaIndex].ref) {
                if (typeof window !== 'undefined') {
                    if (!scrollIgnore) {
                        scrollToRef(fullContainerRef, images[mediaIndex].ref)
                    }
                }
            }
        },
        [ mode, mediaIndex ]
    );

    let timer;
    const scrollFunc = (e) => {
        if (!scrollIgnore) {
            let left = e.target.scrollLeft;
            let curIndex = 0;
            images.forEach((image, i) => {
                if ((image.ref.current.offsetLeft - Math.floor(window.innerWidth * 0.5)) <= left) {
                    curIndex = i
                    console.log('hit')
                }
                console.log('image', i, 'offsetleft', image.ref.current.offsetLeft, 'scroll left', left)
            })
            console.log('now scrolled to', curIndex)
            setScrolledMediaIndex(curIndex);
        }
    }

    return (
        <div>
            {(mediaIndex || mediaIndex === 0) && images[mediaIndex] && 
                <div className={listingMedia.wrapperFull}>
                    <div className={listingMedia.containerFull} ref={fullContainerRef} onScroll={scrollFunc}>
                        {images && images.map((image, i) => (
                            <span
                                key={i}
                                className={listingMedia.itemFull}
                                ref={image.ref}
                                style={{ backgroundImage: `url(${image.url})` }}
                            />
                        ))}
                    </div>
                    <div className={listingMedia.leftArrow} onClick={(e) => {
                        let next_i = scrolledMediaIndex > 0 ? (scrolledMediaIndex - 1) : images.length-1
                        setMediaIndex(next_i);
                        setScrolledMediaIndex(next_i);
                    }}>
                        <Icons type="left" color="#fff" />
                    </div>
                    <div className={listingMedia.rightArrow} onClick={(e) => {
                        let next_i = (scrolledMediaIndex+1);
                        if (!images[next_i]) {
                            next_i = 0
                        }
                        setMediaIndex(next_i);
                        setScrolledMediaIndex(next_i);
                    }}>
                        <Icons type="right" color="#fff" />
                    </div>
                    <div className={listingMedia.close} onClick={(e) => {
                        setMediaIndex(null);
                        setScrolledMediaIndex(null);
                        setMode('normal')
                    }}>
                        <Icons type="close" color="#fff" />
                    </div>
                </div>
            }
            <div className={listingMedia.wrapper} data-mode={mode}>
                <div className={listingMedia.container} data-mode={mode}>
                    {images && images.map((image, i) => (
                        <span
                            key={i}
                            className={listingMedia.item}
                            data-active={scrolledMediaIndex === i ? '1' : ''}
                            style={{ backgroundImage: `url(${image.url})`}}
                            data-mode={mode}
                            onClick={(e) => {
                                setMode('full')
                                setMediaIndex(i);
                                setScrolledMediaIndex(i);
                                console.log('click index', i)
                            }}
                        />
                    ))}
                </div>
                <div className={listingMedia.showAll} onClick={(e) => {
                    setMode('grid');
                }} data-mode={mode}>See All {images.length}</div>
                <div className={listingMedia.showClose} onClick={(e) => {
                    setMode('normal');
                }} data-mode={mode}>Close</div>
            </div>
        </div>
    );
}