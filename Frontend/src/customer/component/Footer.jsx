import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold mb-3">Farm2Home 🌱</h2>
            <p className="text-sm text-green-100">
              Connecting local farmers directly to your home. Fresh, organic,
              and sustainable.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Farmers</li>
              <li className="hover:text-white cursor-pointer">Products</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <p className="text-sm text-green-100">📍 Kerala, India</p>
            <p className="text-sm text-green-100">📞 +91 98765 43210</p>
            <p className="text-sm text-green-100">✉️ support@farm2home.com</p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4 text-lg">
              <FaFacebookF className="cursor-pointer hover:text-green-300" />
              <FaInstagram className="cursor-pointer hover:text-green-300" />
              <FaTwitter className="cursor-pointer hover:text-green-300" />
              <FaWhatsapp className="cursor-pointer hover:text-green-300" />
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-green-600 mt-8 pt-4 text-center text-sm text-green-200">
          © {new Date().getFullYear()} Farm2Home. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;