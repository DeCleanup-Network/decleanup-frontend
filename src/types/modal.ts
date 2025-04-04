// types/modal.ts
export interface ModalStep {
    id: number;
    title: string;
    description: string;
  }
  
  export const IMPACT_PRODUCT_STEPS: ModalStep[] = [
    {
      id: 1,
      title: "Impact Product Claims",
      description: "Learn how to earn SOCU by submitting cleanup photos"
    },
    {
      id: 2,
      title: "Referral Program",
      description: "Get rewards when you refer friends to join the program"
    },
    {
      id: 3,
      title: "Streak Rewards",
      description: "Maintain weekly cleanups to earn bonus SOCU"
    }
  ];