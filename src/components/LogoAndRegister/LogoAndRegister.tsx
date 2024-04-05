import './LogoAndRegister.scss';
import { useEffect, useRef } from 'react';
import Logo from '/images/Logo.svg';

type LogoAndRegisterProps = {
  scrollContainerRef: React.RefObject<HTMLElement>;
  fakeLogoRef: React.RefObject<HTMLImageElement>;
  fakeRegisterRef: React.RefObject<HTMLDivElement>;
  navRef: React.RefObject<HTMLDivElement>;
  logoLoaded: boolean;
};

export default function LogoAndRegister({
  scrollContainerRef,
  fakeLogoRef,
  fakeRegisterRef,
  navRef,
  logoLoaded
}: LogoAndRegisterProps) {
  //Temporarily disable animation
  // return;

  const logoRef = useRef<HTMLImageElement>(null);
  const registerRef = useRef<HTMLImageElement>(null);
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    if (!logoLoaded) return;
    const fakeLogoInfo = fakeLogoRef.current?.getBoundingClientRect();
    const logoInfo = logoRef.current?.getBoundingClientRect();
    const initialLogoWidth = logoInfo!.width || 0;
    // const initialLogoWidth =
    //   parseInt(
    //     window.getComputedStyle(fakeLogoRef.current!).getPropertyValue('width')
    //   ) || 0;
    const navRightValue = navRef.current
      ? parseInt(
          window.getComputedStyle(navRef.current).getPropertyValue('right')
        )
      : 0;

    const fakeRegisterInfo = fakeRegisterRef.current?.getBoundingClientRect();
    const registerInfo = registerRef.current?.getBoundingClientRect();
    const initialRegisterWidth = registerInfo!.width;

    if (logoRef.current && fakeLogoInfo && fakeLogoRef.current) {
      logoRef.current.style.width = initialLogoWidth + 'px';
      logoRef.current.style.transform = `translate(${fakeLogoInfo.x}px, ${fakeLogoInfo.y - 20}px)`;
      logoRef.current.style.opacity = '1';
      setTimeout(() => {
        logoRef.current!.style.transition =
          'transform 0.4s ease-out, scale 0.4s ease-out';
      }, 500);
    }

    if (registerRef.current && fakeRegisterInfo) {
      registerRef.current.style.transform = `translate(${fakeRegisterInfo.x}px, ${fakeRegisterInfo.y}px)`;
      registerRef.current.style.opacity = '1';
      setTimeout(() => {
        (registerRef.current!.style.transition = 'transform 0.4s ease-out'), 0;
      });
    }

    if (scrollContainerRef.current && logoRef.current) {
      scrollContainerRef.current.addEventListener('scroll', () => {
        const st = scrollContainerRef.current!.scrollTop;
        if (st > lastScrollTopRef.current && st > window.innerHeight / 2) {
          // Scrolling Down
          const logoScaleFactor = 0.5;
          const registerScaleFactor = 0.7;
          logoRef.current!.style.transform = `translate(${window.innerWidth - (initialLogoWidth * logoScaleFactor * (1 + (1 - logoScaleFactor)) + navRightValue)}px) scale(${logoScaleFactor})`;
          registerRef.current!.style.transform = `translate(${window.innerWidth - (initialRegisterWidth * registerScaleFactor * (1 + (1 - registerScaleFactor)) + navRightValue)}px,
           ${window.innerHeight - (registerInfo!.height + 30)}px) scale(${registerScaleFactor})`;
        } else if (st < window.innerHeight / 2) {
          // Scrolling Up
          logoRef.current!.style.scale = '1';
          if (fakeLogoInfo) {
            logoRef.current!.style.transform = `translate(${fakeLogoInfo?.x}px, ${fakeLogoInfo?.y - 20}px)`;
          }
          if (fakeRegisterInfo) {
            registerRef.current!.style.transform = `translate(${fakeRegisterInfo?.x}px, ${fakeRegisterInfo?.y}px)`;
          }
        }
        lastScrollTopRef.current = st <= 0 ? 0 : st;
      });
    }
  }, [logoLoaded, fakeLogoRef, scrollContainerRef, fakeRegisterRef, navRef]);

  return (
    <div className="logo-and-register">
      <img ref={logoRef} src={Logo} alt="Design Frontiers Logo" />
      <div className="register-button" ref={registerRef}>
        <a
          className="button parallelogram"
          href="https://forms.gle/3vDkncYXUpMrX7D17"
          target="_blank"
          rel="noreferrer"
        >
          <span className="skew-fix">REGISTER NOW</span>
        </a>
      </div>
    </div>
  );
}
