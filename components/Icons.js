
export default function Icons(props) {
    if (props.type === 'right') {
         return (
            <svg style={props.style || {}} fill={props.color || '#000'} style={{width: '100%', height: '100%'}} viewBox="0 0 404.258 404.258">
                <polygon points="138.331,0 114.331,18 252.427,202.129 114.331,386.258 138.331,404.258 289.927,202.129" />
            </svg>
         );
    } else if (props.type === 'left') {
         return (
            <svg style={props.style || {}} fill={props.color || '#000'} style={{width: '100%', height: '100%'}} viewBox="0 0 404.258 404.258">
                <polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 "/>
            </svg>
         );
    } else if (props.type === 'close') {
         return (
           <svg viewBox="0 0 14 14">
            <g style={props.style || {}} fill="none" fillRule="evenodd"  stroke="none" strokeWidth="1">
                <g fill={props.color || '#000'} transform="translate(-341.000000, -89.000000)">
                    <g id="close" transform="translate(341.000000, 89.000000)">
                        <path d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z" />
                    </g>
                </g>
            </g>
            </svg>
         );
    } else if (props.type === 'scrollDown') {
         return (
            <svg style={props.style || {}} viewBox="4 4 12 12">
              <g transform="translate(-306.127 377) rotate(-90)">
                <path fill={props.color || '#000'} d="M2.646,6.054,6.792,1.907a1.136,1.136,0,0,0,0-1.534,1.136,1.136,0,0,0-1.534,0L.373,5.316h0a1.136,1.136,0,0,0,0,1.534l4.885,4.885a1.1,1.1,0,0,0,.742.34.916.916,0,0,0,.738-.341,1.136,1.136,0,0,0,0-1.534Z" transform="translate(362.91 310.05)"/>
              </g>
            </svg>
         );
    } else {
        return (<span>no icon</span>)
    }
}
