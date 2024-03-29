import "./FAQ.scss";
import { useRef } from "react";

const FaqList1 = [
  {
    question: "What is a design sprint?",
    answer:
      "A design sprint is a time-constrained and structured process used by teams to generate new ideas and solve complex problems.",
  },
  {
    question: "Who can participate?",
    answer:
      "Registration is open to <b>UCSD students</b> of all levels and backgrounds. We encourage everyone to apply and share their own unique perspectives, knowledge, and skills!",
  },
  {
    question: "How big can my team be?",
    answer:
      "Teams can be a minimum of 3 and a maximum of 4. Teams will not be assigned, so feel free to make your own in advance or on the day of the event. You can also join one on Design Co’s Discord channel #frontiers-24.",
  },
  {
    question: "When is the deadline to register?",
    answer:
      "Registration closes <b>Friday, April 5th at 11:59 PM</b>. We will cap the event at 60 participants, so register early!",
  },
];

const FaqList2 = [
  {
    question: "Where is the Design and Innovation Building?",
    answer:
      "DIB is located next to the Pepper Canyon Trolley Station, with entrances located across from the Structural Materials and Engineering building or next to the Regents Loop shuttle stop. Design Frontiers will be hosted in <b>Room 208</b> on the second floor.",
  },
  {
    question:
      "How should I prepare for Design Frontiers if I have no design experience?",
    answer:
      "We’ll be hosting a Crash Course on Design Frontiers GBM workshop on Wednesday, April 10th from 6:30-8 PM in DIB Room 208!",
  },
  {
    question: "What should I expect if there is a waitlist?",
    answer:
      "Individuals placed on the waitlist cannot be guaranteed participation in Design Frontiers. However, if an accepted participant drops out, we will let you know as soon as possible that you will be able to participate!",
  },
];

export default function FAQ() {
  const faq1Ref = useRef(null);
  const faq2Ref = useRef(null);
  const faq1ContainerRef = useRef(null);

  return (
    <div className="faq-stuff">
      <section className="faq" ref={faq1ContainerRef}>
        <div ref={faq1Ref} className="faq-container">
          <h2>FAQ</h2>
          {FaqList1.map((item) => (
            <div className="block" key={item.question}>
              <h4>{item.question}</h4>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="faq">
        <div ref={faq2Ref} className="faq-container">
          <h2>FAQ</h2>
          {FaqList2.map((item) => (
            <div className="block" key={item.question}>
              <h4>{item.question}</h4>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
