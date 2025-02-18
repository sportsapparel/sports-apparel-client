"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import { images } from "@/constants/imageUrls";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isClient, setIsClient] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setiIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setIsClient(true); // This will set isClient to true after the first render
  }, []);

  if (!isClient) {
    return null; // or render a loading skeleton
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error when the user starts typing again
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setiIsLoading(true);
      if (validate()) {
        // console.log("Form Data Submitted:", formData);
        const res = await axios.post("/api/contact", formData);
        setiIsLoading(false);
        setMessage(res.data.message);
        // console.log(res);
      }
    } catch (error) {
      setiIsLoading(false);
      console.error("Error submitting contact form:", error);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <main className="py-10">
        <h1 className="text-4xl uppercase text-center text-gray-800 mb-8 pb-5">
          Contact
        </h1>

        <div className="grid grid-cols-2 md-to-xs:grid-cols-1 px-[10%] place-items-center gap-5 gap-y-11">
          {/* Image Section */}
          <motion.div
            initial={{
              opacity: 0,
              x: 1 % 2 === 0 ? 100 : -100, // Alternate between top and bottom
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }} // Ensures animation only happens once
            transition={{ duration: 1, delay: 1 * 0.1 }} // Add delay for staggered effect
            className="col-span-1"
          >
            <img
              src={images.ContactPageImage1}
              alt="contact"
              loading="lazy"
              className="w-full h-[80dvh] object-contain"
            />
          </motion.div>

          {/* Form Section */}
          <div className="col-span-1">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
              <Input
                className="col-span-1"
                value={formData.name}
                type="text"
                label="Name"
                name="name"
                onChange={handleInputChange}
                helperText={errors.name}
                error={!!errors.name}
              />
              <Input
                className="col-span-1"
                value={formData.email}
                type="email"
                label="Email"
                name="email"
                onChange={handleInputChange}
                helperText={errors.email}
                error={!!errors.email}
              />
              <Input
                className="col-span-2"
                value={formData.subject}
                type="text"
                label="Subject"
                name="subject"
                onChange={handleInputChange}
                helperText={errors.subject}
                error={!!errors.subject}
              />
              <Input
                className="col-span-2"
                value={formData.message}
                type="textarea"
                label="Message"
                name="message"
                onChange={handleInputChange}
                helperText={errors.message}
                error={!!errors.message}
              />
              <Button className="col-span-2" type="submit">
                Submit
              </Button>
              <p className="text-center text-green-800  ">{message}</p>
            </form>
          </div>
          <motion.div
            initial={{
              opacity: 0,
              x: 1 % 2 === 0 ? 100 : -100, // Alternate between top and bottom
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }} // Ensures animation only happens once
            transition={{ duration: 1, delay: 1 * 0.1 }} // Add delay for staggered effect
            className=" text-center max-w-md mx-auto space-y-4"
          >
            <h4 className="text-xl font-semibold text-gray-800">Email Us</h4>
            <p className="text-gray-600 font-light">sportsapparel@gmail.com</p>

            <h4 className="text-xl font-semibold text-gray-800 mt-6">
              Call Us
            </h4>
            <p className="text-gray-600 font-light">1234567899</p>
            <p className="text-gray-600 font-light">
              Monday - Friday 7am-7pm EST
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mt-6">
              Visit Us
            </h4>
            <p className="text-gray-600 font-light">
              New York | 500 Terry Francine Street, 94158
            </p>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              x: 1 % 2 === 0 ? -100 : 100, // Alternate between top and bottom
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }} // Ensures animation only happens once
            transition={{ duration: 1, delay: 1 * 0.1 }} // Add delay for staggered effect
          >
            <img
              src={images.ContactPageImage2}
              alt="contact"
              loading="lazy"
              className="w-full h-[80dvh] object-contain"
            />
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Contact;
