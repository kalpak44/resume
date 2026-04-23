import profileImage from '../assets/profile.jpg'

export const profile = {
  name: 'Pavel Usanli',
  role: 'Software Engineer Specializing in Java',
  avatar: profileImage,

  meta: [
    { icon: 'fa-solid fa-location-dot', text: 'Sofia City, Bulgaria' },
    {
      icon: 'fa-solid fa-envelope',
      text: 'pavel.usanli@gmail.com',
      link: 'mailto:pavel.usanli@gmail.com',
    },
    { icon: 'fa-solid fa-phone', text: '+(359) 887 731 472', link: 'tel:+359887731472' },
  ],

  buttons: [
    {
      text: 'LinkedIn',
      icon: 'fab fa-linkedin',
      class: 'btn btn-primary',
      href: 'https://www.linkedin.com/in/pavel-usanli-721946102',
    },
    {
      text: 'GitHub',
      icon: 'fa-brands fa-github',
      class: 'btn btn-outline-secondary',
      href: 'https://github.com/kalpak44',
    },
    {
      text: 'Resume',
      icon: 'fa-solid fa-download',
      class: 'btn btn-outline-secondary',
      href: '/assets/resume.pdf',
    },
  ],

  summary:
    "I'm a Software Engineer with a focus on Java, passionate about automation and building complete, reliable systems. " +
    'I enjoy developing and maintaining end-to-end solutions - from backend services and APIs to frontend features, ' +
    'infrastructure, and CI/CD. While Java is my main language, I also love working with JavaScript, and ' +
    "I'm always experimenting with new tools and approaches to deliver practical business value. Lately, I enjoy " +
    'experimenting with AI, building agent flows and pipelines, and using and building MCP so development is more ' +
    'productive, clean, and maintainable.',

  experience: [
    {
      title: 'Software Engineer',
      meta: 'foryouandyourcustomers, Sofia (Full-time, June 2020 – Present)',
      bullets: [
        'Designed, developed, and deployed microservices and data transformation applications using Java and Kubernetes.',
        'Collaborated with Product Owners to refine PBIs, clarify scope, and ensure readiness and alignment with product goals.',
        'Reviewed code and approved Pull Requests, ensuring code quality, security, and adherence to engineering standards.',
        'Implemented unit tests and test cases, supporting reliable releases and stable production systems.',
        'Proposed and documented architectural improvements and best practices to maintain a clean and scalable codebase.',
      ],
      technologies: [
        'Azure DevOps',
        'Kubernetes',
        'MongoDB',
        'Jenkins',
        'Azure Key Vaults',
      ],
      skills: [
        'Java',
        'Docker',
        'Azure',
        'Kubernetes',
        'Spring Boot',
        'Microservices',
        'ETL',
        'Containers',
        'CI/CD',
        'Jenkins',
        'React',
      ],
    },
    {
      title: 'Software Engineer',
      meta: 'Ispolink, Remote (Part-time, January 2022 – Present)',
      bullets: [
        'Designed, implemented, and maintained scalable and secure cloud infrastructure using AWS and Terraform.',
        'Developed and deployed microservices and integrated them with databases and third-party APIs.',
        'Wrote and maintained CI/CD pipelines using GitLab CI/CD and Jenkins.',
        'Monitored and debugged cloud infrastructure and services.',
      ],
      technologies: ['AWS', 'GitLab CI/CD', 'Terraform', 'Jenkins', 'Node.js'],
      skills: [
        'Web3',
        'Microservices',
        'Containers',
        'AWS',
        'CI/CD',
        'Node.js',
        'Jenkins',
        'Smart Contracts',
        'Solidity',
        'Terraform',
        'React',
      ],
    },
    {
      title: 'Full Stack Developer',
      meta: 'Intershop Communications AG, Sofia (Full-time, June 2017 – June 2020)',
      bullets: [
        'Developed and maintained web applications using Java and Angular.',
        'Integrated web applications with Intershop eCommerce platform.',
        'Developed and implemented RESTful APIs.',
      ],
      technologies: [
        'Java',
        'Angular',
        'Intershop eCommerce platform',
        'GIT',
        'SVN',
        'Jira',
      ],
    },
    {
      title: 'Junior Java Developer',
      meta: 'Methodia, Sofia (Full-time, October 2015 – June 2017)',
      bullets: [
        'Wrote Java components for the Openbravo ERP platform.',
        'Debugged and fixed bugs in the platform.',
        'Developed and tested code for platform compatibility.',
      ],
      technologies: ['Java', 'Openbravo ERP', 'IntelliJ IDEA', 'Jira'],
    },
  ],

  education: [
    {
      school: 'Technical University at Sofia',
      degree: "Bachelor's Degree in Computer Systems and Technologies (2012 – 2016)",
      faculty: 'Faculty of Computer Systems and Technologies',
    },
  ],
}
