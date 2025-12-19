
export type Task = {
  id: string;
  time: string;
  task: string;
  category: string;
  completed: boolean;
  icon: string;
};

export type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: number;
  gender: 'Male' | 'Female';
  avatar: string;
  wellnessScore: number;
  hydration: { current: number; goal: number };
  walks: { current: number; goal: number };
};

export type Screen = 
  | 'HOME' 
  | 'HEALTH' 
  | 'INSIGHTS' 
  | 'COMMUNITY' 
  | 'PROFILE' 
  | 'CLINICS' 
  | 'FIRST_AID' 
  | 'FOOD_SAFETY' 
  | 'ONBOARDING' 
  | 'ADD_RECORD' 
  | 'CHAT' 
  | 'SCHEDULE'
  | 'MY_PETS'
  | 'SUBSCRIPTION'
  | 'NOTIFICATIONS'
  | 'SETTINGS';

export type ActivityType = 'WALK' | 'FOOD' | 'WATER' | 'MEDS';

export type Message = {
  role: 'user' | 'model';
  text: string;
};
