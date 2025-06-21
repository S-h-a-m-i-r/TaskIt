

interface CreditSvgIconProps {
  stroke: string;
}

const CreditSvgIcon: React.FC<CreditSvgIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <g stroke={props.stroke} strokeWidth="1.5" clipPath="url(#clip0_1_75)">
      <path d="M12.917 10.833c2.991 0 5.416-.746 5.416-1.666S15.908 7.5 12.917 7.5 7.5 8.246 7.5 9.167c0 .92 2.425 1.666 5.417 1.666ZM18.333 12</g></g>.917c0 .92-2.425 1.666-5.416 1.666S7.5 13.837 7.5 12.917"></path>
      <path d="M18.333 9.167V16.5c0 1.012-2.425 1.833-5.416 1.833S7.5 17.513 7.5 16.5V9.167M7.084 5c2.991 0 5.416-.746 5.416-1.667 0-.92-2.425-1.666-5.416-1.666s-5.417.746-5.417 1.666S4.092 5 7.084 5Z"></path>
      <path
        strokeLinecap="round"
        d="M5 9.167C3.424 8.975 1.975 8.479 1.667 7.5M5 13.333c-1.576-.191-3.025-.688-3.333-1.666"
      ></path>
      <path
        strokeLinecap="round"
        d="M5 17.5c-1.576-.192-3.025-.688-3.333-1.667v-12.5M12.5 5V3.333"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_1_75">
        <path fill="#fff" d="M0 0h20v20H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default CreditSvgIcon;
