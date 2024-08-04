import { useEffect, useRef, useState } from 'react';
import useIsDesktop from './useIsDesktop';
import gsap from 'gsap';

const planetColorsPages = {
  Home: '',
  FAQ: 'blue',
  Timeline: 'purple',
  Judges: 'red',
  Recap: 'yellow'
};

const pagesList = ['Home', 'FAQ', 'Timeline', 'Judges', 'Recap'];

export type Pages = 'Home' | 'FAQ' | 'Timeline' | 'Judges' | 'Recap';

type UseNavigationProps = {
  scrollContainerRef: React.MutableRefObject<HTMLElement | null>;
  mobileScrollRefList: React.MutableRefObject<HTMLElement | null>[];
  scrollRefList: React.MutableRefObject<HTMLElement | null>[];
  setPausedPlanet: (pausedPlanet: string) => void;
};

export const useNavigation = ({
  scrollContainerRef,
  mobileScrollRefList,
  scrollRefList,
  setPausedPlanet
}: UseNavigationProps) => {
  const isDesktop = useIsDesktop();
  const [pageSelected, setPageSelected] = useState('Home');
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const currentlyNavigatingRef = useRef(false);
  const lastScrollTopRef = useRef(0);

  const setCurrentlyNavigating = (value: boolean) => {
    currentlyNavigatingRef.current = value;
  };

  const toggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);

    if (!isHamburgerOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsHamburgerOpen(false);
          document.body.style.overflow = 'auto';
          document.removeEventListener('keydown', handleKeyDown);
        }
      };
      document.querySelector('main')?.setAttribute('aria-hidden', 'true');
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.querySelector('main')?.removeAttribute('aria-hidden');
    }
  };

  function scrollToSection(scrollOffset: number) {
    if (isDesktop) {
      gsap.to(scrollContainerRef.current, {
        scrollTo: { y: scrollOffset },
        ease: 'power2',
        onStart: function () {
          setCurrentlyNavigating(true);
        },
        onComplete: function () {
          setCurrentlyNavigating(false);
        }
      });
    } else {
      //Mobile Scroll
      if (isHamburgerOpen) {
        toggleHamburger();
      }

      scrollContainerRef.current?.scrollTo({
        top: mobileScrollRefList
          ? mobileScrollRefList[scrollOffset].current?.offsetTop || 0
          : 0,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    if (scrollContainerRef.current && isDesktop) {
      const pageHeight = window.innerHeight;
      scrollContainerRef.current.addEventListener('scroll', () => {
        if (currentlyNavigatingRef.current) return;
        const scrollPosition = scrollContainerRef.current!.scrollTop || 0;
        if (scrollPosition > lastScrollTopRef.current) {
          // Scrolling Down
          if (
            scrollPosition >
            scrollRefList[3].current!.offsetTop + pageHeight / 2
          ) {
            setPageSelected('Recap');
            setPausedPlanet('yellow');
          } else if (
            scrollPosition >
            scrollRefList[2].current!.offsetTop + pageHeight / 2
          ) {
            setPageSelected('Judges');
            setPausedPlanet('red');
          } else if (
            scrollPosition >
            scrollRefList[1].current!.offsetTop + pageHeight / 2
          ) {
            setPageSelected('Timeline');
            setPausedPlanet('purple');
          } else if (scrollPosition > pageHeight / 2) {
            setPageSelected('FAQ');
            setPausedPlanet('blue');
          }
        } else {
          // Scrolling Up
          if (scrollPosition < pageHeight / 2) {
            setPageSelected('Home');
            setPausedPlanet('');
          } else if (
            scrollPosition <
            scrollRefList[2].current!.offsetTop - pageHeight / 2
          ) {
            setPageSelected('FAQ');
            setPausedPlanet('blue');
          } else if (
            scrollPosition <
            scrollRefList[3].current!.offsetTop - pageHeight / 2
          ) {
            setPageSelected('Timeline');
            setPausedPlanet('purple');
          } else if (
            scrollPosition <
            scrollRefList[4].current!.offsetTop - pageHeight / 2
          ) {
            setPageSelected('Judges');
            setPausedPlanet('red');
          }
        }
        lastScrollTopRef.current = scrollPosition <= 0 ? 0 : scrollPosition;
      });
    }
  }, [scrollContainerRef, scrollRefList, setPausedPlanet, isDesktop]);

  const navigateToPage = (pageName: Pages, pageIndex: number) => {
    if (isDesktop) {
      scrollToSection(scrollRefList[pageIndex].current?.offsetTop || 0);
      setPageSelected(pageName);
      setPausedPlanet(planetColorsPages[pageName as Pages]);
    } else {
      scrollToSection(pageIndex);
    }
  };

  const navLinks = pagesList.map((pageName, index) => {
    return {
      onClick: () => {
        navigateToPage(pageName as Pages, index);
      },
      name: pageName
    };
  });

  return {
    navigateToPage,
    pageSelected,
    isHamburgerOpen,
    toggleHamburger,
    navLinks
  };
};
