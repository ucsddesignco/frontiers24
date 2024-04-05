import './LogoAndRegister.scss';
import { useEffect, useRef } from 'react';
import Logo from '/Logo.svg';

type LogoAndRegisterProps = {
  scrollContainerRef: React.RefObject<HTMLElement>;
  fakeLogoRef: React.RefObject<HTMLImageElement>;
  fakeRegisterRef: React.RefObject<HTMLDivElement>;
};

export default function LogoAndRegister({
  scrollContainerRef,
  fakeLogoRef,
  fakeRegisterRef
}: LogoAndRegisterProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const registerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fakeLogoInfo = fakeLogoRef.current?.getBoundingClientRect();
    const logoInfo = logoRef.current?.getBoundingClientRect();
    const initialLogoWidth = parseInt(logoInfo!.width);
    // Change to ref in the future
    const navigationElement = document.querySelector('nav');
    const navRightValue = parseInt(
      window.getComputedStyle(navigationElement).getPropertyValue('right')
    );

    const fakeRegisterInfo = fakeRegisterRef.current?.getBoundingClientRect();
    const registerInfo = registerRef.current?.getBoundingClientRect();
    const initialRegisterWidth = parseInt(registerInfo!.width);

    if (logoRef.current && fakeLogoInfo) {
      logoRef.current.style.transform = `translate(${fakeLogoInfo.x}px, ${fakeLogoInfo.y - 10}px)`;
      logoRef.current.style.opacity = '1';
      setTimeout(() => {
        (logoRef.current!.style.transition =
          'transform 0.4s ease-out, scale 0.4s ease-out'),
          0;
      });
    }

    if (registerRef.current && fakeRegisterInfo) {
      registerRef.current.style.transform = `translate(${fakeRegisterInfo.x}px, ${fakeRegisterInfo.y}px)`;
      registerRef.current.style.opacity = '1';
      setTimeout(() => {
        (registerRef.current!.style.transition = 'transform 0.4s ease-out'), 0;
      });
    }

    const lastScrollTop = 0;
    if (scrollContainerRef.current && logoRef.current) {
      scrollContainerRef.current.addEventListener('scroll', () => {
        const st = scrollContainerRef.current!.scrollTop;
        if (st > lastScrollTop && st > window.innerHeight / 2) {
          // downscroll code
          const scaleFactor = 0.5;
          console.log(window.innerWidth);
          logoRef.current!.style.transform = `translate(${window.innerWidth - (initialLogoWidth * scaleFactor * 1.5 + navRightValue)}px, 50px) scale(${scaleFactor})`;

          registerRef.current!.style.transform = `translate(${window.innerWidth - (initialRegisterWidth + navRightValue)}px, ${window.innerHeight - (registerInfo!.height + 50)}px)`;
        } else {
          // upscroll code
          logoRef.current!.style.scale = '1';
          if (fakeLogoInfo) {
            logoRef.current!.style.transform = `translate(${fakeLogoInfo?.x}px, ${fakeLogoInfo?.y - 10}px)`;
          }
          if (fakeRegisterInfo) {
            registerRef.current!.style.transform = `translate(${fakeRegisterInfo?.x}px, ${fakeRegisterInfo?.y}px)`;
          }
        }
      });
    }
  }, [fakeLogoRef, scrollContainerRef, fakeRegisterRef]);

  return (
    <div className="logo-and-register">
      <img ref={logoRef} src={Logo} alt="Design Frontiers Logo" />
      <div className="register-button" ref={registerRef}>
        <a className="button parallelogram" href="#">
          <span className="skew-fix">REGISTER NOW</span>
        </a>
      </div>
    </div>
  );
}
