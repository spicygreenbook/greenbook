import { useState, useEffect, useRef } from "react";
import Icons from "./Icons";
import menu from "../css/menu.module.css";

export default function Header(props) {
    const { mode } = props;
    const [open, setOpen] = useState(false);

    let style =
        mode === "content"
            ? {
                  color: "#828282",
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  marginTop: -16,
                  width: 32,
                  cursor: "pointer",
              }
            : {
                  color: "#fff",
                  position: "absolute",
                  right: 20,
                  top: 20,
                  width: 32,
                  cursor: "pointer",
                  zIndex: 3
              };

    useEffect(() => {
        console.log("open is", open);
        document
            .querySelector("#page")
            .setAttribute("data-menu", open ? "1" : "");
    }, [open]);

    const toggleMenu = (e) => {
        setOpen(!open);
    };

    return (
        <div>
            {(open || !open) && (
                <div className={menu.menu} data-menu={open ? "1" : ""}>
                    {open && (
                        <span onClick={toggleMenu}>
                            <Icons type="close" style={{position: 'absolute', top: 20, right: 20, width: 32, cursor: 'pointer'}} color="#828282" />
                        </span>
                    )}
                    <div style={{margin: 20}} />
                    <div>
                        <a className="link" href="/donate">
                            Donate
                        </a>
                    </div>
                    <div>
                        {/*<a className="link" href="/our-process">Our Process</a>*/}
                    </div>
                    <div>
                        <a className="link" href="/volunteer">
                            Volunteer
                        </a>
                    </div>
                    <div>
                        <a className="link" href="/updates">
                            Latest Updates
                        </a>
                    </div>
                    <div>
                        <a className="link" target="_blank" href="/add">
                            Add Your Listing
                        </a>
                    </div>
                </div>
            )}
            <div
                className={menu.pageCover}
                onClick={toggleMenu}
                data-menu={open ? "1" : ""}
            />
            <span onClick={toggleMenu}>
                <Icons type="menu" style={style} color={style.color} />
            </span>
        </div>
    );
}
