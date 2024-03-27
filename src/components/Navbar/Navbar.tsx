import { useState } from "react";
import Hamburger from "../Hamburger/Hamburger";
import "./Navbar.scss";
import HamrburgerPlanet from "../Hamburger/HamrburgerPlanet";

export default function Navbar() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const links = [
    { onClick: () => {}, text: "Home" },
    { onClick: () => {}, text: "FAQ" },
    { onClick: () => {}, text: "Timeline" },
    { onClick: () => {}, text: "Judges" },
  ];

  const toggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);

    if (!isHamburgerOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsHamburgerOpen(false);
          document.body.style.overflow = "auto";
          document.removeEventListener("keydown", handleKeyDown);
        }
      };
      document.querySelector("main")?.setAttribute("aria-hidden", "true");
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.querySelector("main")?.removeAttribute("aria-hidden");
    }
  };

  return (
    // prettier-ignore
    <nav role='navigation'>
      {/* Desktop Nav */}
      <svg className="desktop-nav" width="44" height="284" viewBox="0 0 44 284" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_853_10144)">
        <rect x="44" width="44" height="44" rx="22" transform="rotate(90 44 0)" fill="#F1F1F1"/>
        <rect x="38.5" y="5.5" width="33" height="33" rx="16.5" transform="rotate(90 38.5 5.5)" fill="#F1F1F1" stroke="#090921" strokeWidth="3"/>
        <path d="M22 54L22 84" stroke="#F1F1F1" strokeWidth="3" strokeDasharray="10 10"/>
        <rect x="35.5" y="95.5" width="27" height="27" rx="13.5" transform="rotate(90 35.5 95.5)" stroke="#F1F1F1" strokeWidth="3"/>
        <path d="M22 134L22 164" stroke="#F1F1F1" strokeWidth="3" strokeDasharray="10 10"/>
        <rect x="35.5" y="175.5" width="27" height="27" rx="13.5" transform="rotate(90 35.5 175.5)" stroke="#F1F1F1" strokeWidth="3"/>
        <path d="M22 214L22 244" stroke="#F1F1F1" strokeWidth="3" strokeDasharray="10 10"/>
        <rect x="35.5" y="255.5" width="27" height="27" rx="13.5" transform="rotate(90 35.5 255.5)" stroke="#F1F1F1" strokeWidth="3"/>
        </g>
        <defs>
        <clipPath id="clip0_853_10144">
        <rect width="284" height="44" fill="white" transform="matrix(0 1 -1 0 44 0)"/>
        </clipPath>
        </defs>
      </svg>

      {/* Mobile Nav */}
      <Hamburger isHamburgerOpen={isHamburgerOpen} toggleHamburger={toggleHamburger}/>

      <a className="mobile-nav dco-logo" href="https://ucsddesign.co/" target="_blank" rel="noopener noreferrer" aria-label="Design Co Logo">
        <svg  width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6593 9.59222C12.0735 8.6999 12.2643 7.6488 12.2643 6.34154C12.2643 5.03428 12.0735 3.98318 11.6593 3.09085C10.7672 1.11567 8.79118 0 5.89236 0H0.699707V12.6513H5.92415C8.79118 12.6513 10.7354 11.5356 11.6593 9.59222ZM3.4396 10.3893V2.2631H5.44631C7.26231 2.2631 8.37691 2.86856 8.8876 4.04774C9.17472 4.65321 9.30186 5.35395 9.30186 6.31084C9.30186 7.29843 9.17472 8.00022 8.8876 8.57394C8.37797 9.72136 7.29515 10.3586 5.44631 10.3586H3.4396V10.3893Z" fill="#FF671E"/>
          <path d="M8.69751 25.9074C8.12432 26.3858 7.35935 26.6727 6.37189 26.6727C4.93837 26.6727 3.91912 26.099 3.37666 24.9833C3.05774 24.3143 2.96239 23.4855 2.96239 22.3698C2.96239 21.2224 3.08953 20.4264 3.37666 19.7564C3.88628 18.6725 4.87374 18.067 6.37189 18.067C7.35935 18.067 8.09253 18.3221 8.66572 18.7995C9.17535 19.2779 9.49426 19.9152 9.52605 20.744H12.4249C12.3613 19.2779 11.8199 18.0352 10.7678 17.1429C9.71676 16.2188 8.21861 15.6769 6.4344 15.6769C3.56737 15.6769 1.59138 16.8878 0.635705 18.9276C0.222497 19.9162 0 21.0319 0 22.3381C0 23.6771 0.190712 24.7917 0.66855 25.7475C1.62423 27.8191 3.632 28.9982 6.49903 28.9982C8.28324 28.9982 9.8439 28.488 10.896 27.5322C11.8517 26.7034 12.4566 25.4607 12.4895 24.0264H9.55783C9.52605 24.8245 9.20713 25.4617 8.69751 25.9074Z" fill="#FF671E"/>
          <path d="M27.3362 18.8976C26.4123 16.9213 24.4374 15.7104 21.5693 15.7104C18.7012 15.7104 16.7263 16.9213 15.7706 18.9293C15.3245 19.9169 15.1021 21.0961 15.1021 22.3716C15.1021 23.6778 15.3245 24.857 15.8034 25.8128C16.7591 27.8208 18.7023 29 21.5704 29C24.4384 29 26.3816 27.8208 27.3373 25.8128C27.8151 24.857 28.0387 23.646 28.0387 22.3388C28.0376 21.0326 27.814 19.8852 27.3362 18.8976ZM24.6599 24.857C24.1503 25.9409 23.1946 26.6099 21.6011 26.6099C20.0076 26.6099 19.0201 25.9409 18.5105 24.857C18.1916 24.1562 18.0644 23.3909 18.0644 22.3398C18.0644 21.2877 18.1916 20.5234 18.5105 19.8227C19.0201 18.7388 20.0076 18.0698 21.5693 18.0698C23.1628 18.0698 24.1503 18.7388 24.6599 19.8227C25.0106 20.5234 25.1059 21.2887 25.1059 22.3398C25.1059 23.3909 24.9788 24.188 24.6599 24.857Z" fill="#FF671E"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M24.1842 0.343811H27.1168V0.343988H27.1201V3.27657H27.1168V11.5243H24.1842V5.34533L16.7426 12.7869L14.6689 10.7133L22.1056 3.27657H15.9396V0.343988H24.1842V0.343811Z" fill="#FF671E"/>
        </svg>
      </a>

      <ul
          className={isHamburgerOpen ? 'panel-open is-active' : 'panel-close'}
        >
          <HamrburgerPlanet />
          {links.map(link => (
            <li key={link.text}>
              <button onClick={link.onClick}>{link.text}</button>
            </li>
          ))}
        </ul>
    </nav>
  );
}
