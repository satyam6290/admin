import { Admin, Candidate, Company, EntityType } from '../types';
import { mockAdmins, mockCandidates, mockCompanies } from './mockData';

// In-memory storage (simulating a database)
let admins = [...mockAdmins];
let candidates = [...mockCandidates];
let companies = [...mockCompanies];

// Helper function to generate a random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Helper function to get current date as ISO string
const getCurrentDate = (): string => {
  return new Date().toISOString();
};

// Admin CRUD operations
export const getAdmins = (): Admin[] => {
  return [...admins];
};

export const getAdminById = (id: string): Admin | undefined => {
  return admins.find(admin => admin.id === id);
};

export const createAdmin = (admin: Omit<Admin, 'id' | 'createdAt'>): Admin => {
  const newAdmin: Admin = {
    ...admin,
    id: generateId(),
    createdAt: getCurrentDate(),
  };
  admins = [...admins, newAdmin];
  return newAdmin;
};

export const updateAdmin = (id: string, adminData: Partial<Admin>): Admin | undefined => {
  const adminIndex = admins.findIndex(admin => admin.id === id);
  if (adminIndex === -1) return undefined;
  
  const updatedAdmin = { ...admins[adminIndex], ...adminData };
  admins = admins.map(admin => admin.id === id ? updatedAdmin : admin);
  return updatedAdmin;
};

export const deleteAdmin = (id: string): boolean => {
  const initialLength = admins.length;
  admins = admins.filter(admin => admin.id !== id);
  return admins.length < initialLength;
};

// Candidate CRUD operations
export const getCandidates = (): Candidate[] => {
  return [...candidates];
};

export const getCandidateById = (id: string): Candidate | undefined => {
  return candidates.find(candidate => candidate.id === id);
};

export const createCandidate = (candidate: Omit<Candidate, 'id' | 'createdAt'>): Candidate => {
  const newCandidate: Candidate = {
    ...candidate,
    id: generateId(),
    createdAt: getCurrentDate(),
  };
  candidates = [...candidates, newCandidate];
  return newCandidate;
};

export const updateCandidate = (id: string, candidateData: Partial<Candidate>): Candidate | undefined => {
  const candidateIndex = candidates.findIndex(candidate => candidate.id === id);
  if (candidateIndex === -1) return undefined;
  
  const updatedCandidate = { ...candidates[candidateIndex], ...candidateData };
  candidates = candidates.map(candidate => candidate.id === id ? updatedCandidate : candidate);
  return updatedCandidate;
};

export const deleteCandidate = (id: string): boolean => {
  const initialLength = candidates.length;
  candidates = candidates.filter(candidate => candidate.id !== id);
  return candidates.length < initialLength;
};

// Company CRUD operations
export const getCompanies = (): Company[] => {
  return [...companies];
};

export const getCompanyById = (id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

export const createCompany = (company: Omit<Company, 'id' | 'createdAt'>): Company => {
  const newCompany: Company = {
    ...company,
    id: generateId(),
    createdAt: getCurrentDate(),
  };
  companies = [...companies, newCompany];
  return newCompany;
};

export const updateCompany = (id: string, companyData: Partial<Company>): Company | undefined => {
  const companyIndex = companies.findIndex(company => company.id === id);
  if (companyIndex === -1) return undefined;
  
  const updatedCompany = { ...companies[companyIndex], ...companyData };
  companies = companies.map(company => company.id === id ? updatedCompany : company);
  return updatedCompany;
};

export const deleteCompany = (id: string): boolean => {
  const initialLength = companies.length;
  companies = companies.filter(company => company.id !== id);
  return companies.length < initialLength;
};

// Statistics
export const getEntityCount = (entityType: EntityType): number => {
  switch (entityType) {
    case 'admin':
      return admins.length;
    case 'candidate':
      return candidates.length;
    case 'company':
      return companies.length;
    default:
      return 0;
  }
};

export const getActiveCount = (entityType: EntityType): number => {
  switch (entityType) {
    case 'admin':
      return admins.filter(admin => admin.status === 'active').length;
    case 'candidate':
      return candidates.filter(candidate => candidate.status === 'hired' || candidate.status === 'interviewing').length;
    case 'company':
      return companies.filter(company => company.status === 'active').length;
    default:
      return 0;
  }
};