import Title from "./Title";
import RemainingCount from "./RemainingCount";

type Props = {
  remainingCount: number;
};

export default function Header({ remainingCount }: Props) {
  return (
    <header>
      <Title />
      <RemainingCount count={remainingCount} />
    </header>
  );
}
