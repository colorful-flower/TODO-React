type Props = {
  count: number;
};

export default function RemainingCount({ count }: Props) {
  return <p>残り {count} 件</p>;
}
