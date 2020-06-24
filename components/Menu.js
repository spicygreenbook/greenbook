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
                  top: 34,
                  width: 32,
                  cursor: "pointer",
              }
            : {
                  color: "#fff",
                  position: "absolute",
                  right: 20,
                  top: 75,
                  width: 32,
                  cursor: "pointer",
                  zIndex: 3,
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
        <div id="menuContainer" className={menu.container} data-menu={open ? "1" : ""}>
            <span
                className={menu.iconOpened}
                data-menu={open ? "1" : ""}
                style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    width: 32,
                    cursor: "pointer",
                }}
                onClick={toggleMenu}
            >
                <Icons type="close" style={{ width: 32 }} color="#828282" />
            </span>
            {(open || !open) && (
                <ul className={menu.menu} data-menu={open ? "1" : ""}>
                    <li>
                        <a className="link" href="/" style={{ fontSize: 24 }}>
                            Spicy Green Book
                        </a>
                    </li>
                    <li>
                        <a className="link" href="/donate">
                            Donate
                        </a>
                    </li>
                    <li>
                        <a className="link" href="/about">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a className="link" href="/our-process">
                            Our Process
                        </a>
                    </li>
                    <li>
                        <a className="link" href="/volunteer">
                            Volunteer
                        </a>
                    </li>
                    <li>
                        <a className="link" href="/updates">
                            Latest Updates
                        </a>
                    </li>
                    <li>
                        <a className="link" href="/add">
                            Add Your Listing
                        </a>
                    </li>
                </ul>
            )}
            <div
                className={menu.pageCover}
                onClick={toggleMenu}
                data-menu={open ? "1" : ""}
            />
            <span
                className={menu.iconClosed}
                data-menu={open ? "1" : ""}
                onClick={toggleMenu}
                style={style}
            >
                <Icons type="menu" style={{ width: 32 }} color={style.color} />
            </span>
        </div>
    );
}
