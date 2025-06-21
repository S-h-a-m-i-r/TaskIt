interface Props {
    stroke: string;
  }
const TaskSvg = ({stroke}:Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    fill="none"
    viewBox="0 0 18 19"
  >
    <path
      fill={stroke}
      fillRule="evenodd"
      d="M13.28 6.62a.75.75 0 0 1 0 1.062l-5.25 5.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 1.06-1.061l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0M18 1.902v15a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5m-1.5 15v-15h-15v15z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default TaskSvg;
