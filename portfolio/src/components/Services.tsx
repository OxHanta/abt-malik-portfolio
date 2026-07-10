import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Branding & Marketing",
    items: [
      "Brand Strategy and Messaging",
      "Logo Design",
      "Visual Identity",
      "Brand Guidelines & Frameworks",
      "Marketing materials",
      "Motion Design"
    ]
  },
  {
    title: "Website Design",
    items: [
      "Landing Pages",
      "Corporate Websites",
      "Blogs",
      "E-commerce",
      "Complex Websites"
    ]
  },
  {
    title: "Web Development",
    items: [
      "Framer, Webflow, or WordPress Builds",
      "CMS Integration",
      "SEO Optimization",
      "Site Migrations"
    ]
  },
  {
    title: "Application Design",
    items: [
      "Mobile Apps",
      "Desktop Apps",
      "Complex Systems",
      "Design Systems Optimization"
    ]
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="border-t border-border pt-8 mb-16">
          <p className="font-mono text-sm text-black uppercase tracking-widest">
            // Services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="border-t border-border pt-8"
            >
              <h3 className="text-2xl font-display font-bold text-black mb-8">
                {service.title}
              </h3>
              <ul className="space-y-4">
                {service.items.map((item, itemIdx) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="font-mono text-sm text-muted-foreground mt-1">
                      ({String(itemIdx + 1).padStart(2, '0')})
                    </span>
                    <span className="text-lg text-black font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
