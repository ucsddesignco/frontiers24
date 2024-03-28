import './Hamburger.scss';

type HamburgerProps = {
  isHamburgerOpen: boolean;
  toggleHamburger: () => void;
};

export default function Hamburger({
  isHamburgerOpen,
  toggleHamburger
}: HamburgerProps) {
  return (
    <>
      <button
        className={`mobile-nav hamburger hamburger--spin ${
          isHamburgerOpen ? 'is-active' : ''
        }`}
        onClick={() => {
          toggleHamburger();
        }}
        aria-label={isHamburgerOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isHamburgerOpen}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      <div
        className={`dark_overlay ${isHamburgerOpen ? 'is-active' : ''}`}
        onClick={() => {
          toggleHamburger();
        }}
      ></div>
    </>
  );
}
