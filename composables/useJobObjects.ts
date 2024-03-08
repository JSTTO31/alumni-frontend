const types = [
  {
    type: "Full-time",
    description:
      "Full-time positions require employees to work 40 hours per week. They often come with benefits such as health insurance and paid time off.",
  },
  {
    type: "Part-time",
    description:
      "Part-time jobs involve working fewer hours than full-time positions, typically less than 40 hours per week. They offer flexibility in scheduling.",
  },
  {
    type: "Contract",
    description:
      "Contract jobs are temporary positions where individuals are hired for specific projects or timeframes. Contractors may not receive benefits.",
  },
  {
    type: "Remote",
    description:
      "Remote jobs allow employees to work from a location outside of a traditional office setting. They rely on technology for communication and collaboration.",
  },
  {
    type: "Internship",
    description:
      "Internships provide hands-on experience and training for students or recent graduates. They are temporary and may be paid or unpaid.",
  },
];

const levels = [
  {
    level: "Entry-level",
    description:
      "Entry-level positions are suitable for individuals who are new to the workforce or have limited experience in the field. These roles often require minimal prior experience and provide opportunities for learning and skill development.",
  },
  {
    level: "Mid-level",
    description:
      "Mid-level positions require a moderate level of experience and expertise in the field. Professionals in mid-level roles typically have several years of experience and are expected to take on more responsibilities and make significant contributions to projects and teams.",
  },
  {
    level: "Senior-level",
    description:
      "Senior-level positions are reserved for experienced professionals with extensive knowledge and expertise in the field. These roles involve leadership responsibilities, strategic decision-making, and often require mentoring and guiding junior team members.",
  },
  {
    level: "Executive",
    description:
      "Executive positions are the highest level of leadership within an organization. Executives are responsible for setting strategic goals, driving business growth, and overseeing the overall operations of the company. They have significant experience, leadership skills, and a track record of success.",
  },
];

const categories = [
  {
    name: "Information Technology",
    description:
      "Information Technology (IT) involves the use of computer systems and networks to store, retrieve, transmit, and manipulate data. Jobs in this category include software development, network administration, cybersecurity, and database management.",
  },
  {
    name: "Healthcare",
    description:
      "The healthcare industry focuses on providing medical services and promoting wellness. Jobs in this category include physicians, nurses, medical assistants, pharmacists, and healthcare administrators.",
  },
  {
    name: "Finance",
    description:
      "Finance encompasses activities related to managing money, investments, and financial assets. Jobs in this category include financial analysts, investment bankers, accountants, actuaries, and financial advisors.",
  },
  {
    name: "Education",
    description:
      "The education sector involves teaching, training, and imparting knowledge to students at various levels. Jobs in this category include teachers, professors, school administrators, curriculum developers, and education consultants.",
  },
  {
    name: "Marketing",
    description:
      "Marketing involves promoting products, services, or brands to attract and retain customers. Jobs in this category include marketing managers, digital marketers, brand strategists, market researchers, and advertising executives.",
  },
];

const jobs =  [
      {
        "title": "Software Developer",
        "company": "InnovateTech",
        "location": "Austin, TX",
        "salary": "$100,000 - $130,000",
        "requirements": ["Bachelor's degree in Computer Science or related field", "5+ years of experience in software development", "Expertise in multiple programming languages such as Java, Python, or C++", "Experience with software design and architecture"],
        "tags": ["Software Development", "Java", "Python", "C++", "Software Design", "Architecture"],
        "type": "Full-time",
        "level": "Senior-level",
        "category": "Information Technology",
        "description": "We are seeking an experienced Software Developer to join our dynamic team at InnovateTech. The ideal candidate will have a strong background in software development and a passion for innovation. Responsibilities include designing, coding, testing, and debugging software applications, as well as collaborating with cross-functional teams to deliver high-quality solutions. This role offers an exciting opportunity to work on cutting-edge projects and contribute to the success of our company."
      },
      {
        "title": "Business Analyst",
        "company": "Strategic Solutions Inc.",
        "location": "Washington, D.C.",
        "salary": "$90,000 - $110,000",
        "requirements": ["Bachelor's degree in Business Administration, Finance, or related field", "3+ years of experience in business analysis or consulting", "Strong analytical and problem-solving skills", "Excellent communication and stakeholder management abilities"],
        "tags": ["Business Analysis", "Consulting", "Analytics", "Communication", "Stakeholder Management"],
        "type": "Full-time",
        "level": "Mid-level",
        "category": "Business",
        "description": "Strategic Solutions Inc. is hiring a talented Business Analyst to join our team in Washington, D.C. The successful candidate will be responsible for gathering and analyzing business requirements, identifying opportunities for process improvement, and recommending strategic solutions to enhance business performance. Key responsibilities include conducting market research, performing financial analysis, and presenting findings to stakeholders. This role requires strong analytical skills, attention to detail, and the ability to thrive in a fast-paced environment."
      },
      {
        "title": "Product Manager",
        "company": "Tech Innovations Ltd.",
        "location": "San Francisco, CA",
        "salary": "$120,000 - $150,000",
        "requirements": ["Bachelor's degree in Business, Engineering, or related field", "5+ years of experience in product management", "Proven track record of delivering successful products to market", "Strong leadership and strategic planning abilities"],
        "tags": ["Product Management", "Leadership", "Strategic Planning", "Product Development"],
        "type": "Full-time",
        "level": "Senior-level",
        "category": "Product Management",
        "description": "Join Tech Innovations Ltd. as a Product Manager and be part of a dynamic team driving innovation in the tech industry. The ideal candidate will have a passion for product development and a track record of delivering successful products to market. Responsibilities include defining product vision and strategy, leading cross-functional teams, and managing the product lifecycle from concept to launch. This role offers the opportunity to work on groundbreaking projects and shape the future of our company's product portfolio."
      },
      {
        "title": "Registered Nurse",
        "company": "Healthcare Partners",
        "location": "New York, NY",
        "salary": "$70,000 - $90,000",
        "requirements": ["Bachelor's degree in Nursing", "Current RN license", "Clinical experience in healthcare settings", "Strong patient care and critical-thinking skills"],
        "tags": ["Nursing", "Patient Care", "Critical Thinking", "Healthcare"],
        "type": "Full-time",
        "level": "Entry-level",
        "category": "Healthcare",
        "description": "Healthcare Partners is seeking compassionate and dedicated Registered Nurses to join our team in New York, NY. As a Registered Nurse, you will provide direct patient care, assess patient needs, and implement nursing interventions to promote optimal health outcomes. Responsibilities include administering medications, monitoring patient conditions, and collaborating with healthcare professionals to develop individualized care plans. This role offers the opportunity to make a positive impact on patients' lives and advance your career in healthcare."
      },
      {
        "title": "Frontend Developer",
        "company": "WebTech Solutions",
        "location": "Seattle, WA",
        "salary": "$90,000 - $110,000",
        "requirements": ["Bachelor's degree in Computer Science or related field", "3+ years of experience in frontend development", "Proficiency in HTML, CSS, JavaScript, and modern frontend frameworks (e.g., React, Angular, Vue.js)", "Experience with responsive design and cross-browser compatibility"],
        "tags": ["Frontend Development", "HTML", "CSS", "JavaScript", "React", "Angular", "Vue.js"],
        "type": "Full-time",
        "level": "Mid-level",
        "category": "Information Technology",
        "description": "WebTech Solutions is hiring a skilled Frontend Developer to join our team in Seattle, WA. The successful candidate will be responsible for creating engaging and user-friendly web applications using cutting-edge frontend technologies. Key responsibilities include translating design wireframes into responsive and interactive user interfaces, optimizing application performance, and ensuring cross-browser compatibility. This role offers the opportunity to work on exciting projects and collaborate with talented professionals in a dynamic work environment."
      }
    ]


export default { types, levels, categories, jobs };
