  interface Props {
    stroke: string;
  }
const CustomerSvg = ({stroke}:Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    fill="none"
    viewBox="0 0 24 25"
  >
    <g clipPath="url(#clip0_2397_7318)">
      <path
        fill={stroke}
        fillRule="evenodd"
        d="M10.992 15.206a5.625 5.625 0 1 0-6.234 0A9 9 0 0 0 .33 18.742a.75.75 0 1 0 1.256.82 7.5 7.5 0 0 1 12.576 0 .75.75 0 0 0 1.256-.82 9 9 0 0 0-4.427-3.536m-7.242-4.68a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0m19.7 9.253a.75.75 0 0 1-1.037-.218 7.48 7.48 0 0 0-6.288-3.41.75.75 0 0 1 0-1.5 4.125 4.125 0 1 0-1.532-7.956.75.75 0 1 1-.557-1.392 5.625 5.625 0 0 1 5.206 9.903 9 9 0 0 1 4.427 3.536.75.75 0 0 1-.218 1.037"
        clipRule="evenodd"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_2397_7318">
        <path fill="#fff" d="M0 .401h24v24H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default CustomerSvg;
