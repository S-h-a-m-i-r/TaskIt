
interface Props {
    stroke: string;
  }
const CreditSvg = ({stroke}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="22"
    fill="none"
    viewBox="0 0 14 22"
  >
    <path
      fill={stroke}
      fillRule="evenodd"
      d="M9.25 10.651h-1.5v-6h.75a3 3 0 0 1 3 3 .75.75 0 0 0 1.5 0 4.505 4.505 0 0 0-4.5-4.5h-.75v-1.5a.75.75 0 1 0-1.5 0v1.5H5.5a4.5 4.5 0 0 0 0 9h.75v6h-1.5a3 3 0 0 1-3-3 .75.75 0 0 0-1.5 0 4.505 4.505 0 0 0 4.5 4.5h1.5v1.5a.75.75 0 0 0 1.5 0v-1.5h1.5a4.5 4.5 0 0 0 0-9m-3.75 0a3 3 0 0 1 0-6h.75v6zm3.75 7.5h-1.5v-6h1.5a3 3 0 1 1 0 6"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default CreditSvg;
