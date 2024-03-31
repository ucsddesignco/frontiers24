import "./Judges.scss";
import JudgeComponent from "../../components/JudgeComponent/JudgeComponent";

export default function Judges() {
  return (
    <section className="judges">
      <h2>Judges</h2>
      <div className="judge-component">
        <JudgeComponent
          name="First Last"
          pronouns="They/Them"
          position="Position @ Company"
          funFact="I'm left handed!"
        />
      </div>
      <div className="judge-component">
        <JudgeComponent
          name="First Last"
          pronouns="They/Them"
          position="Position @ Company"
          funFact="I'm left handed!"
        />
      </div>
      <div className="judge-component">
        <JudgeComponent
          name="First Last"
          pronouns="They/Them"
          position="Position @ Company"
          funFact="I'm left handed!"
        />
      </div>
    </section>
  );
}
