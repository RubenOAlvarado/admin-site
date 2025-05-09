export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-4 w-full">
      <div className="px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-3 md:mb-0">
            <p className="text-xs">&copy; {currentYear} EHR Manager. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}