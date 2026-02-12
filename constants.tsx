
import React from 'react';
import { NavItem, Service } from './types';
import { 
  Code, 
  Cloud, 
  ShieldCheck, 
  BarChart3, 
  Globe, 
  Cpu,
  MonitorSmartphone,
  Server,
  Database,
  Lock
} from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { 
    label: 'Services', 
    path: '/services',
    dropdown: [
      { label: 'IT Consulting', path: '/services#it-consulting' },
      { label: 'Software Development', path: '/services#software-dev' },
      { label: 'Cloud Solutions', path: '/services#cloud' },
      { label: 'Data Analytics', path: '/services#data-analytics' },
      { label: 'Cybersecurity', path: '/services#cybersecurity' },
      { label: 'Digital Transformation', path: '/services#digital-transformation' },
    ]
  },
  { 
    label: 'Solutions', 
    path: '/solutions',
    dropdown: [
      { label: 'Digital Transformation', path: '/solutions#digital' },
      { label: 'Enterprise Solutions', path: '/solutions#enterprise' },
    ]
  },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact Us', path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    description: 'Strategizing your technology landscape for future-proof growth.',
    icon: 'Cpu',
    details: ['Strategic Planning', 'Infrastructure Audit', 'Tech Stack Optimization']
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    description: 'Custom, scalable, and high-performance software tailored to your business.',
    icon: 'Code',
    details: ['Web Applications', 'Mobile Apps', 'Enterprise Software']
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    description: 'Seamless migration and management of cloud environments.',
    icon: 'Cloud',
    details: ['AWS/Azure/GCP', 'Cloud Migration', 'Serverless Architecture']
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Transforming raw data into actionable business intelligence.',
    icon: 'BarChart3',
    details: ['Big Data', 'Predictive Modeling', 'Visualization']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Comprehensive protection for your digital assets and infrastructure.',
    icon: 'ShieldCheck',
    details: ['Threat Detection', 'Compliance', 'Identity Management']
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    description: 'Modernizing legacy processes with innovative digital technologies.',
    icon: 'MonitorSmartphone',
    details: ['Process Automation', 'UX/UI Design', 'IoT Integration']
  },
];
