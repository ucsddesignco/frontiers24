import './FAQ.scss';
import { FAQInfo } from './FAQInfo';
import { useRef } from 'react';
import useIsDesktop from '../../util/useIsDesktop';

export default function FAQ() {
  const faq1Ref = useRef(null);
  const faq2Ref = useRef(null);
  const faq1ContainerRef = useRef(null);
  const isDesktop = useIsDesktop();

  return (
    <div className="faq-stuff">
      {isDesktop ? (
        <>
          <section className="desktop faq" ref={faq1ContainerRef}>
            <div ref={faq1Ref} className="faq-container">
              <h2>FAQ</h2>
              {FAQInfo.slice(0, 3).map(item => (
                <div className="block" key={item.question}>
                  <h4>{item.question}</h4>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="desktop faq">
            <div ref={faq2Ref} className="faq-container">
              <h2>FAQ</h2>
              {FAQInfo.slice(3, 6).map(item => (
                <div className="block" key={item.question}>
                  <h4>{item.question}</h4>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="mobile faq">
          <div ref={faq2Ref} className="faq-container">
            <h2>FAQ</h2>
            {FAQInfo.map(item => (
              <div className="block" key={item.question}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
