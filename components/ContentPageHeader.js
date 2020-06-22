import Icons from "./Icons";

export default function Header(props) {
    return (
        <div style={{padding: '40px 20px', background: '#fff'}}>
            <div className="content" style={{position: 'relative'}}>
                <a className="buttonBack" href="/" style={{whiteSpace: 'nowrap', marginBottom: 40}}>
                    <Icons type="left" color="#B56230" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginRight: 20}} />
                    <span style={{display: 'inline-block', verticalAlign: 'middle'}}>
                        Spicy Green Book
                    </span>
                </a>
            </div>
        </div>
   );
}