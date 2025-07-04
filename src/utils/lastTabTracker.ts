// Simple utility to track the last active tab
let lastActiveTab = 'Home';

export const setLastActiveTab = (tabName: string) => {
  if (tabName !== 'Add') {
    lastActiveTab = tabName;
  }
};

export const getLastActiveTab = () => {
  return lastActiveTab;
};