const Footer = () => {
  return (
    <footer className="bg-white shadow-sm mt-auto">
      <div className="container h-16 flex items-center justify-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Penny. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 