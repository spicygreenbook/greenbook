import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
        <div
            id="menuContainer"
            className={menu.container}
            data-menu={open ? "1" : ""}
        >
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
                        <Link href="/">
                            <a className="link" style={{ fontSize: 24 }}>
                                Spicy Green Book
                            </a>
                        </Link>
                    </li>
                    <li>
                        <a className="socialIcons" href="https://www.instagram.com/spicygreenbook/" target="_blank">
                            <Icons type="instagram" color="#B56230" className="ib middle" style={{width: 24, height: 24}} />
                        </a>
                        <a className="socialIcons" href="https://www.facebook.com/SpicyGreenBook/" target="_blank">
                            <Icons type="facebook" color="#B56230" className="ib middle" style={{width: 24, height: 24}} />
                        </a>
                        <a className="socialIcons" href="https://twitter.com/spicygreenbook" target="_blank">
                            <Icons type="twitter" color="#B56230" className="ib middle" style={{width: 24, height: 24}} />
                        </a>
                        <a className="socialIcons" href="https://www.linkedin.com/company/spicy-green-book/" target="_blank">
                            <Icons type="linkedin" color="#B56230" className="ib middle" style={{width: 24, height: 24}} />
                        </a>
                    </li>
                    <li>
                        <Link href="/donate">
                            <a className="link">Donate</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <a className="link">About Us</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/staff">
                            <a className="link">Staff</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process">
                            <a className="link">Our Process</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/volunteer">
                            <a className="link">Volunteer</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/updates">
                            <a className="link">Latest Updates</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/press">
                            <a className="link">Press</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/add">
                            <a className="link">Add Your Listing</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <a className="link">Contact Us</a>
                        </Link>
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
