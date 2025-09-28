import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, message, Card, Divider, Tag, Statistic } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, CreditCardOutlined, ShoppingCartOutlined, FileTextOutlined, PlusOutlined } from '@ant-design/icons';
import { addCredits } from '../../services/creditsService';
import { CustomerCreditData } from '../../stores/creditsStore';
import useAuthStore from '../../stores/authStore';

interface UserProfileModalProps {
  visible: boolean;
  onClose: () => void;
  userData: CustomerCreditData | null;
  onCreditsAdded?: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  visible,
  onClose,
  userData,
  onCreditsAdded
}) => {
  const [creditsToAdd, setCreditsToAdd] = useState<number>(0);
  const [addingCredits, setAddingCredits] = useState(false);
  const { user } = useAuthStore();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (visible) {
      setCreditsToAdd(0);
    }
  }, [visible]);

  const handleAddCredits = async () => {
    if (!userData || creditsToAdd <= 0) {
      message.error('Please enter a valid number of credits to add');
      return;
    }

    setAddingCredits(true);
    try {
      const adminName = user?.userName || user?.firstName || 'Admin';
      const reason = `Added by Admin (${adminName})`;
      const response = await addCredits(userData.customerId, creditsToAdd, reason);
      
      if (response.success) {
        message.success(`Successfully added ${creditsToAdd} credits to ${userData.customerName}'s account`);
        setCreditsToAdd(0);
        // Call the refresh function passed from parent
        onCreditsAdded?.();
      } else {
        message.error(response.message || 'Failed to add credits');
      }
    } catch (error) {
      console.error('Error adding credits:', error);
      message.error('An error occurred while adding credits');
    } finally {
      setAddingCredits(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCreditStatusColor = (credits: number) => {
    if (credits < 5) return 'red';
    if (credits < 20) return 'orange';
    if (credits < 50) return 'blue';
    return 'green';
  };

  if (!userData) return null;

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <UserOutlined className="text-blue-600 text-lg" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 m-0">
              {userData.customerName}
            </h2>
            <p className="text-sm text-gray-500 m-0">Customer Profile</p>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      centered
      footer={null}
      className="user-profile-modal"
    >
      <div className="py-6">
        {/* User Basic Information */}
        <Card className="mb-6" bodyStyle={{ padding: '20px' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <UserOutlined className="text-blue-600" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-gray-900 font-medium">{userData.customerName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <p className="text-gray-900 flex items-center gap-2">
                  <MailOutlined className="text-gray-400" />
                  {userData.customerEmail}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <p className="text-gray-900 flex items-center gap-2">
                  <PhoneOutlined className="text-gray-400" />
                  {userData.customerPhone || 'Not provided'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Plan Type</label>
                <Tag color={userData.customerPlanType === 'UNLIMITED' ? 'green' : 'blue'}>
                  {userData.customerPlanType || 'N/A'}
                </Tag>
              </div>
            </div>
          </div>
        </Card>

        {/* Credits Information */}
        <Card className="mb-6" bodyStyle={{ padding: '20px' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCardOutlined className="text-green-600" />
            Credits Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Statistic
              title="Total Purchased Credits"
              value={userData.totalPurchasedCredits}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
            <Statistic
              title="Remaining Credits"
              value={userData.totalRemainingCredits}
              prefix={<CreditCardOutlined />}
              valueStyle={{ color: getCreditStatusColor(userData.totalRemainingCredits) === 'red' ? '#cf1322' : '#1890ff' }}
            />
            <Statistic
              title="Credits Spent"
              value={userData.totalSpentCredits}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </div>
          
          <Divider />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Last Purchase Date</label>
              <p className="text-gray-900">{formatDate(userData.lastPurchaseDate)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Credits Expiring Soon</label>
              <p className="text-gray-900">
                <Tag color={userData.expiringSoonCredits > 0 ? 'orange' : 'green'}>
                  {userData.expiringSoonCredits} credits
                </Tag>
              </p>
            </div>
          </div>
        </Card>

        {/* Add Credits Section */}
        <Card className="mb-6" bodyStyle={{ padding: '20px' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PlusOutlined className="text-blue-600" />
            Add Credits
          </h3>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Number of Credits to Add
              </label>
              <Input
                type="number"
                min="1"
                max="1000"
                value={creditsToAdd}
                onChange={(e) => setCreditsToAdd(Number(e.target.value))}
                placeholder="Enter number of credits"
                size="large"
                className="w-full"
              />
            </div>
            <Button
              type="primary"
              size="large"
              loading={addingCredits}
              onClick={handleAddCredits}
              disabled={creditsToAdd <= 0}
              className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
            >
              {addingCredits ? 'Adding...' : 'Add Credits'}
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Credits will be added to {userData.customerName}'s account immediately
          </p>
        </Card>

        {/* Credit Batches Details */}
        {userData.creditBatches && userData.creditBatches.length > 0 && (
          <Card bodyStyle={{ padding: '20px' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileTextOutlined className="text-purple-600" />
              Credit Batches
            </h3>
            <div className="space-y-3">
              {userData.creditBatches.map((batch, index) => (
                <div key={batch.batchId} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">Batch #{index + 1}</p>
                      <p className="text-sm text-gray-600">
                        {batch.totalCredits} credits purchased
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Remaining: <span className="font-medium text-green-600">{batch.remainingCredits}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Expires: {formatDate(batch.expiresAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </Modal>
  );
};

export default UserProfileModal;
