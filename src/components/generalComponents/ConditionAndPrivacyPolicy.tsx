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
    <div className="min-h-screen bg-gray-50 rounded-md">
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
                        {
                          key: "direct-debit",
                          href: "#direct-debit",
                          title: "Direct Debit Agreement",
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

                  <Divider />

                  <div id="direct-debit">
                    <Title level={3} className="text-gray-800">
                      6. Direct Debit Request (DDR) Service Agreement
                    </Title>
                    <Paragraph className="text-gray-600 leading-relaxed">
                      This Direct Debit Request Service Agreement ("DDR
                      Agreement") governs the use of direct debit payment
                      services provided through our platform. By setting up a
                      direct debit payment method, you agree to be bound by the
                      terms and conditions outlined in this section.
                    </Paragraph>

                    <Title level={4} className="text-gray-800 mt-6">
                      6.1 Authorization and Setup
                    </Title>
                    <Paragraph className="text-gray-600 leading-relaxed">
                      By providing your bank account details and authorizing
                      direct debit payments, you grant us permission to:
                    </Paragraph>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>
                        Initiate direct debit transactions from your specified
                        bank account
                      </li>
                      <li>
                        Collect payments for services, subscriptions, or credits
                        as agreed
                      </li>
                      <li>
                        Process recurring payments according to your selected
                        billing cycle
                      </li>
                      <li>
                        Handle any failed payment attempts and associated fees
                      </li>
                    </ul>

                    <Title level={4} className="text-gray-800 mt-6">
                      6.2 Payment Processing
                    </Title>
                    <Paragraph className="text-gray-600 leading-relaxed">
                      Direct debit payments will be processed according to the
                      following terms:
                    </Paragraph>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>
                        <strong>Payment Timing:</strong> Payments will be
                        debited from your account on the agreed date or within
                        2-3 business days of the due date
                      </li>
                      <li>
                        <strong>Payment Amount:</strong> The exact amount will
                        be clearly communicated before each transaction
                      </li>
                      <li>
                        <strong>Payment Frequency:</strong> As specified in your
                        subscription or service agreement
                      </li>
                      <li>
                        <strong>Advance Notice:</strong> We will provide at
                        least 10 business days' notice before any changes to
                        payment amounts or schedules
                      </li>
                    </ul>

                    <Title level={4} className="text-gray-800 mt-6">
                      6.3 Your Responsibilities
                    </Title>
                    <Paragraph className="text-gray-600 leading-relaxed">
                      You are responsible for ensuring that:
                    </Paragraph>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>
                        Your bank account has sufficient funds to cover direct
                        debit payments
                      </li>
                      <li>
                        Your bank account details remain current and accurate
                      </li>
                      <li>
                        You notify us immediately of any changes to your bank
                        account information
                      </li>
                      <li>
                        You understand that insufficient funds may result in
                        failed payment fees
                      </li>
                    </ul>

                    <Title level={4} className="text-gray-800 mt-6">
                      6.4 Failed Payments and Fees
                    </Title>
                    <Paragraph className="text-gray-600 leading-relaxed">
                      In the event of a failed direct debit payment:
                    </Paragraph>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>
                        We will attempt to process the payment again within 5
                        business days
                      </li>
                      <li>
                        Failed payment fees may be charged as per your bank's
                        policy
                      </li>
                      <li>
                        We may suspend your account or services until payment is
                        successfully processed
                      </li>
                      <li>
                        You will be notified of any failed payment attempts via
                        email or SMS
                      </li>
                    </ul>

                    <Title level={4} className="text-gray-800 mt-6">
                      6.5 Cancellation and Changes
                    </Title>
                    <Paragraph className="text-gray-600 leading-relaxed">
                      You may cancel or modify your direct debit authorization
                      at any time by:
                    </Paragraph>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>
                        Contacting our customer service team at least 5 business
                        days before the next scheduled payment
                      </li>
                      <li>
                        Updating your payment method through your account
                        settings
                      </li>
                      <li>
                        Providing written notice of cancellation to our billing
                        department
                      </li>
                    </ul>
                    <Paragraph className="text-gray-600 leading-relaxed mt-4">
                      <strong>Note:</strong> Cancelling your direct debit
                      authorization does not automatically cancel your
                      subscription or service agreement. You must separately
                      cancel your subscription to avoid continued charges.
                    </Paragraph>

                    <Title level={4} className="text-gray-800 mt-6">
                      6.6 Dispute Resolution
                    </Title>
                    <Paragraph className="text-gray-600 leading-relaxed">
                      If you believe a direct debit payment has been processed
                      incorrectly:
                    </Paragraph>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>Contact our customer service team immediately</li>
                      <li>Provide details of the disputed transaction</li>
                      <li>
                        We will investigate and respond within 10 business days
                      </li>
                      <li>
                        If an error is confirmed, we will provide a full refund
                        within 5 business days
                      </li>
                    </ul>

                    <Title level={4} className="text-gray-800 mt-6">
                      6.7 Data Protection and Security
                    </Title>
                    <Paragraph className="text-gray-600 leading-relaxed">
                      Your bank account information is protected by:
                    </Paragraph>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>
                        Industry-standard encryption and security measures
                      </li>
                      <li>
                        Compliance with PCI DSS standards for payment processing
                      </li>
                      <li>Secure storage and transmission of financial data</li>
                      <li>Regular security audits and monitoring</li>
                    </ul>

                    <Title level={4} className="text-gray-800 mt-6">
                      6.8 Contact Information
                    </Title>
                    <Paragraph className="text-gray-600 leading-relaxed">
                      For questions or concerns regarding direct debit payments,
                      contact us at:
                    </Paragraph>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>Email: billing@company.com</li>
                      <li>Phone: (555) 123-4567 (Billing Department)</li>
                      <li>
                        Business Hours: Monday - Friday, 9:00 AM - 6:00 PM EST
                      </li>
                    </ul>
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
                  <div>Email: support@taskaway.com.au</div>
                  <div>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    enquiries@taskaway.com.au
                  </div>
                  <div>&nbsp; &nbsp; &nbsp; &nbsp; ranny@taskaway.com.au</div>
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
