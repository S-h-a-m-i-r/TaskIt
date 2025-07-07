import { Form, Input, Button, Card, Row, Col, Typography } from "antd"


const { Title, Paragraph } = Typography

export default function ContactPage() {
  return (
    <div className="mt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-2">Get in touch with our team</p>
        </div>
      </div>

      <div className="flex w-full justify-center px-4 py-12">
        <Row gutter={[48, 48]}>
          {/* Contact Form */}
          <Col xs={24} lg={24}>
            <Card>
              <Title level={4}>Send us a message</Title>
              <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </Paragraph>
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item label="First Name" name="firstName" required>
                      <Input placeholder="John" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Last Name" name="lastName" required>
                      <Input placeholder="Doe" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Email" name="email" required>
                  <Input type="email" placeholder="john@example.com" />
                </Form.Item>

                <Form.Item label="Phone Number" name="phone">
                  <Input type="tel" placeholder="+1 (555) 123-4567" />
                </Form.Item>

                <Form.Item label="Subject" name="subject" required>
                  <Input placeholder="How can we help you?" />
                </Form.Item>

                <Form.Item label="Message" name="message" required>
                  <Input.TextArea rows={4} placeholder="Tell us more about your inquiry..." />
                </Form.Item>

                <Button type="primary" block className="bg-primary-50 rounded-md">Send Message</Button>
              </Form>
            </Card>
          </Col>

         
         
        </Row>
      </div>
    </div>
  )
}
