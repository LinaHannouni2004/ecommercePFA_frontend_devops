import { FaShippingFast, FaExchangeAlt, FaCreditCard, FaGift, FaHeadset } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaShippingFast className="w-8 h-8 mb-4 mx-auto text-blue-600" />,
      title: "Free Shipping",
      description: "For all of these Gmail apps"
    },
    {
      icon: <FaExchangeAlt className="w-8 h-8 mb-4 mx-auto text-green-600" />,
      title: "20 Days Returns",
      description: "For our Exchange Payload"
    },
    {
      icon: <FaCreditCard className="w-8 h-8 mb-4 mx-auto text-purple-600" />,
      title: "Selected Expenses",
      description: "Payment Details Available"
    },
    {
      icon: <FaGift className="w-8 h-8 mb-4 mx-auto text-red-600" />,
      title: "Special Offer",
      description: "Remove an AirView"
    },
    {
      icon: <FaHeadset className="w-8 h-8 mb-4 mx-auto text-orange-600" />,
      title: "Support #47",
      description: "Exclusive AirWatch"
    }
  ];

  return (
    <div className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
          <div 
          key={index} 
          className="bg-gradient-to-r from-gray-950 via-purple-950 to-red-950 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"    style={{ 
            marginLeft: "100px",
            width: "200px" ,
            marginBottom: "150px"           }}
        >
              {feature.icon}
              <h3 className="text-xl font-bold text-purple-800 mb-2">{feature.title}</h3>
              <p className="text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FeaturesSection;
