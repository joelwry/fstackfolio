const projects_detail = [
  {
    id: "blog-office",
    title: "BlogOffice Entertainment Consultancy",
    description:
      "A multi-service platform delivering event planning, artist promotion, and hotel booking solutions for the entertainment industry.",
    fullDescription: [
      "BlogOffice is a comprehensive platform designed to revolutionize the entertainment consultancy space. It serves as a one-stop solution for event planning, gig management, artist promotion, EPK generation, and hotel booking.",
      "By integrating multiple services under one roof, BlogOffice simplifies the process for music artists and event organizers. Whether you're planning a concert, promoting a new album, or booking a hotel for a tour, the platform offers streamlined solutions to manage all these tasks efficiently.",
      "The technology behind BlogOffice leverages Next.js for fast server-side rendering and excellent SEO performance, React for dynamic and responsive user interfaces, and MongoDB for scalable and robust data management. The use of shadcn UI ensures a modern, consistent design system, while Tailwind CSS keeps the styling clean and maintainable.",
      "Overall, BlogOffice enhances operational efficiency by centralizing multiple services into a single, user-friendly platform that caters to the diverse needs of the entertainment industry."
    ],
    image:
      "/images/project/blogoffice/1.png",
    github: "https://github.com/joelwry/blog_office_central_hub",
    liveUrl: "https://www.blogoffice.vercel.app",
    technologies: [
      "Next.js",
      "React",
      "MongoDB",
      "shadcn UI",
      "Tailwind CSS"
    ],
    features: [
      "Event planning and scheduling",
      "Artist promotion and EPK generation",
      "Hotel booking integration",
      "User-friendly dashboard and search functionality",
      "Real-time notifications and booking confirmations"
    ],
    challenges: [
      "Integrating multiple service modules seamlessly",
      "Ensuring high performance and SEO optimization",
      "Designing a consistent and modern UI",
      "Managing user data securely with MongoDB",
      "Coordinating between various third-party APIs and services"
    ],
    otherImages:['/images/project/blogoffice/1.png','/images/project/blogoffice/2.png','/images/project/blogoffice/3.png','/images/project/blogoffice/4.png']
  },
  {
    id: "tigerstorewise",
    title: "Tigerstorewise Social Log Marketplace",
    description:
      "A secure online marketplace offering verified social logs and accounts for responsible, intentional use, featuring integrated wallet funding and admin management.",
    fullDescription: [
      "Tigerstorewise is a unique platform that provides secure, verified social logs for users who require social accounts for legitimate and positive purposes. The platform ensures that all accounts are vetted and available for purchase, catering to users with specific needs.",
      "The user experience is designed to be seamless: users can fund their wallet, browse a curated collection of social logs, and complete transactions using an integrated payment gateway. Detailed transaction histories and secure wallet management further enhance transparency and reliability.",
      "Built on a robust tech stack, Tigerstorewise leverages Express and Node.js for server-side operations, with EJS for dynamic templating and MongoDB for scalable data storage. Payment processing is handled via Flutterwave, and the admin panel is powered by Django REST Framework to efficiently manage inventory and monitor transactions.",
      "By combining secure transactions with an efficient, user-friendly interface, Tigerstorewise delivers a balanced solution that meets both end-user and administrative needs."
    ],
    image:'/images/project/tigerwise/2.png',
    github: "https://github.com/joelwry/tiglog",
    liveUrl: "https://www.tigerstorewise.com/",
    technologies: [
      "Express",
      "Node.js",
      "EJS",
      "MongoDB",
      "Flutterwave Payment",
      "Django REST Framework"
    ],
    features: [
      "Secure user authentication and wallet management",
      "Integrated payment processing via Flutterwave",
      "Dynamic inventory management for social logs",
      "Admin dashboard for restocking and transaction monitoring",
      "Responsive design focused on performance"
    ],
    challenges: [
      "Ensuring robust security and data privacy",
      "Seamless integration of multiple backend technologies",
      "Reliable payment processing and transaction tracking",
      "Efficient inventory management and admin controls",
      "Balancing user experience with complex backend operations"
    ],
    otherImages : ['/images/project/tigerwise/1.png','/images/project/tigerwise/2.png','/images/project/tigerwise/3.png','/images/project/tigerwise/4.png','/images/project/tigerwise/5.png']
  },
  {
    id: "transport-booking",
    title: "Django-Based Transport Booking Application",
    description:
      "A comprehensive transport booking platform enabling users to schedule trips with Nigerian transportation companies, featuring a robust API for third-party integrations.",
    fullDescription: [
      "This project is a full-stack transport booking application developed using Django. It allows users to book transportation services by selecting their preferred vehicle, specifying travel dates, and choosing departure and destination locations.",
      "The application integrates a RESTful API built with Django Rest Framework, enabling external companies to incorporate our transport booking services into their platforms. Users can search for available vehicles based on their travel criteria, select seats, specify the number of passengers, and proceed with payments. Tickets are delivered via email or within the application for registered users.",
      "Key functionalities include real-time vehicle availability checks, seat selection, secure payment processing, and ticket issuance. The system ensures a seamless booking experience for users and provides transportation companies with an efficient platform to manage bookings."
    ],
    image: "/images/project/9jaride/1.png",
    github: "https://github.com/joelwry/transport_booking",
    liveUrl: null,
    technologies: ["Django", "Django Rest Framework", "PostgreSQL", "JavaScript", "Bootstrap"],
    features: [
      "User-friendly interface for booking transport services",
      "Real-time search and availability of vehicles",
      "Secure payment processing and ticket issuance",
      "RESTful API for third-party integrations",
      "Admin panel for managing bookings and vehicle schedules"
    ],
    challenges: [
      "Ensuring real-time synchronization of vehicle availability",
      "Integrating secure payment gateways",
      "Developing a flexible API for diverse third-party use cases",
      "Handling edge cases in booking modifications and cancellations"
    ],
    otherImages : ["/images/project/9jaride/1.png","/images/project/9jaride/2.png","/images/project/9jaride/3.png","/images/project/9jaride/4.png","/images/project/9jaride/5.png","/images/project/9jaride/6.png"]
  },
  {
    id: "jodev-emailpy",
    title: "jodev_emailpy: Python Package for EmailJS Integration",
    description:
      "A Python package facilitating seamless integration with EmailJS services, enabling client-side applications to send and receive emails without a dedicated backend server.",
    fullDescription: [
      "jodev_emailpy is a Python package designed to simplify email operations by leveraging EmailJS's RESTful services. It allows developers to send and receive emails directly from client-side applications, eliminating the need for a dedicated backend server.",
      "The package provides an intuitive interface for configuring email services, templates, and parameters. Users can initialize the EmailPy client with their EmailJS public key and utilize methods to send emails using predefined templates and dynamic parameters.",
      "This solution is particularly beneficial for applications requiring email functionalities without the overhead of managing a backend infrastructure. It streamlines the process of integrating email services into Python applications, enhancing development efficiency."
    ],
    image: '/images/project/others/emailpy.png',
    github: "https://github.com/joelwry/jodev_emailpy",
    liveUrl: null,
    technologies: ["Python", "EmailJS"],
    features: [
      "Simplified email sending and receiving using EmailJS",
      "Client-side integration without the need for a backend server",
      "Support for dynamic template parameters",
      "Comprehensive documentation and usage examples"
    ],
    challenges: [
      "Ensuring secure handling of EmailJS credentials",
      "Managing dependencies and compatibility with various Python versions",
      "Providing clear documentation for diverse use cases"
    ],
    otherImages : []
  },
  {
    id: "tronx-sender",
    title: "TronX Sender: Automated TRON Cryptocurrency Transfer Bot",
    description:
      "An automated bot designed to facilitate the immediate transfer of TRON cryptocurrency between wallets, featuring a web interface for balance monitoring and transaction management.",
    fullDescription: [
      "TronX Sender is a bot developed to automate the transfer of TRON (TRX) cryptocurrency from a specified source wallet to a destination wallet. This automation is particularly useful for scenarios involving frequent TRX transactions, such as trading or payment processing.",
      "The bot monitors the source wallet for incoming TRX and initiates a transfer to the destination wallet upon detection. It includes a minimalistic frontend interface that allows users to view wallet balances and monitor transaction statuses in real-time.",
      "This project addresses the need for rapid and automated TRX transfers, reducing manual intervention and enhancing operational efficiency in cryptocurrency transactions."
    ],
    image: '/images/project/others/tronx_bot.png',
    github: "https://github.com/joelwry/tronx_sender",
    liveUrl: null,
    technologies: ["Python", "TRON-Python", "Django", "HTML", "CSS"],
    features: [
      "Automated detection and transfer of TRX between wallets",
      "Web interface for real-time balance monitoring",
      "Configurable parameters for source and destination wallets",
      "Logging of transaction histories for auditing purposes"
    ],
    challenges: [
      "Ensuring secure storage and handling of wallet private keys",
      "Managing network latency and transaction confirmation times",
      "Implementing robust error handling for blockchain interactions"
    ],
    otherImages : []
  },
  {
    id: "js-learning-app",
    title: "JavaScript Learning App with Quizzes and Code Challenges",
    description:
      "A mobile application developed using Flet, designed to teach users JavaScript from beginner to advanced levels, featuring timed quizzes, code challenges, and progress tracking.",
    fullDescription: [
      "This project is a mobile application aimed at teaching users JavaScript, covering topics from basic syntax to advanced ES7 features. Developed using Flet, the app offers interactive lessons accompanied by timed quizzes to assess comprehension.",
      "Users can track their learning progress through a personalized dashboard that displays quiz results and completion statuses. The app also includes coding challenges that encourage practical application of learned concepts, with solutions available for reference.",
      "By combining instructional content with interactive assessments and challenges, the app provides a comprehensive learning experience for individuals seeking to enhance their JavaScript skills."
    ],
    image: '/images/project/codemaster/4.png',
    github: "https://github.com/joelwry/master-js-proficiently",
    liveUrl: null,
    technologies: ["Flet", "Python", "JavaScript", "SQLite"],
    features: [
      "Structured JavaScript lessons from beginner to advanced levels",
      "Timed quizzes after each lesson to reinforce learning",
      "Code challenges with solution references",
      "Progress tracking and result history for users",
      "User-friendly interface optimized for mobile devices"
    ],
    challenges: [
      "Designing interactive and engaging educational content",
      "Implementing accurate and efficient quiz and challenge evaluations",
      "Ensuring compatibility across various mobile devices",
      "Maintaining user engagement through reward elements"
    ],
    otherImages : ['/images/project/codemaster/1.png','/images/project/codemaster/2.png','/images/project/codemaster/3.png','/images/project/codemaster/4.png']
  },
   
];

export default projects_detail;

