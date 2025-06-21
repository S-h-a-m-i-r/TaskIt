interface Props {
    stroke: string;
  }
const SvgIcon = ({stroke}:Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    fill="none"
    viewBox="0 0 24 25"
  >
    <g clipPath="url(#clip0_2397_7326)">
      <path
        fill={stroke}
        fillRule="evenodd"
        d="m20.03 8.12-5.25-5.25a.75.75 0 0 0-.53-.219h-9a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-12a.75.75 0 0 0-.22-.53M15 5.213l2.69 2.69H15zm3.75 15.44H5.25v-16.5h8.25v4.5c0 .414.336.75.75.75h4.5z"
        clipRule="evenodd"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_2397_7326">
        <path fill="#fff" d="M0 .401h24v24H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default SvgIcon;
