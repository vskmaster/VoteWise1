/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'hi' | 'ta';

export interface UserProfile {
  name: string;
  location: string;
  photo?: string;
  aadhaarNumber?: string;
  epicNumber?: string;
  phoneNumber?: string;
  address?: string;
}

export interface VoterData {
  epicNumber: string;
  name: string;
  pollingStation: string;
  status: 'Active' | 'Not Found';
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  description: string;
}

export interface EducationModule {
  id: string;
  title: string;
  description: string;
  content: string;
}

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  aiExplanation?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
