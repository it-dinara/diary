import s from "./Title.module.css";

type TitleProps = {
  active: boolean;
  clicked: (event: { preventDefault: () => void }) => {
    payload: string;
    type: "diary/setTitle";
  };
  name: string;
};

function Title(props: TitleProps) {
  return (
    <li
      className={props.active ? [s.title, s.active].join(" ") : s.title}
      onClick={props.clicked}
    >
      <button>{props.name}</button>
    </li>
  );
}

export default Title;
