import { Row, Col, Card, Typography, Button, Badge } from "antd";
import {
  BulbOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  AimOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";

const { Title, Paragraph, Text } = Typography;

export default function AboutPage() {
  return (
    <div className="min-h-screen mt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r rounded-sm from-primary-50 to-purple-600 text-white py-20 text-center">
        <div className="container mx-auto">
          <h2 className="text-white font-bold text-[28px] mb-2">
            About Our Company
          </h2>
          <Paragraph className="text-lg text-white opacity-90 max-w-2xl mx-auto">
            We're passionate about creating innovative solutions that make a difference in people's lives.
          </Paragraph>
          <div className="relative group inline-block">
  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
  <Button
    size="large"
    type="default"
    className="relative bg-white text-black border border-gray-300 rounded-md px-6 py-3 transition-all duration-300"
  >
    Learn More About Us
  </Button>
</div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <Row gutter={32} align="middle">
            <Col md={12}>
              <Card className="shadow-lg">
              <Title level={2}>Our Mission</Title>
              <Paragraph>
                To empower businesses and individuals with cutting-edge technology solutions that drive growth,
                efficiency, and innovation. We believe in creating products that not only meet today's needs but
                anticipate tomorrow's challenges.
              </Paragraph>
              <Row align="middle" gutter={12}>
                <Col>
                  <AimOutlined className="text-blue-600 text-2xl" />
                </Col>
                <Col>
                  <Text strong>Focused on Excellence</Text>
                </Col>
              </Row>
              </Card>
            </Col>
            <Col md={12}>
              <Card className="shadow-lg">
                <Title level={3}>Our Vision</Title>
                <Paragraph>
                To empower businesses and individuals with cutting-edge technology solutions that drive growth,
                efficiency, and innovation. We believe in creating products that not only meet today's needs but
                anticipate tomorrow's challenges.
                </Paragraph>
                <Row align="middle" gutter={12}>
                <Col>
                  <AimOutlined className="text-blue-600 text-2xl" />
                </Col>
                <Col>
                  <Text strong>Focused Client Satisfaction</Text>
                </Col>
              </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Title level={2}>Our Core Values</Title>
            <Paragraph>
              These principles guide everything we do and shape the way we work with our clients and each other.
            </Paragraph>
          </div>
          <Row gutter={24}>
            <Col md={8}>
              <Card bordered={false} className="text-center shadow-md">
                <BulbOutlined className="text-blue-600 text-4xl mb-4" />
                <Title level={4}>Innovation</Title>
                <Paragraph>We constantly push boundaries to deliver groundbreaking solutions.</Paragraph>
              </Card>
            </Col>
            <Col md={8}>
              <Card bordered={false} className="text-center shadow-md">
                <SafetyCertificateOutlined className="text-green-500 text-4xl mb-4" />
                <Title level={4}>Integrity</Title>
                <Paragraph>We build trust through transparency and ethical practices.</Paragraph>
              </Card>
            </Col>
            <Col md={8}>
              <Card bordered={false} className="text-center shadow-md">
                <HeartOutlined className="text-purple-500 text-4xl mb-4" />
                <Title level={4}>Customer Focus</Title>
                <Paragraph>We listen and deliver solutions that exceed expectations.</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Title level={2}>Meet Our Team</Title>
            <Paragraph>Our diverse team brings experience and a passion for excellence.</Paragraph>
          </div>
          <Row gutter={24}>
            {[
              { name: "Sarah Johnson", role: "CEO & Founder", desc: "Visionary leader with 15+ years in technology and business strategy." },
              { name: "Michael Chen", role: "CTO", desc: "Technical expert specializing in scalable architecture and innovation." },
              { name: "Emily Rodriguez", role: "Head of Design", desc: "Creative director focused on UX and design excellence." },
            ].map((member, idx) => (
              <Col md={8} key={idx}>
                <Card hoverable className="text-center shadow-md">
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/black-easy/512/538474-user_512x512.png"
                    alt={member.name}
                    className="rounded-full mb-4 mx-auto"
                    width={120}
                    height={120}
                  />
                  <Title level={4}>{member.name}</Title>
                  <Badge count={member.role} className="bg-transparent mb-3" color="#5051F9" />
                  <Paragraph>{member.desc}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-200 text-white text-center">
        <Row gutter={24} justify="center">
          {[
            ["500", "Happy Clients"],
            ["1000", "Projects Completed"],
            ["50", "Team Members"],
            ["10", "Years Experience"],
          ].map(([value, label], idx) => (
            <Col md={6} key={idx}>
              <Title level={2} className="text-white">
                <CountUp 
                end={Number(value)}
                duration={3}
                />+
              </Title>
              <Text className="text-gray-400">{label}</Text>
            </Col>
          ))}
        </Row>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary-50 text-center text-white">
        <h2 className="font-bold text-[28px] mb-2 text-white" color="white">Ready to Work With Us?</h2>
        <Paragraph className="text-lg text-white opacity-90">
          Let's discuss how we can help bring your vision to life.
        </Paragraph>
        <div className="mt-6">
          <Button size="large" type="default" className="mr-4">Get Started</Button>
          <Button size="large" ghost>Contact Us</Button>
        </div>
      </section>
    </div>
  );
}