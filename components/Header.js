
export default function Header(props) {
    return (
        <div style={{padding: "0 4%"}}>
            <form method="GET" action="/search">
                <span className="top-grid" style={{maxWidth: '20%'}}>
                    <a className="top-grid" href="/"><img src="/safari-pinned-tab.svg" height="80" /></a>
                </span>
                <span className="top-grid" style={{paddingLeft: 20, maxWidth: '80%'}}>
                    <span className="top-grid">
                        <input
                            style={{boxShadow: 'none'}}
                            type="search"
                            size="14"
                            name="query"
                            placeholder="Search"
                            value={props.search}
                            onChange={(e) => {
                                let value = e.target.value;
                                props.setSearch(value);
                            }}
                        />
                    </span>
                    <span className="top-grid">
                        <select
                            style={{boxShadow: 'none'}}
                            name="neighborhood"
                            value={props.neighborhood.toLowerCase().trim()}
                            onChange={(e) => {
                                let value = e.target.value;
                                props.setNeighborhood(value);
                            }}
                        >
                            <option value="">Show all neighborhoods</option>
                            {props.neighborhoods.map((option) => {
                                return (
                                    <option
                                        key={option}
                                        value={option.toLowerCase().trim()}
                                    >
                                        {option}
                                    </option>
                                );
                            })}
                        </select>
                    </span>
                    <span className="top-grid">
                        <input type="submit" value="GO" style={{boxShadow: 'none'}} />
                    </span>
                </span>
            </form>
        </div>
    );
}