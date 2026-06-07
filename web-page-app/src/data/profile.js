import profileImage from '../assets/profile.jpg'

export const profile = {
  name: 'Pavel Usanli',
  role: 'Software Engineer with Java',
  avatar: profileImage,

  meta: [
    { icon: 'fa-solid fa-location-dot', text: 'Sofia City, Bulgaria' },
    {
      icon: 'fa-solid fa-envelope',
      text: 'contact@pavel-usanli.online',
      link: 'mailto:contact@pavel-usanli.online',
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
    "I'm a Software Engineer with a focus on Java, passionate about automation and building complete, reliable " +
    'systems. I enjoy developing and maintaining end-to-end solutions from backend services and APIs to frontend ' +
    'features, infrastructure, and CI/CD. While Java is my main language, I also like working with JavaScript ' +
    'and keep experimenting with practical tools that deliver real business value. Lately, I enjoy experimenting ' +
    'with AI, building agent flows and pipelines, and using and building MCP so development stays more ' +
    'productive, clean, and maintainable.',

  experience: [
    {
      title: 'Software Engineer',
      meta: 'foryouandyourcustomers, Sofia (Full-time, June 2020 – Present)',
      bullets: [
        'Designed and deployed Java microservices and ETL pipelines on Kubernetes to modernize data transformation flows, enabling reliable processing across distributed systems.',
        'Collaborated with Product Owners to define and refine backlog items before sprints, reducing scope misalignment and keeping development aligned with product goals.',
        'Reviewed Pull Requests for quality and security across a cross-functional team, maintaining consistent engineering standards and catching defects early.',
        'Introduced unit and integration test coverage for critical services, supporting stable releases and reducing production incidents.',
        'Proposed and documented architectural improvements to address growing system complexity, resulting in a cleaner, more maintainable codebase.',
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
        'Designed and maintained scalable cloud infrastructure on AWS using Terraform, providing a reproducible, infrastructure-as-code foundation for all production services.',
        'Built and deployed backend microservices integrated with databases and third-party APIs, expanding platform capabilities and enabling new product features.',
        'Wrote and maintained CI/CD pipelines with GitLab CI/CD and Jenkins, automating delivery workflows and reducing manual release effort.',
        'Monitored and debugged cloud services across environments, proactively identifying and resolving issues to minimize downtime.',
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
        'Developed and maintained Java and Angular web applications integrated with the Intershop eCommerce platform, delivering stable client-facing features on schedule.',
        'Designed and implemented REST APIs for platform integrations, providing a stable and well-defined interface for third-party connectivity.',
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
        'Built Java components for the Openbravo ERP platform to extend core functionality and meet new business requirements.',
        'Debugged and resolved platform issues across feature and compatibility work, restoring stable behavior and preventing regression.',
        'Developed and tested platform changes with a focus on stability, ensuring consistent behavior across releases.',
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
