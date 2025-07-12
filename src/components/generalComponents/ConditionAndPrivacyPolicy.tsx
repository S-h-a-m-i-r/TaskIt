import type React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Anchor, Divider, Typography, Card } from "antd";
import {
	FileTextOutlined,
	IeOutlined,
	CalendarOutlined,
	MailOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const TermsAndPrivacyPage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Get section from URL search params or determine from pathname
	const searchParams = new URLSearchParams(location.search);
	const section =
		searchParams.get("section") ||
		(location.pathname === "/privacy" ? "privacy" : null);

	useEffect(() => {
		// Handle /privacy route redirect
		if (location.pathname === "/privacy") {
			navigate("/terms?section=privacy", { replace: true });
			return;
		} else if (location.pathname === "/termsAndConditions") {
			navigate("/terms?section=terms", { replace: true });
			return;
		}

		// Scroll to section if specified
		if (section) {
			setTimeout(() => {
				const element = document.getElementById(section);
				if (element) {
					element.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			}, 100);
		}
	}, [section, location.pathname, navigate]);

	const handleAnchorClick = (link: string) => {
		const sectionId = link.replace("#", "");
		navigate(`/terms?section=${sectionId}`);
	};

	return (
		<div className="min-h-screen mt-24 bg-gray-50 rounded-md">
			<div className="bg-white shadow-sm border-b rounded-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<div>
							<Title level={1} className="!mb-2">
								Legal Information
							</Title>
							<Text className="text-gray-600">
								Terms of Service and Privacy Policy
							</Text>
						</div>
						<div className="text-sm text-gray-500">
							<CalendarOutlined className="mr-2" />
							Last updated: January 15, 2024
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex gap-8">
					{/* Sidebar Navigation */}
					<div className="hidden lg:block w-64 flex-shrink-0">
						<div className="sticky top-8">
							<Card className="shadow-sm">
								<Anchor
									onClick={(e, link) => {
										e.preventDefault();
										handleAnchorClick(link.href);
									}}
									items={[
										{
											key: "terms",
											href: "#terms",
											title: (
												<div className="flex items-center">
													<FileTextOutlined className="mr-2" />
													Terms & Conditions
												</div>
											),
											children: [
												{
													key: "acceptance",
													href: "#acceptance",
													title: "Acceptance of Terms",
												},
												{
													key: "services",
													href: "#services",
													title: "Description of Services",
												},
												{
													key: "user-accounts",
													href: "#user-accounts",
													title: "User Accounts",
												},
												{
													key: "prohibited-uses",
													href: "#prohibited-uses",
													title: "Prohibited Uses",
												},
												{
													key: "termination",
													href: "#termination",
													title: "Termination",
												},
											],
										},
										{
											key: "privacy",
											href: "#privacy",
											title: (
												<div className="flex items-center">
													<IeOutlined className="mr-2" />
													Privacy Policy
												</div>
											),
											children: [
												{
													key: "information-collection",
													href: "#information-collection",
													title: "Information We Collect",
												},
												{
													key: "information-use",
													href: "#information-use",
													title: "How We Use Information",
												},
												{
													key: "information-sharing",
													href: "#information-sharing",
													title: "Information Sharing",
												},
												{
													key: "data-security",
													href: "#data-security",
													title: "Data Security",
												},
												{
													key: "your-rights",
													href: "#your-rights",
													title: "Your Rights",
												},
											],
										},
									]}
								/>
							</Card>
						</div>
					</div>

					{/* Main Content */}
					<div className="flex-1 max-w-4xl">
						{/* Terms and Conditions Section */}
						<section id="terms" className="mb-16">
							<Card className="shadow-sm">
								<div className="flex items-center mb-6">
									<FileTextOutlined className="text-2xl text-blue-600 mr-3" />
									<Title level={2} className="!mb-0">
										Terms and Conditions
									</Title>
								</div>

								<div className="space-y-8">
									<div id="acceptance">
										<Title level={3} className="text-gray-800">
											1. Acceptance of Terms
										</Title>
										<Paragraph className="text-gray-600 leading-relaxed">
											By accessing and using this website, you accept and agree
											to be bound by the terms and provision of this agreement.
											If you do not agree to abide by the above, please do not
											use this service. These Terms of Service constitute a
											legally binding agreement between you and our company
											regarding your use of the service.
										</Paragraph>
										<Paragraph className="text-gray-600 leading-relaxed">
											We reserve the right to update and change the Terms of
											Service from time to time without notice. Any new features
											that augment or enhance the current service, including the
											release of new tools and resources, shall be subject to
											the Terms of Service.
										</Paragraph>
									</div>

									<Divider />

									<div id="services">
										<Title level={3} className="text-gray-800">
											2. Description of Services
										</Title>
										<Paragraph className="text-gray-600 leading-relaxed">
											Our platform provides users with access to a comprehensive
											suite of digital tools and services designed to enhance
											productivity and collaboration. This includes but is not
											limited to:
										</Paragraph>
										<ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
											<li>Cloud-based storage and file management systems</li>
											<li>
												Real-time collaboration tools and communication features
											</li>
											<li>Project management and task tracking capabilities</li>
											<li>Analytics and reporting functionalities</li>
											<li>
												Integration with third-party applications and services
											</li>
										</ul>
									</div>

									<Divider />

									<div id="user-accounts">
										<Title level={3} className="text-gray-800">
											3. User Accounts
										</Title>
										<Paragraph className="text-gray-600 leading-relaxed">
											To access certain features of our service, you must
											register for an account. When you register for an account,
											you must provide information that is accurate, complete,
											and current at all times. You are responsible for
											safeguarding the password and for maintaining the
											confidentiality of your account.
										</Paragraph>
										<Paragraph className="text-gray-600 leading-relaxed">
											You agree not to disclose your password to any third party
											and to take sole responsibility for any activities or
											actions under your account, whether or not you have
											authorized such activities or actions.
										</Paragraph>
									</div>

									<Divider />

									<div id="prohibited-uses">
										<Title level={3} className="text-gray-800">
											4. Prohibited Uses
										</Title>
										<Paragraph className="text-gray-600 leading-relaxed">
											You may not use our service for any illegal or
											unauthorized purpose. You agree to comply with all local
											laws regarding online conduct and acceptable content.
											Specifically, you agree not to:
										</Paragraph>
										<ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
											<li>
												Violate any applicable local, state, national, or
												international law
											</li>
											<li>
												Transmit any harassing, libelous, abusive, threatening,
												or harmful material
											</li>
											<li>
												Transmit any material that encourages conduct that would
												constitute a criminal offense
											</li>
											<li>
												Attempt to gain unauthorized access to other computer
												systems
											</li>
											<li>
												Interfere with another person's use and enjoyment of the
												service
											</li>
										</ul>
									</div>

									<Divider />

									<div id="termination">
										<Title level={3} className="text-gray-800">
											5. Termination
										</Title>
										<Paragraph className="text-gray-600 leading-relaxed">
											We may terminate or suspend your account and bar access to
											the service immediately, without prior notice or
											liability, under our sole discretion, for any reason
											whatsoever and without limitation, including but not
											limited to a breach of the Terms.
										</Paragraph>
										<Paragraph className="text-gray-600 leading-relaxed">
											If you wish to terminate your account, you may simply
											discontinue using the service. Upon termination, your
											right to use the service will cease immediately.
										</Paragraph>
									</div>
								</div>
							</Card>
						</section>

						{/* Privacy Policy Section */}
						<section id="privacy">
							<Card className="shadow-sm">
								<div className="flex items-center mb-6">
									<IeOutlined className="text-2xl text-green-600 mr-3" />
									<Title level={2} className="!mb-0">
										Privacy Policy
									</Title>
								</div>

								<div className="space-y-8">
									<div id="information-collection">
										<Title level={3} className="text-gray-800">
											1. Information We Collect
										</Title>
										<Paragraph className="text-gray-600 leading-relaxed">
											We collect information you provide directly to us, such as
											when you create an account, use our services, or contact
											us for support. This information may include:
										</Paragraph>
										<ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
											<li>
												<strong>Personal Information:</strong> Name, email
												address, phone number, and billing information
											</li>
											<li>
												<strong>Account Information:</strong> Username,
												password, and account preferences
											</li>
											<li>
												<strong>Usage Information:</strong> Information about
												how you use our service and interact with content
											</li>
											<li>
												<strong>Device Information:</strong> Information about
												your device, browser, and operating system
											</li>
											<li>
												<strong>Location Information:</strong> General location
												information based on IP address
											</li>
										</ul>
									</div>

									<Divider />

									<div id="information-use">
										<Title level={3} className="text-gray-800">
											2. How We Use Your Information
										</Title>
										<Paragraph className="text-gray-600 leading-relaxed">
											We use the information we collect to provide, maintain,
											and improve our services. Specifically, we use your
											information to:
										</Paragraph>
										<ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
											<li>Provide and deliver the services you request</li>
											<li>Process transactions and send related information</li>
											<li>
												Send technical notices, updates, and support messages
											</li>
											<li>
												Respond to your comments, questions, and customer
												service requests
											</li>
											<li>
												Monitor and analyze trends, usage, and activities in
												connection with our services
											</li>
											<li>
												Personalize and improve the services and provide content
												or features that match user profiles
											</li>
										</ul>
									</div>

									<Divider />

									<div id="information-sharing">
										<Title level={3} className="text-gray-800">
											3. Information Sharing and Disclosure
										</Title>
										<Paragraph className="text-gray-600 leading-relaxed">
											We do not sell, trade, or otherwise transfer your personal
											information to third parties without your consent, except
											as described in this policy. We may share your information
											in the following circumstances:
										</Paragraph>
										<ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
											<li>
												<strong>Service Providers:</strong> With third-party
												vendors who provide services on our behalf
											</li>
											<li>
												<strong>Legal Requirements:</strong> When required by
												law or to protect our rights and safety
											</li>
											<li>
												<strong>Business Transfers:</strong> In connection with
												any merger, sale, or transfer of assets
											</li>
											<li>
												<strong>Consent:</strong> With your explicit consent for
												any other purpose
											</li>
										</ul>
									</div>

									<Divider />

									<div id="data-security">
										<Title level={3} className="text-gray-800">
											4. Data Security
										</Title>
										<Paragraph className="text-gray-600 leading-relaxed">
											We implement appropriate technical and organizational
											measures to protect your personal information against
											unauthorized access, alteration, disclosure, or
											destruction. These measures include:
										</Paragraph>
										<ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
											<li>Encryption of data in transit and at rest</li>
											<li>
												Regular security assessments and penetration testing
											</li>
											<li>Access controls and authentication mechanisms</li>
											<li>Employee training on data protection and privacy</li>
											<li>
												Incident response procedures for security breaches
											</li>
										</ul>
									</div>

									<Divider />

									<div id="your-rights">
										<Title level={3} className="text-gray-800">
											5. Your Rights and Choices
										</Title>
										<Paragraph className="text-gray-600 leading-relaxed">
											You have certain rights regarding your personal
											information, including:
										</Paragraph>
										<ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
											<li>
												<strong>Access:</strong> Request access to your personal
												information
											</li>
											<li>
												<strong>Correction:</strong> Request correction of
												inaccurate or incomplete information
											</li>
											<li>
												<strong>Deletion:</strong> Request deletion of your
												personal information
											</li>
											<li>
												<strong>Portability:</strong> Request a copy of your
												information in a structured format
											</li>
											<li>
												<strong>Objection:</strong> Object to processing of your
												information for certain purposes
											</li>
										</ul>
										<Paragraph className="text-gray-600 leading-relaxed mt-4">
											To exercise these rights, please contact us using the
											information provided below.
										</Paragraph>
									</div>
								</div>
							</Card>
						</section>

						{/* Contact Information */}
						<Card className="shadow-sm mt-8">
							<div className="text-center">
								<MailOutlined className="text-2xl text-blue-600 mb-3" />
								<Title level={4} className="!mb-2">
									Questions or Concerns?
								</Title>
								<Paragraph className="text-gray-600">
									If you have any questions about these Terms and Conditions or
									Privacy Policy, please contact us at:
								</Paragraph>
								<div className="space-y-1 text-gray-600">
									<div>Email: legal@company.com</div>
									<div>Phone: (555) 123-4567</div>
									<div>Address: 123 Legal Street, Privacy City, PC 12345</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TermsAndPrivacyPage;
