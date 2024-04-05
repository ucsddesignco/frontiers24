import { useEffect, useMemo, useRef } from 'react';
import './OrbitingPlanets.scss';
import useIsDesktop from '../../util/useIsDesktop';

type OrbitingPlanetsProps = {
  planetRef: React.RefObject<SVGSVGElement>;
  pausedPlanet: string;
};

export default function OrbitingPlanets({
  planetRef,
  pausedPlanet
}: OrbitingPlanetsProps) {
  const isDesktop = useIsDesktop();
  const blueSpinDuration = 10;
  const purpleSpinDuration = 8;
  const redSpinDuration = 13;
  const yellowSpinDuration = 11.5;

  const yellowPlanetRef = useRef<SVGSVGElement>(null);
  const redPlanetRef = useRef<SVGSVGElement>(null);
  const purplePlanetRef = useRef<SVGSVGElement>(null);
  const bluePlanetRef = useRef<SVGSVGElement>(null);

  const lastFrameTime = useRef<number | null>(null);
  const requestID = useRef<number>();

  const orbitingElements = useMemo(
    () => [
      {
        ref: yellowPlanetRef,
        offsetX: 155,
        offsetY: 45,
        centerX: 93,
        centerY: 93,
        radius: 91.5,
        angle: -0.6,
        duration: 8,
        initialSpeed: 0,
        color: 'yellow'
      },
      {
        ref: redPlanetRef,
        offsetX: 340,
        offsetY: 410,
        centerX: 228,
        centerY: 228,
        radius: 226.5,
        angle: 0.5,
        duration: 4.5,
        initialSpeed: 0,
        color: 'red'
      },
      {
        ref: purplePlanetRef,
        offsetX: 500,
        offsetY: 70,
        centerX: 285,
        centerY: 285,
        radius: 283.5,
        angle: -0.3,
        duration: 9.7,
        initialSpeed: 0,
        color: 'purple'
      },
      {
        ref: bluePlanetRef,
        offsetX: 760,
        offsetY: 580,
        centerX: 398.5,
        centerY: 398.5,
        radius: 397,
        angle: 0.7,
        duration: 6.5,
        initialSpeed: 0,
        color: 'blue'
      }
    ],
    []
  );

  useEffect(() => {
    function animateOrbits(timestamp: number) {
      if (lastFrameTime.current === null) {
        lastFrameTime.current = timestamp;
      }

      const deltaTime = timestamp - lastFrameTime.current;
      lastFrameTime.current = timestamp;

      // Display planets initially
      orbitingElements.forEach(planet => {
        const { ref, offsetX, offsetY, centerX, centerY, radius } = planet;

        const x = centerX + radius * Math.cos(planet.angle) - offsetX;
        const y = centerY + radius * Math.sin(planet.angle) - offsetY;

        const orbitingElement = ref.current;
        if (orbitingElement) {
          orbitingElement.setAttribute('transform', `translate(${x}, ${y})`);
          ref.current.style.opacity = '1';
        }
      });

      // Update each element's position based on its unique properties
      orbitingElements.forEach(planet => {
        const {
          ref,
          offsetX,
          offsetY,
          centerX,
          centerY,
          radius,
          duration,
          color
        } = planet;

        const speed = (2 * Math.PI) / (duration * 1000);
        planet.angle += speed * deltaTime; // Update the angle based on elapsed time and speed

        ref.current ? (ref.current.style.opacity = '1') : null;
        if (pausedPlanet === color) {
          const normalized_angle = (planet.angle + 2 * Math.PI) % (2 * Math.PI);
          if (normalized_angle > -0.3 && normalized_angle < 0.3) {
            planet.angle = speed;
            return;
          }
          planet.angle += 0.0006 * (radius / 2);
        }

        const x = centerX + radius * Math.cos(planet.angle) - offsetX;
        const y = centerY + radius * Math.sin(planet.angle) - offsetY;

        const orbitingElement = ref.current;
        if (orbitingElement) {
          orbitingElement.setAttribute('transform', `translate(${x}, ${y})`);
        }
      });

      requestID.current = requestAnimationFrame(animateOrbits);
    }

    requestID.current = requestAnimationFrame(animateOrbits);

    return () => {
      if (lastFrameTime.current) {
        cancelAnimationFrame(lastFrameTime.current);
      }
      if (requestID.current) {
        cancelAnimationFrame(requestID.current);
      }
    };
  }, [pausedPlanet, orbitingElements]);

  // Hide on mobile
  if (!isDesktop) return;

  return (
    // prettier-ignore
    <div className="orbiting-planets-container">
    <svg ref={planetRef} className="orbiting-planets" width="875" height="797" viewBox="0 0 875 797" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle id="orbit4" cx="398.5" cy="398.5" r="397" transform="matrix(-1 0 0 1 797 0)" stroke="#F1F1F1" strokeWidth="3" strokeDasharray="7.43 7.43"></circle>
      <circle id="orbit3" cx="285" cy="285" r="283.5" transform="matrix(-1 0 0 1 683.992 113.004)" stroke="#F1F1F1" strokeWidth="3" strokeDasharray="7.43 7.43"></circle>
      <circle id="orbit2" cx="228" cy="228" r="226.5" transform="matrix(-1 0 0 1 626 170.254)" stroke="#F1F1F1" strokeWidth="3" strokeDasharray="7.43 7.43"></circle>
      <circle id="orbit1" cx="93" cy="93" r="91.5" transform="matrix(-1 0 0 1 491.434 304.82)" stroke="#F1F1F1" strokeWidth="3" strokeDasharray="7.43 7.43"></circle>
      <g id="planet1-yellow" className='planet' ref={yellowPlanetRef}>
        <g id="Ellipse 299" filter="url(#filter0_f_1092_1256)">
          <circle cx="462.755" cy="346.757" r="32.7554" fill="#F57F17"></circle>
        </g>
        <g id="Mask group">
          <mask id="mask0_1092_1256" maskUnits="userSpaceOnUse" x="430" y="314" width="67" height="66">
            <circle id="Ellipse 298" cx="463.001" cy="347" r="33" fill="#D9D9D9"></circle>
          </mask>
          <g mask="url(#mask0_1092_1256)">
            {/* Spin Animation */}
            {/* image x = mask x - 17 (magic number) */}
            {/* image y = mask y */}
            <image href="./images/yellow-spin.svg" x="413" y="314">
            {/* 398.5 is midpoint */}
            {/* animate to = starting image x - midpoint + mask radius */}
            <animate attributeName="x" to="47.5" dur={yellowSpinDuration} repeatCount="indefinite" />
            </image>
          </g>
        </g>
        <g id="Subtract">
          <mask id="path-24-outside-1_1092_1256" maskUnits="userSpaceOnUse" x="427.888" y="332.152" width="60.5117" height="38.0693" fill="black">
            <rect fill="white" x="427.888" y="332.152" width="60.5117" height="38.0693"></rect>
            <path fillRule="evenodd" clipRule="evenodd" d="M483.531 333.279C475.983 334.143 466.744 337.465 457.675 343.014C444.954 350.798 436.005 360.862 433.722 368.927C437.698 362.25 445.245 354.941 455.019 348.96C465.541 342.522 476.275 339.073 484.272 338.997L483.531 333.279Z"></path>
          </mask>
          <path fillRule="evenodd" clipRule="evenodd" d="M483.531 333.279C475.983 334.143 466.744 337.465 457.675 343.014C444.954 350.798 436.005 360.862 433.722 368.927C437.698 362.25 445.245 354.941 455.019 348.96C465.541 342.522 476.275 339.073 484.272 338.997L483.531 333.279Z" fill="#FFFDE7"></path>
          <path d="M457.675 343.014L458.197 343.867L458.197 343.867L457.675 343.014ZM483.531 333.279L484.523 333.151C484.452 332.609 483.96 332.224 483.417 332.286L483.531 333.279ZM433.722 368.927L432.759 368.655C432.623 369.138 432.865 369.647 433.326 369.846C433.787 370.044 434.324 369.87 434.581 369.439L433.722 368.927ZM455.019 348.96L455.541 349.813L455.541 349.813L455.019 348.96ZM484.272 338.997L484.282 339.997C484.568 339.995 484.839 339.87 485.026 339.654C485.214 339.438 485.301 339.152 485.264 338.869L484.272 338.997ZM458.197 343.867C467.172 338.376 476.273 335.116 483.645 334.273L483.417 332.286C475.693 333.17 466.316 336.555 457.153 342.161L458.197 343.867ZM434.684 369.2C435.768 365.371 438.469 360.972 442.522 356.54C446.565 352.119 451.908 347.715 458.197 343.867L457.153 342.161C450.722 346.097 445.229 350.617 441.046 355.19C436.874 359.752 433.959 364.419 432.759 368.655L434.684 369.2ZM454.497 348.107C444.627 354.147 436.944 361.562 432.862 368.416L434.581 369.439C438.452 362.939 445.863 355.735 455.541 349.813L454.497 348.107ZM484.263 337.997C476.028 338.076 465.117 341.609 454.497 348.107L455.541 349.813C465.965 343.435 476.522 340.071 484.282 339.997L484.263 337.997ZM485.264 338.869L484.523 333.151L482.539 333.408L483.28 339.126L485.264 338.869Z" fill="#FFFDE7" mask="url(#path-24-outside-1_1092_1256)"></path>
        </g>
        <path id="Star 222" d="M490.576 326.135L487.866 321.71C486.971 320.249 484.789 320.448 484.173 322.047L482.31 326.89C482.183 327.218 481.904 327.463 481.562 327.545L476.517 328.755C474.85 329.155 474.365 331.292 475.696 332.371L479.726 335.64C479.999 335.861 480.146 336.203 480.118 336.553L479.71 341.726C479.575 343.434 481.458 344.556 482.896 343.623L487.25 340.801C487.544 340.61 487.915 340.576 488.239 340.711L493.032 342.697C494.616 343.353 496.264 341.909 495.822 340.254L494.483 335.241C494.392 334.901 494.475 334.539 494.703 334.272L498.073 330.327C499.187 329.024 498.323 327.01 496.611 326.919L491.43 326.643C491.079 326.624 490.76 326.434 490.576 326.135Z" fill="#FFFDE7" stroke="#FFFDE7"></path>
      </g>
      <g id="planet4-blue" className='planet' ref={bluePlanetRef}>
        <g id="Ellipse 299_2" filter="url(#filter1_f_1092_1256)">
          <circle cx="759.755" cy="588.755" r="32.7554" fill="#42A5F5"></circle>
        </g>
        <g id="Mask group_2">
          <mask id="mask1_1092_1256" maskUnits="userSpaceOnUse" x="727" y="556" width="66" height="66">
            <circle id="Ellipse 298_2" cx="760" cy="589" r="33" fill="#D9D9D9"></circle>
          </mask>
          <g mask="url(#mask1_1092_1256)">
            {/* Spin Animation */}
            {/* image x = mask x - 17 (magic number) */}
            <image href="./images/blue-spin.svg" x="710" y="556">
            {/* 398.5 is midpoint */}
            {/* animate to = starting image x - midpoint + mask radius */}
            <animate attributeName="x" to="344.5" dur={blueSpinDuration} repeatCount="indefinite" />
            </image>
          </g>
        </g>
        <circle id="Ellipse 302" cx="732.5" cy="569.5" r="12.5" fill="#A8E8FA"></circle>
        <circle id="Ellipse 301" cx="744.5" cy="549.5" r="7.5" fill="#A8E8FA"></circle>
      </g>
      <g id="planet2-purple" className='planet' ref={purplePlanetRef}>
        <g id="Ellipse 299_3" filter="url(#filter2_f_1092_1256)">
          <circle cx="604.755" cy="187.574" r="32.7554" fill="#7B1FA2"></circle>
        </g>
        <g id="Mask group_3">
          <mask id="mask2_1092_1256" maskUnits="userSpaceOnUse" x="572" y="154" width="66" height="67">
            <circle id="Ellipse 298_3" cx="605" cy="187.818" r="33" fill="#D9D9D9"></circle>
          </mask>
          <g mask="url(#mask2_1092_1256)">
            {/* Spin Animation */}
            {/* image x = mask x - 17 (magic number) */}
            <image href="./images/purple-spin.svg" x="555" y="154">
            {/* 398.5 is midpoint */}
            {/* animate to = starting image x - midpoint + mask radius */}
            <animate attributeName="x" to="189.5" dur={purpleSpinDuration} repeatCount="indefinite" />
            </image>
          </g>
        </g>
        <g id="Subtract_2">
          <mask id="path-67-outside-2_1092_1256" maskUnits="userSpaceOnUse" x="575.077" y="138.024" width="51.9906" height="98.8538" fill="black">
            <rect fill="white" x="575.077" y="138.024" width="51.9906" height="98.8538"></rect>
            <path fillRule="evenodd" clipRule="evenodd" d="M597.336 142.318C586.05 144.114 580.04 165.734 583.913 190.608C587.787 215.481 600.076 234.189 611.362 232.392C616.94 231.505 621.229 225.774 623.673 217.202C621.451 222.812 618.157 226.456 614.071 227.106C604.132 228.688 593.268 211.954 589.807 189.728C586.347 167.503 591.599 148.204 601.539 146.622C605.735 145.954 610.095 148.55 613.993 153.445C608.994 145.735 603.037 141.41 597.336 142.318Z"></path>
          </mask>
          <path fillRule="evenodd" clipRule="evenodd" d="M597.336 142.318C586.05 144.114 580.04 165.734 583.913 190.608C587.787 215.481 600.076 234.189 611.362 232.392C616.94 231.505 621.229 225.774 623.673 217.202C621.451 222.812 618.157 226.456 614.071 227.106C604.132 228.688 593.268 211.954 589.807 189.728C586.347 167.503 591.599 148.204 601.539 146.622C605.735 145.954 610.095 148.55 613.993 153.445C608.994 145.735 603.037 141.41 597.336 142.318Z" fill="#7B1FA2"></path>
          <path d="M583.913 190.608L582.926 190.765L582.926 190.765L583.913 190.608ZM623.673 217.202L624.634 217.474L622.744 216.836L623.673 217.202ZM614.071 227.106L614.225 228.094L614.225 228.094L614.071 227.106ZM589.807 189.728L590.795 189.571L590.795 189.571L589.807 189.728ZM613.993 153.445L613.211 154.07L614.832 152.898L613.993 153.445ZM584.901 190.45C582.981 178.122 583.52 166.646 585.903 158.074C588.312 149.406 592.473 144.104 597.49 143.306L597.182 141.33C590.913 142.328 586.426 148.734 583.977 157.544C581.502 166.449 580.973 178.22 582.926 190.765L584.901 190.45ZM611.208 231.404C606.191 232.203 600.62 228.45 595.693 220.95C590.821 213.532 586.821 202.779 584.901 190.45L582.926 190.765C584.879 203.309 588.96 214.347 594.022 222.053C599.029 229.675 605.246 234.378 611.516 233.38L611.208 231.404ZM622.712 216.931C620.289 225.428 616.166 230.615 611.208 231.404L611.516 233.38C617.713 232.394 622.169 226.12 624.634 217.474L622.712 216.931ZM622.744 216.836C620.567 222.33 617.474 225.552 613.918 226.118L614.225 228.094C618.84 227.36 622.334 223.294 624.602 217.569L622.744 216.836ZM613.918 226.118C611.752 226.463 609.463 225.825 607.14 224.232C604.811 222.636 602.498 220.109 600.348 216.798C596.05 210.177 592.509 200.578 590.795 189.571L588.82 189.886C590.567 201.104 594.187 210.985 598.671 217.892C600.912 221.344 603.395 224.094 606.007 225.885C608.624 227.679 611.421 228.54 614.225 228.094L613.918 226.118ZM590.795 189.571C589.081 178.565 589.534 168.33 591.612 160.694C592.652 156.875 594.085 153.752 595.816 151.509C597.543 149.272 599.527 147.955 601.693 147.61L601.385 145.634C598.581 146.08 596.181 147.768 594.236 150.289C592.294 152.804 590.767 156.192 589.684 160.174C587.516 168.14 587.073 178.667 588.82 189.886L590.795 189.571ZM601.693 147.61C605.346 147.028 609.386 149.267 613.211 154.07L614.776 152.819C610.804 147.833 606.123 144.88 601.385 145.634L601.693 147.61ZM597.49 143.306C602.559 142.499 608.193 146.34 613.155 153.991L614.832 152.898C609.795 145.13 603.515 140.322 597.182 141.33L597.49 143.306Z" fill="#7B1FA2" mask="url(#path-67-outside-2_1092_1256)"></path>
        </g>
      </g>
      <g id="planet2-red" className='planet' ref={redPlanetRef}>
        <g id="Mask group_4">
          <g id="Ellipse 298_4" filter="url(#filter3_f_1092_1256)">
            <circle cx="500.753" cy="588.755" r="32.7554" fill="#AD1457"></circle>
          </g>
          <mask id="mask3_1092_1256"  maskUnits="userSpaceOnUse" x="467" y="556" width="67" height="66">
            <circle id="Ellipse 299_4" cx="500.753" cy="588.755" r="32.7554" fill="#D9D9D9"></circle>
          </mask>
          <g mask="url(#mask3_1092_1256)">
            {/* Spin Animation */}
            {/* image x = mask x - 17 (magic number) */}
            {/* image y = mask y */}
            <image href="./images/red-spin.svg" x="450" y="556">
            {/* 398.5 is midpoint *
            {/* animate to = starting image x - midpoint + mask radius */}
            <animate attributeName="x" to="84.5" dur={redSpinDuration} repeatCount="indefinite" />
            </image>
          </g>
        </g>
        <g id="Subtract_3">
          <mask id="path-88-outside-3_1092_1256" maskUnits="userSpaceOnUse" x="449.903" y="549.637" width="100.564" height="79.6346" fill="black">
            <rect fill="white" x="449.903" y="549.637" width="100.564" height="79.6346"></rect>
            <path fillRule="evenodd" clipRule="evenodd" d="M459.373 609.086C465.088 618.983 487.427 616.862 509.27 604.349C531.112 591.836 544.187 573.669 538.473 563.772C535.649 558.88 528.764 556.924 519.885 557.708C525.918 557.777 530.499 559.549 532.567 563.132C537.6 571.848 525.858 587.978 506.341 599.159C486.823 610.34 466.922 612.338 461.89 603.621C459.765 599.942 460.63 594.942 463.806 589.55C458.395 596.976 456.487 604.086 459.373 609.086Z"></path>
          </mask>
          <path fillRule="evenodd" clipRule="evenodd" d="M459.373 609.086C465.088 618.983 487.427 616.862 509.27 604.349C531.112 591.836 544.187 573.669 538.473 563.772C535.649 558.88 528.764 556.924 519.885 557.708C525.918 557.777 530.499 559.549 532.567 563.132C537.6 571.848 525.858 587.978 506.341 599.159C486.823 610.34 466.922 612.338 461.89 603.621C459.765 599.942 460.63 594.942 463.806 589.55C458.395 596.976 456.487 604.086 459.373 609.086Z" fill="#AD1457"></path>
          <path d="M509.27 604.349L509.77 605.215L509.77 605.215L509.27 604.349ZM519.885 557.708L519.795 556.713L519.875 558.706L519.885 557.708ZM532.567 563.132L533.435 562.635L533.435 562.635L532.567 563.132ZM506.341 599.159L505.841 598.293L505.841 598.293L506.341 599.159ZM463.806 589.55L464.67 590.057L462.996 588.962L463.806 589.55ZM508.77 603.483C497.943 609.685 487.034 613.286 478.177 614.127C469.22 614.977 462.781 612.988 460.241 608.588L458.506 609.583C461.68 615.08 469.268 616.979 478.37 616.115C487.571 615.242 498.754 611.526 509.77 605.215L508.77 603.483ZM537.606 564.269C540.146 568.668 538.634 575.212 533.391 582.496C528.207 589.699 519.596 597.28 508.77 603.483L509.77 605.215C520.786 598.904 529.634 591.145 535.019 583.662C540.347 576.26 542.515 568.772 539.341 563.275L537.606 564.269ZM519.975 558.702C528.777 557.926 535.095 559.921 537.606 564.269L539.341 563.275C536.203 557.84 528.751 555.923 519.795 556.713L519.975 558.702ZM519.875 558.706C525.784 558.774 529.899 560.51 531.7 563.629L533.435 562.635C531.099 558.588 526.053 556.779 519.895 556.709L519.875 558.706ZM531.7 563.629C532.796 565.528 533.02 567.893 532.363 570.632C531.705 573.379 530.173 576.442 527.849 579.634C523.204 586.016 515.506 592.756 505.841 598.293L506.841 600.025C516.692 594.381 524.624 587.466 529.471 580.809C531.893 577.481 533.573 574.179 534.311 571.1C535.051 568.014 534.855 565.094 533.435 562.635L531.7 563.629ZM505.841 598.293C496.175 603.83 486.455 607.068 478.581 607.858C474.643 608.253 471.214 608.032 468.501 607.217C465.794 606.405 463.854 605.023 462.757 603.124L461.022 604.118C462.441 606.577 464.876 608.214 467.926 609.13C470.969 610.043 474.679 610.257 478.785 609.845C487 609.021 496.989 605.669 506.841 600.025L505.841 598.293ZM462.757 603.124C460.908 599.92 461.553 595.347 464.67 590.057L462.943 589.043C459.707 594.536 458.623 599.963 461.022 604.118L462.757 603.124ZM460.241 608.588C457.675 604.143 459.247 597.507 464.617 590.138L462.996 588.962C457.544 596.444 455.299 604.029 458.506 609.583L460.241 608.588Z" fill="#AD1457" mask="url(#path-88-outside-3_1092_1256)"></path>
        </g>
      </g>
    <defs>
      <filter id="filter0_f_1092_1256" x="410" y="294.002" width="105.511" height="105.511" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
        <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_1092_1256"></feGaussianBlur>
      </filter>
      <filter id="filter1_f_1092_1256" x="677" y="506" width="165.511" height="165.511" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
        <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_1092_1256"></feGaussianBlur>
      </filter>
      <filter id="filter2_f_1092_1256" x="522" y="104.818" width="165.511" height="165.511" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
        <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_1092_1256"></feGaussianBlur>
      </filter>
      <filter id="filter3_f_1092_1256" x="417.998" y="506" width="165.511" height="165.511" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
        <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_1092_1256"></feGaussianBlur>
      </filter>
    </defs>
    </svg>
    </div>
  );
}
