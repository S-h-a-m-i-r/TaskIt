import * as React from "react";

interface ProfileSvgIconProps {
  stroke: string;
}

const ProfileSvgIcon: React.FC<ProfileSvgIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeWidth="1.5"
      d="M11.667 7.5H15M11.667 10.417h2.5"
    ></path>
    <path
     stroke={props.stroke}
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M14.167 2.5H5.834a4.167 4.167 0 0 0-4.167 4.167v6.666A4.167 4.167 0 0 0 5.834 17.5h8.333a4.167 4.167 0 0 0 4.167-4.167V6.667A4.167 4.167 0 0 0 14.167 2.5Z"
    ></path>
    <path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M4.167 13.333c1.007-2.15 4.76-2.292 5.833 0"
    ></path>
    <path
      stroke={props.stroke}
      strokeWidth="1.5"
      d="M8.75 7.5a1.667 1.667 0 1 1-3.333 0 1.667 1.667 0 0 1 3.333 0Z"
    ></path>
  </svg>
);

export default ProfileSvgIcon;
