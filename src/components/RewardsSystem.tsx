
import React from 'react';
import { RewardsSystem as RefactoredRewardsSystem } from './rewards';

interface RewardsSystemProps {
  isDiscordLinked?: boolean;
}

const RewardsSystem: React.FC<RewardsSystemProps> = ({ isDiscordLinked = false }) => {
  return <RefactoredRewardsSystem isDiscordLinked={isDiscordLinked} />;
};

export default RewardsSystem;
