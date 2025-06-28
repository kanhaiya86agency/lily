import Step1BasicInfo from './BasicInfo';
import Step2ServiceDetails from './ServiceDetails';
import Step3SkillsAvailability from './SkillsAvailability';
import Step4UploadSubmit from './UploadSubmit';

export const steps = [
  {
    title: 'Basic Info',
    component: Step1BasicInfo,
    fields: ['name', 'location', 'category', 'description'],
  },
  {
    title: 'Service Details',
    component: Step2ServiceDetails,
    fields: ['experience_years', 'starting_price', 'service_area_km'],
  },
  {
    title: 'Skills & Availability',
    component: Step3SkillsAvailability,
    fields: ['languages', 'skills', 'availableDays', 'availableHours'],
  },
  {
    title: 'Upload & Submit',
    component: Step4UploadSubmit,
    fields: ['profile_image_url'],
  },
];
