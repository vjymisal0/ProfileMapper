import { Profile } from '../types';

export const profiles: Profile[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    description: 'Marketing Director at a leading tech startup with expertise in digital marketing and brand strategy.',
    photo: 'https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=800',
    address: 'Koramangala, Bangalore, Karnataka',
    coordinates: {
      longitude: 77.6244,
      latitude: 12.9351
    },
    contact: {
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      linkedin: 'https://linkedin.com/in/priyasharma'
    },
    skills: ['Digital Marketing', 'Brand Strategy', 'Content Marketing', 'Social Media'],
    interests: ['Technology', 'Startup Ecosystem', 'Digital Innovation']
  },
  {
    id: '2',
    name: 'Arjun Patel',
    description: 'Senior Software Engineer specializing in cloud architecture and distributed systems at a major tech company.',
    photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800',
    address: 'Hitech City, Hyderabad, Telangana',
    coordinates: {
      longitude: 78.3816,
      latitude: 17.4435
    },
    contact: {
      email: 'arjun.patel@email.com',
      phone: '+91 98765 12345',
      linkedin: 'https://linkedin.com/in/arjunpatel'
    },
    skills: ['Cloud Architecture', 'Microservices', 'Kubernetes', 'Go', 'Python'],
    interests: ['Open Source', 'Cloud Computing', 'DevOps']
  },
  {
    id: '3',
    name: 'Zara Khan',
    description: 'Data Scientist working on AI/ML solutions for healthcare at a leading research institution.',
    photo: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=800',
    address: 'Powai, Mumbai, Maharashtra',
    coordinates: {
      longitude: 72.9052,
      latitude: 19.0760
    },
    contact: {
      email: 'zara.khan@email.com',
      phone: '+91 98765 98765',
      linkedin: 'https://linkedin.com/in/zarakhan'
    },
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Healthcare Analytics'],
    interests: ['AI in Healthcare', 'Medical Research', 'Data Ethics']
  },
  {
    id: '4',
    name: 'Vikram Reddy',
    description: 'UX/UI Designer crafting digital experiences for India\'s top e-commerce platforms.',
    photo: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=800',
    address: 'Indiranagar, Bangalore, Karnataka',
    coordinates: {
      longitude: 77.6410,
      latitude: 12.9719
    },
    contact: {
      email: 'vikram.reddy@email.com',
      phone: '+91 98765 56789',
      linkedin: 'https://linkedin.com/in/vikramreddy'
    },
    skills: ['UI Design', 'User Research', 'Figma', 'Design Systems'],
    interests: ['Mobile UX', 'Design Thinking', 'Accessibility']
  },
  {
    id: '5',
    name: 'Ananya Mehta',
    description: 'Financial Analyst at a top investment firm, specializing in startup valuations and market research.',
    photo: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=800',
    address: 'Cyber City, Gurugram, Haryana',
    coordinates: {
      longitude: 77.0266,
      latitude: 28.4595
    },
    contact: {
      email: 'ananya.mehta@email.com',
      phone: '+91 98765 34567',
      linkedin: 'https://linkedin.com/in/ananyamehta'
    },
    skills: ['Financial Modeling', 'Valuation', 'Market Analysis', 'Excel'],
    interests: ['Fintech', 'Venture Capital', 'Economic Policy']
  }
];