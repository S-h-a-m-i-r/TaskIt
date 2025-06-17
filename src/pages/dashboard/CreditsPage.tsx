import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../../assets/icons/ArrowLeft_icon.svg";
import credits from "../../assets/Credits_background.svg";
import PaymentForm from "../../components/PaymentForm";

const CreditsPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const pageTitle = location.pathname.split("/").pop() || "Tasks";
	const capitalizedPageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className="p-9 w-full flex flex-col gap-10">
			<div className="flex items-center gap-2">
				<div className="p-2 cursor-pointer bg-[#D1D5DB] rounded-full flex" onClick={handleGoBack}>
					<img src={backIcon} alt="back" />
				</div>
				<span className="font-semibold text-2xl"> {capitalizedPageTitle}</span>
			</div>
			<h1 className="text-[48px] font-semibold text-left">
				{" "}
				Your credits are <span className="text-primary-500"> low </span>
			</h1>
			<div className="flex max-md:flex-col gap-10 w-full justify-between">
				<PaymentForm />
				<div className="md:max-w-[425px] h-[627px] w-full p-9 relative bg-white rounded-md flex flex-col justify-between overflow-hidden">
					<div className="flex items-center">
						<p className="text-primary-500 text-[128px] font-normal">0</p>
						<p className="text-[#4B5563] text-lg mt-16"> Credits remaining</p>
					</div>
					<div>
						<div className="relative z-10 flex flex-col gap-4 mb-6">
							<h2 className="text-[36px] text-left font-semibold">Get Monthly</h2>
							<p className="text-lg text-left font-normal">
								For Only <span className="font-bold text-primary-400 text-lg">55 USD</span> a month
							</p>
							<button className="z-20 bg-primary-50 text-white w-full rounded-full p-2 mt-2 ">Buy Now</button>
						</div>
						<img src={credits} className="absolute bottom-[-20px] right-[-10px] max-h-[550px] z-0" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreditsPage;
