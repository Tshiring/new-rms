import { Facebook, Instagram, Linkedin, ChefHat } from "lucide-react"
import Chef from "../../../assets/images/chef.png"

const footerSections = [
  {
    title: "Menu",
    links: [
      { name: "Pricing", href: "/pricing" },
      { name: "Restaurants", href: "/restaurants" },
      { name: "Services", href: "/services" },
      { name: "About Us", href: "/about" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Report an Issue", href: "/report" },
    ],
  },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
]

export default function Footer() {
  return (
    <footer className="bg-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 grid justify-center">
          <img src={Chef} alt="" className="w-40 mx-auto" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Restaurant Management System</h2>
          <p className="text-purple-200 text-lg">Find the best restaurants!</p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Footer Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-purple-100">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-purple-200 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Media Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-purple-100">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-700 pt-8">
          <div className="text-center">
            <p className="text-purple-200">© 2025 RestaurantManagement.com</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
