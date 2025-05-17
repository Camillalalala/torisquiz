
const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} HomeVision. All rights reserved.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-500">
              Created with compassion to help build better futures
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
