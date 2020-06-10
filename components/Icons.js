
export default function Icons(props) {
    if (props.type === 'right') {
         return (
            <svg fill={props.color || '#000'} style={{width: '100%', height: '100%'}} viewBox="0 0 404.258 404.258">
                <polygon points="138.331,0 114.331,18 252.427,202.129 114.331,386.258 138.331,404.258 289.927,202.129" />
            </svg>
         );
    } else if (props.type === 'left') {
         return (
            <svg fill={props.color || '#000'} style={{width: '100%', height: '100%'}} viewBox="0 0 404.258 404.258">
                <polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 "/>
            </svg>
         );
    } else if (props.type === 'close') {
         return (
           <svg viewBox="0 0 14 14">
            <g fill="none" fill-rule="evenodd"  stroke="none" stroke-width="1">
            <g fill={props.color || '#000'} transform="translate(-341.000000, -89.000000)">
            <g id="close" transform="translate(341.000000, 89.000000)">
                <path d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z" />
            </g>
            </g>
            </g>
            </svg>
         );
    } else {
        return (<span>no icon</span>)
    }
}
