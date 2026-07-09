import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="relative bg-[#0D0D0D] py-24 px-6 md:px-16 border-t border-white/10">
      <p className="font-['DM_Mono'] text-[11px] uppercase tracking-widest text-[#FF442B] mb-16">
        // Contact
      </p>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">

        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-5/12"
        >
          <h2
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
          >
            Let's work<br />together.
          </h2>
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/50 text-base leading-relaxed mb-12"
          >
            I'm currently available for new projects. Let's discuss how we can build something great together.
          </p>

          <div className="space-y-7">
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
                Email
              </p>
              <a
                href="mailto:braimohmalik@gmail.com"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
                className="text-lg font-medium text-white hover:text-[#FF442B] transition-colors"
              >
                braimohmalik@gmail.com
              </a>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
                Location
              </p>
              <p style={{ fontFamily: "'Inter Tight', sans-serif" }} className="text-lg font-medium text-white">
                Lagos, Nigeria
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-7/12"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-white/40">
                  Name
                </label>
                <input
                  {...register("name")}
                  className="w-full bg-transparent border-b border-white/15 pb-4 text-white focus:outline-none focus:border-[#FF442B] transition-colors placeholder:text-white/20"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  placeholder="Your name"
                />
                {errors.name && <span className="text-[#FF442B] text-xs">{errors.name.message}</span>}
              </div>

              <div className="space-y-2">
                <label style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-white/40">
                  Email
                </label>
                <input
                  {...register("email")}
                  className="w-full bg-transparent border-b border-white/15 pb-4 text-white focus:outline-none focus:border-[#FF442B] transition-colors placeholder:text-white/20"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  placeholder="your@email.com"
                />
                {errors.email && <span className="text-[#FF442B] text-xs">{errors.email.message}</span>}
              </div>
            </div>

            <div className="space-y-2">
              <label style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-white/40">
                Subject
              </label>
              <select
                {...register("subject")}
                className="w-full bg-transparent border-b border-white/15 pb-4 text-white/60 focus:outline-none focus:border-[#FF442B] transition-colors appearance-none cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "transparent" }}
              >
                <option value="" disabled style={{ background: "#0D0D0D" }}>Select a subject</option>
                <option value="design" style={{ background: "#0D0D0D" }}>Design</option>
                <option value="motion" style={{ background: "#0D0D0D" }}>Motion & Video</option>
                <option value="branding" style={{ background: "#0D0D0D" }}>Branding</option>
                <option value="other" style={{ background: "#0D0D0D" }}>Other</option>
              </select>
              {errors.subject && <span className="text-[#FF442B] text-xs">{errors.subject.message}</span>}
            </div>

            <div className="space-y-2">
              <label style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] uppercase tracking-widest text-white/40">
                Message
              </label>
              <textarea
                {...register("message")}
                rows={4}
                className="w-full bg-transparent border-b border-white/15 pb-4 text-white focus:outline-none focus:border-[#FF442B] transition-colors resize-none placeholder:text-white/20"
                style={{ fontFamily: "'Inter', sans-serif" }}
                placeholder="Tell me about your project..."
              />
              {errors.message && <span className="text-[#FF442B] text-xs">{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="w-full py-5 bg-white/5 border border-white/15 text-white text-[11px] uppercase tracking-widest flex items-center justify-center hover:bg-[#FF442B] hover:border-[#FF442B] transition-all duration-300 disabled:opacity-40"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
