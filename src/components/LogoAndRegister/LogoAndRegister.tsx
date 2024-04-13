import './LogoAndRegister.scss';
import { useEffect, useRef } from 'react';
import Logo from '/images/Logo.svg';
import CustomToolTip from '../CustomToolTIp/CustomToolTip';

type LogoAndRegisterProps = {
  scrollContainerRef: React.RefObject<HTMLElement>;
  fakeLogoRef: React.RefObject<HTMLImageElement>;
  fakeRegisterRef: React.RefObject<HTMLDivElement>;
  navRef: React.RefObject<HTMLDivElement>;
  registerClosed: boolean;
};

export default function LogoAndRegister({
  scrollContainerRef,
  fakeLogoRef,
  fakeRegisterRef,
  navRef,
  registerClosed
}: LogoAndRegisterProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const registerRef = useRef<HTMLImageElement>(null);
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    let fakeLogoInfo: DOMRect | undefined = undefined;
    let initialLogoWidth = 0;
    const navRightValue = navRef.current
      ? parseInt(
          window.getComputedStyle(navRef.current).getPropertyValue('right')
        )
      : 0;

    const fakeRegisterInfo = fakeRegisterRef.current?.getBoundingClientRect();
    const registerInfo = registerRef.current?.getBoundingClientRect();
    const initialRegisterWidth = registerInfo!.width;

    if (logoRef.current && fakeLogoRef.current) {
      fakeLogoRef.current.onload = () => {
        console.log('onload triggered');
        fakeLogoInfo = fakeLogoRef.current!.getBoundingClientRect();
        initialLogoWidth =
          parseInt(window.getComputedStyle(fakeLogoRef.current!).width) || 0;
        logoRef.current!.style.width = initialLogoWidth + 'px';
        logoRef.current!.style.transform = `translate(${fakeLogoInfo.x}px, ${fakeLogoInfo.y - 20}px)`;
        logoRef.current!.style.opacity = '1';
        setTimeout(() => {
          logoRef.current!.style.transition =
            'transform 0.4s ease-out, scale 0.4s ease-out';
        }, 500);
      };
    }

    if (registerRef.current && fakeRegisterInfo) {
      registerRef.current.style.transform = `translate(${fakeRegisterInfo.x}px, ${fakeRegisterInfo.y}px)`;
      registerRef.current.style.opacity = registerClosed ? '0.5' : '1';
      setTimeout(() => {
        registerRef.current!.style.transition = 'transform 0.4s ease-out';
      }, 500);
    }

    if (scrollContainerRef.current && logoRef.current) {
      scrollContainerRef.current.addEventListener('scroll', () => {
        const scrollPosition = scrollContainerRef.current!.scrollTop;
        if (scrollPosition > lastScrollTopRef.current) {
          // Scrolling Down
          if (scrollPosition < window.innerHeight / 8) return;

          const logoScaleFactor = 0.5;
          const registerScaleFactor = Math.min(
            (window.innerWidth * 1.2) / 1920,
            1
          );
          logoRef.current!.style.transform = `translate(${window.innerWidth - (initialLogoWidth * logoScaleFactor * (1 + (1 - logoScaleFactor)) + navRightValue)}px) scale(${logoScaleFactor})`;
          registerRef.current!.style.transform = `translate(${window.innerWidth - (initialRegisterWidth * registerScaleFactor * (1 + (1 - registerScaleFactor)) + navRightValue)}px,
           ${window.innerHeight - (registerInfo!.height + 30)}px) scale(${registerScaleFactor})`;
        } else if (scrollPosition < window.innerHeight / 2) {
          // Scrolling Up
          logoRef.current!.style.scale = '1';
          if (fakeLogoInfo) {
            logoRef.current!.style.transform = `translate(${fakeLogoInfo?.x}px, ${fakeLogoInfo?.y - 20}px)`;
          }
          if (fakeRegisterInfo) {
            registerRef.current!.style.transform = `translate(${fakeRegisterInfo?.x}px, ${fakeRegisterInfo?.y}px)`;
          }
        }
        lastScrollTopRef.current = scrollPosition <= 0 ? 0 : scrollPosition;
      });
    }
  }, [
    fakeLogoRef,
    scrollContainerRef,
    fakeRegisterRef,
    navRef,
    registerClosed
  ]);

  return (
    <div className="logo-and-register">
      <img ref={logoRef} src={Logo} alt="Design Frontiers Logo" />
      <div
        data-tooltip-id={`register-tooltip`}
        data-tooltip-content={'Registration is closed.'}
        data-tooltip-place="top"
        className="register-button disabled"
        ref={registerRef}
      >
        <a
          className={`button parallelogram ${registerClosed ? 'disabled' : ''}`}
          href={
            registerClosed
              ? 'javascript:;'
              : 'https://forms.gle/3vDkncYXUpMrX7D17'
          }
          target={registerClosed ? '_self' : '_blank'}
          rel="noreferrer"
          aria-disabled={registerClosed}
        >
          <span className="skew-fix">REGISTER NOW</span>
        </a>
      </div>
      <CustomToolTip
        id="register-tooltip"
        place="top"
        content="Registration is closed."
      />
    </div>
  );
}
