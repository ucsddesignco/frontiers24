import "./Judges.scss";
import JudgeComponent from "../../components/JudgeComponent/JudgeComponent";
import { useRef } from "react";

const JudgeList1 = [
  {
    name: "Julia Nguyen",
    pronouns: "She/Her",
    position: "Product Designer @ ServiceNow",
    funFact: "I enjoy designing and sewing my clothes for myself.",
    imgLink:
      "https://res.cloudinary.com/design-co-ucsd/image/upload/v1711863617/frontiers24/judges/julia_nguyen_a2mnj2.webp",
  },
  {
    name: "Alan Tran",
    pronouns: "He/Him",
    position: "UX Engineer @ Illumina",
    funFact:
      "I want to create a public website that objectively scores the best pho in San Diego/OC area.",
    imgLink:
      "https://res.cloudinary.com/design-co-ucsd/image/upload/v1711863615/frontiers24/judges/dexter_zavalza_pgx3sy.webp",
  },
  {
    name: "Dexter Zavalza",
    pronouns: "He/Him",
    position: "Conversational AI UX Design Lead (Manager) @ Deloitte",
    funFact: "First job out of college was in a surfboard factory.",
    imgLink:
      "https://res.cloudinary.com/design-co-ucsd/image/upload/v1711863615/frontiers24/judges/dexter_zavalza_pgx3sy.webp",
  },
];

const JudgeList2 = [
  {
    name: "Andrew Nguyen",
    pronouns: "He/Him",
    position: "Consultant (UX / Experience Design) @ Arup",
    funFact:
      "I’ve appeared on the livestreams of 2 separate large esports broadcasts: the 2017 Overwatch World Cup in an audience interview and the 2023 Valorant Champions Finals on the Stare Cam.",
    imgLink:
      "https://res.cloudinary.com/design-co-ucsd/image/upload/v1711863616/frontiers24/judges/andrew_nguyen_ur8x1m.webp",
  },
  {
    name: "Soon-Won Dy",
    pronouns: "She/Her",
    position: "UX Designer @ Axos Bank",
    funFact:
      "I love going to cafes & recreating their fancy coffees and baked goods at home.",
    imgLink:
      "https://res.cloudinary.com/design-co-ucsd/image/upload/v1711863613/frontiers24/judges/soon-won_dy_hwyj2p.webp",
  },
];

export default function Judges() {
  const judge1Ref = useRef(null);
  const judge2Ref = useRef(null);
  const judge1ContainerRef = useRef(null);

  return (
    <div className="judge-stuff">
      <section className="judges" ref={judge1ContainerRef}>
        <div ref={judge1Ref} className="faq-container">
          <h2>Judges</h2>
          {JudgeList1.map((item) => (
            <div className="block" key={item.name}>
              <JudgeComponent
                name={item.name}
                pronouns={item.pronouns}
                position={item.position}
                funFact={item.funFact}
                imgLink={item.imgLink}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="judges" ref={judge1ContainerRef}>
        <div ref={judge2Ref} className="faq-container">
          <h2>Judges</h2>
          {JudgeList2.map((item) => (
            <div className="block" key={item.name}>
              <JudgeComponent
                name={item.name}
                pronouns={item.pronouns}
                position={item.position}
                funFact={item.funFact}
                imgLink={item.imgLink}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
