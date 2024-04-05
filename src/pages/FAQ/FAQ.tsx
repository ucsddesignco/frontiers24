import './FAQ.scss';
import { FAQInfo } from './FAQInfo';
import useIsDesktop from '../../util/useIsDesktop';

type FAQProps = {
  scroll2Ref: React.RefObject<HTMLElement>;
};

export default function FAQ({ scroll2Ref }: FAQProps) {
  const isDesktop = useIsDesktop();

  return (
    <div className="faq-stuff">
      {isDesktop ? (
        <>
          <div className="scroll-section-two">
            <section className="two desktop faq" ref={scroll2Ref}>
              <div className="faq-container">
                <h2>FAQ</h2>
                {FAQInfo.slice(0, 3).map(item => (
                  <div className="card" key={item.question}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="scroll-section-three ">
            <section className="three desktop faq">
              <div className="faq-container">
                <h2>FAQ</h2>
                {FAQInfo.slice(3, 6).map(item => (
                  <div className="card" key={item.question}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      ) : (
        <section className="mobile faq">
          <div className="faq-container">
            <h2>FAQ</h2>
            {FAQInfo.map(item => (
              <div className="card" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
